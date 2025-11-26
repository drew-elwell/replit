import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { consultationResponses, insertConsultationResponseSchema, availabilitySubmissions, insertAvailabilitySubmissionSchema } from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { sendAvailabilityNotification, sendConsultationWithAvailabilityNotification } from "./email.js";
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

// Function to sync data with your existing spreadsheet template
async function syncWithTemplate(templateName: string) {
  try {
    const responses = await db
      .select()
      .from(consultationResponses)
      .orderBy(consultationResponses.createdAt);

    // Create worksheet data matching your template format
    const worksheetData = responses.map(response => ({
      'ID': response.id,
      'First Name': response.firstName,
      'Last Name': response.lastName,
      'Email': response.email,
      'Phone': response.phone,
      'Age Range': response.age || '',
      'Primary Goal': response.primaryGoal,
      'Timeframe': response.timeframe,
      'Current Situation': response.currentSituation || '',
      'Services Interest': Array.isArray(response.servicesInterest) ? response.servicesInterest.join(', ') : '',
      'Investment Experience': response.investmentExperience,
      'Current Advisor': response.currentAdvisor || '',
      'Specific Questions': response.specificQuestions || '',
      'Preferred Meeting Time': response.preferredMeetingTime || '',
      'Submitted At': new Date(response.createdAt).toLocaleString(),
      'Status': 'New',
      'Notes': '',
      'Follow-up Date': '',
      'Assigned To': '',
      'Priority': 'Medium',
      'Last Contact': '',
      'Next Action': ''
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Enhanced column widths matching your template
    const columnWidths = [
      { wch: 5 },   // ID
      { wch: 15 },  // First Name
      { wch: 15 },  // Last Name
      { wch: 25 },  // Email
      { wch: 15 },  // Phone
      { wch: 12 },  // Age Range
      { wch: 30 },  // Primary Goal
      { wch: 15 },  // Timeframe
      { wch: 40 },  // Current Situation
      { wch: 25 },  // Services Interest
      { wch: 20 },  // Investment Experience
      { wch: 20 },  // Current Advisor
      { wch: 40 },  // Specific Questions
      { wch: 20 },  // Preferred Meeting Time
      { wch: 20 },  // Submitted At
      { wch: 12 },  // Status
      { wch: 30 },  // Notes
      { wch: 15 },  // Follow-up Date
      { wch: 15 },  // Assigned To
      { wch: 12 },  // Priority
      { wch: 15 },  // Last Contact
      { wch: 20 }   // Next Action
    ];
    worksheet['!cols'] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Consultation Responses');

    // Create exports directory if it doesn't exist
    const exportsDir = path.join(process.cwd(), 'exports');
    try {
      if (!fs.existsSync(exportsDir)) {
        fs.mkdirSync(exportsDir, { recursive: true });
      }
    } catch (dirError) {
      console.error("Error creating exports directory:", dirError);
      throw new Error("Failed to create exports directory");
    }

    // Use your template naming convention
    const filename = `${templateName}_${Date.now()}.xlsx`;
    const filepath = path.join(exportsDir, filename);

    // Write the file with error handling
    try {
      XLSX.writeFile(workbook, filepath);
    } catch (writeError) {
      console.error("Error writing Excel file:", writeError);
      throw new Error("Failed to write Excel file");
    }
    
    console.log(`✓ Template synced: ${filename}`);
    console.log(`✓ Total consultation responses: ${responses.length}`);
    
    return { success: true, filename, recordCount: responses.length, templateUsed: templateName };
  } catch (error) {
    console.error("Error syncing with template:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// Function to automatically generate/update the spreadsheet
async function generateUpdatedSpreadsheet() {
  try {
    const responses = await db
      .select()
      .from(consultationResponses)
      .orderBy(consultationResponses.createdAt);

    // Create worksheet data with enhanced formatting
    const worksheetData = responses.map(response => ({
      'ID': response.id,
      'First Name': response.firstName,
      'Last Name': response.lastName,
      'Email': response.email,
      'Phone': response.phone,
      'Age Range': response.age || '',
      'Primary Goal': response.primaryGoal,
      'Timeframe': response.timeframe,
      'Current Situation': response.currentSituation || '',
      'Services Interest': Array.isArray(response.servicesInterest) ? response.servicesInterest.join(', ') : '',
      'Investment Experience': response.investmentExperience,
      'Current Advisor': response.currentAdvisor || '',
      'Specific Questions': response.specificQuestions || '',
      'Preferred Meeting Time': response.preferredMeetingTime || '',
      'Submitted At': new Date(response.createdAt).toLocaleString(),
      'Status': response.status || 'New',
      'Priority': response.priority || 'Medium',
      'Notes': response.notes || '',
      'Follow-up Date': response.followUpDate || '',
      'Assigned To': response.assignedTo || '',
      'Last Contact': response.lastContact || '',
      'Next Action': response.nextAction || ''
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Enhanced column widths for better readability
    const columnWidths = [
      { wch: 5 },   // ID
      { wch: 15 },  // First Name
      { wch: 15 },  // Last Name
      { wch: 25 },  // Email
      { wch: 15 },  // Phone
      { wch: 12 },  // Age Range
      { wch: 30 },  // Primary Goal
      { wch: 15 },  // Timeframe
      { wch: 40 },  // Current Situation
      { wch: 25 },  // Services Interest
      { wch: 20 },  // Investment Experience
      { wch: 20 },  // Current Advisor
      { wch: 40 },  // Specific Questions
      { wch: 20 },  // Preferred Meeting Time
      { wch: 20 },  // Submitted At
      { wch: 12 },  // Status
      { wch: 30 },  // Notes
      { wch: 15 },  // Follow-up Date
      { wch: 15 }   // Assigned To
    ];
    worksheet['!cols'] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Consultation Responses');

    // Create exports directory if it doesn't exist
    const exportsDir = path.join(process.cwd(), 'exports');
    try {
      if (!fs.existsSync(exportsDir)) {
        fs.mkdirSync(exportsDir, { recursive: true });
      }
    } catch (dirError) {
      console.error("Error creating exports directory:", dirError);
      throw new Error("Failed to create exports directory");
    }

    // Generate filename with current date
    const filename = `BennCo-Advisor-Database-${new Date().toISOString().split('T')[0]}.xlsx`;
    const filepath = path.join(exportsDir, filename);

    // Write the file with error handling
    try {
      XLSX.writeFile(workbook, filepath);
    } catch (writeError) {
      console.error("Error writing Excel file:", writeError);
      throw new Error("Failed to write Excel file");
    }
    
    console.log(`✓ Updated spreadsheet saved: ${filename}`);
    console.log(`✓ Total consultation responses: ${responses.length}`);
    
    return { success: true, filename, recordCount: responses.length };
  } catch (error) {
    console.error("Error generating spreadsheet:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API route to save consultation form responses
  app.post("/api/consultation", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertConsultationResponseSchema.parse(req.body);
      
      // Insert into database
      const [response] = await db
        .insert(consultationResponses)
        .values(validatedData)
        .returning();
      
      // Auto-generate updated spreadsheet using your template format
      await syncWithTemplate("BennCo Advisor Database");
      
      res.json({ success: true, id: response.id });
    } catch (error) {
      console.error("Error saving consultation response:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Invalid data" 
      });
    }
  });

  // API route to get consultation responses (for admin view)
  app.get("/api/consultation", async (req, res) => {
    try {
      const responses = await db
        .select()
        .from(consultationResponses)
        .orderBy(desc(consultationResponses.createdAt));
      
      res.json(responses);
    } catch (error) {
      console.error("Error fetching consultation responses:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch responses" 
      });
    }
  });

  // API route to export consultation responses as Excel
  app.get("/api/consultation/export", async (req, res) => {
    try {
      const responses = await db
        .select()
        .from(consultationResponses)
        .orderBy(consultationResponses.createdAt);

      // Create worksheet data
      const worksheetData = responses.map(response => ({
        'ID': response.id,
        'First Name': response.firstName,
        'Last Name': response.lastName,
        'Email': response.email,
        'Phone': response.phone,
        'Age Range': response.age || '',
        'Primary Goal': response.primaryGoal,
        'Timeframe': response.timeframe,
        'Current Situation': response.currentSituation || '',
        'Services Interest': Array.isArray(response.servicesInterest) ? response.servicesInterest.join(', ') : '',
        'Investment Experience': response.investmentExperience,
        'Current Advisor': response.currentAdvisor || '',
        'Specific Questions': response.specificQuestions || '',
        'Preferred Meeting Time': response.preferredMeetingTime || '',
        'Submitted At': new Date(response.createdAt).toLocaleString()
      }));

      // Create workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(worksheetData);

      // Auto-size columns with safety check
      const columnWidths = worksheetData.length > 0 
        ? Object.keys(worksheetData[0]).map(key => ({
            wch: Math.max(key.length, 15)
          }))
        : [{ wch: 15 }]; // Fallback for empty data
      worksheet['!cols'] = columnWidths;

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Consultation Responses');

      // Generate Excel file buffer
      const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

      // Set response headers
      const filename = `consultation-responses-${new Date().toISOString().split('T')[0]}.xlsx`;
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      
      res.send(excelBuffer);
    } catch (error) {
      console.error("Error exporting consultation responses:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to export responses" 
      });
    }
  });

  // API route to download the latest auto-generated spreadsheet
  app.get("/api/consultation/download-latest", async (req, res) => {
    try {
      const exportsDir = path.join(process.cwd(), 'exports');
      
      if (!fs.existsSync(exportsDir)) {
        return res.status(404).json({ 
          success: false, 
          error: "No spreadsheets have been generated yet" 
        });
      }

      // Find the most recent spreadsheet file (prioritize template format)
      const files = fs.readdirSync(exportsDir)
        .filter(file => (file.startsWith('BennCo Advisor Database_') || file.startsWith('BennCo-Advisor-Database-')) && file.endsWith('.xlsx'))
        .map(file => ({
          name: file,
          path: path.join(exportsDir, file),
          mtime: fs.statSync(path.join(exportsDir, file)).mtime,
          isTemplate: file.startsWith('BennCo Advisor Database_')
        }))
        .sort((a, b) => {
          // Prioritize template format files, then by date
          if (a.isTemplate && !b.isTemplate) return -1;
          if (!a.isTemplate && b.isTemplate) return 1;
          return b.mtime.getTime() - a.mtime.getTime();
        });

      if (files.length === 0) {
        return res.status(404).json({ 
          success: false, 
          error: "No BennCo database files found" 
        });
      }

      console.log(`Found ${files.length} files:`, files.map(f => ({ name: f.name, isTemplate: f.isTemplate, mtime: f.mtime })));

      const latestFile = files[0];
      
      // Set response headers for download
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="${latestFile.name}"`);
      
      // Send the file
      res.sendFile(latestFile.path);
      
    } catch (error) {
      console.error("Error downloading latest spreadsheet:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to download spreadsheet" 
      });
    }
  });

  // API route to manually trigger spreadsheet generation
  app.post("/api/consultation/generate-spreadsheet", async (req, res) => {
    try {
      const result = await generateUpdatedSpreadsheet();
      res.json(result);
    } catch (error) {
      console.error("Error manually generating spreadsheet:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to generate spreadsheet" 
      });
    }
  });

  // API route to sync data with uploaded spreadsheet template
  app.post("/api/consultation/sync-template", async (req, res) => {
    try {
      const { templateName } = req.body;
      const result = await syncWithTemplate(templateName || "BennCo Advisor Database");
      res.json(result);
    } catch (error) {
      console.error("Error syncing with template:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to sync with template" 
      });
    }
  });

  // API route to delete a consultation response
  app.delete("/api/consultation/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const consultationId = parseInt(id);
      
      if (isNaN(consultationId)) {
        return res.status(400).json({ 
          success: false, 
          error: "Invalid consultation ID" 
        });
      }

      // Delete from database
      const result = await db.delete(consultationResponses).where(eq(consultationResponses.id, consultationId));
      
      res.json({ 
        success: true, 
        message: "Consultation response deleted successfully" 
      });
    } catch (error) {
      console.error("Error deleting consultation response:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to delete consultation response" 
      });
    }
  });

  // API route to update consultation response status
  app.patch("/api/consultation/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status, priority, notes, followUpDate, assignedTo, lastContact, nextAction } = req.body;
      const consultationId = parseInt(id);
      
      if (isNaN(consultationId)) {
        return res.status(400).json({ 
          success: false, 
          error: "Invalid consultation ID" 
        });
      }

      // Build update object with only provided fields
      const updateData: any = {};
      if (status !== undefined) updateData.status = status;
      if (priority !== undefined) updateData.priority = priority;
      if (notes !== undefined) updateData.notes = notes;
      if (followUpDate !== undefined) updateData.followUpDate = followUpDate;
      if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
      if (lastContact !== undefined) updateData.lastContact = lastContact;
      if (nextAction !== undefined) updateData.nextAction = nextAction;

      // Update the database record
      const [updatedResponse] = await db
        .update(consultationResponses)
        .set(updateData)
        .where(eq(consultationResponses.id, consultationId))
        .returning();

      if (!updatedResponse) {
        return res.status(404).json({
          success: false,
          error: "Consultation response not found"
        });
      }
      
      res.json({ 
        success: true, 
        message: "Status updated successfully",
        data: updatedResponse
      });
    } catch (error) {
      console.error("Error updating consultation status:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to update status" 
      });
    }
  });

  // API route to save availability submissions
  app.post("/api/availability", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertAvailabilitySubmissionSchema.parse(req.body);
      
      // Insert into database
      const [submission] = await db
        .insert(availabilitySubmissions)
        .values(validatedData)
        .returning();
      
      // Look up consultation response for this client to include full details in email
      console.log(`📧 Sending comprehensive notification for ${validatedData.clientName}`);
      
      const consultationResponse = await db
        .select()
        .from(consultationResponses)
        .where(eq(consultationResponses.email, validatedData.clientEmail))
        .orderBy(desc(consultationResponses.createdAt))
        .limit(1);

      let emailSent = false;
      
      if (consultationResponse.length > 0) {
        // Send comprehensive email with consultation + availability data
        const consultation = consultationResponse[0];
        emailSent = await sendConsultationWithAvailabilityNotification({
          firstName: consultation.firstName,
          lastName: consultation.lastName,
          email: consultation.email,
          phone: consultation.phone || undefined,
          age: consultation.age || undefined,
          primaryGoal: consultation.primaryGoal || undefined,
          timeframe: consultation.timeframe || undefined,
          currentSituation: consultation.currentSituation || undefined,
          servicesInterest: Array.isArray(consultation.servicesInterest) 
            ? consultation.servicesInterest.join(', ') 
            : consultation.servicesInterest || undefined,
          investmentExperience: consultation.investmentExperience || undefined,
          currentAdvisor: consultation.currentAdvisor || undefined,
          specificQuestions: consultation.specificQuestions || undefined,

          preferredDates: validatedData.preferredDates,
          preferredTimes: validatedData.preferredTimes,
          meetingType: validatedData.meetingType || "In-person",
          timezone: validatedData.timeZone || "Not specified",
          additionalNotes: validatedData.additionalNotes || undefined,
        });
      } else {
        // Fallback to basic availability notification if no consultation found
        emailSent = await sendAvailabilityNotification({
          clientName: validatedData.clientName,
          clientEmail: validatedData.clientEmail,
          preferredDates: validatedData.preferredDates,
          preferredTimes: validatedData.preferredTimes,
          meetingType: validatedData.meetingType || "In-person",
          timezone: validatedData.timeZone || "Not specified",
          additionalNotes: validatedData.additionalNotes || undefined,
        });
      }
      
      if (emailSent) {
        console.log(`✅ Email notification sent to Marie for ${validatedData.clientName}`);
      } else {
        console.log(`⚠️ Email notification failed for ${validatedData.clientName}`);
      }
      
      res.json({ success: true, id: submission.id });
    } catch (error) {
      console.error("Error saving availability submission:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Invalid data" 
      });
    }
  });

  // API route to get availability submissions (for admin view)
  app.get("/api/availability", async (req, res) => {
    try {
      const submissions = await db
        .select()
        .from(availabilitySubmissions)
        .orderBy(desc(availabilitySubmissions.createdAt));
      
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching availability submissions:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch submissions" 
      });
    }
  });

  // API route to handle contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, subject, preferredDateTime, mainFocus } = req.body;
      
      // Basic validation
      if (!name || !email || !subject || !preferredDateTime || !mainFocus) {
        return res.status(400).json({ 
          success: false, 
          error: "Missing required fields" 
        });
      }

      // Send email to Marie
      const { sendContactMessage } = await import("./email.js");
      const emailSent = await sendContactMessage({
        name,
        email,
        phone: phone || undefined,
        subject,
        preferredDateTime,
        mainFocus
      });
      
      if (emailSent) {
        console.log(`✅ Contact message sent to Marie from ${name} (${email})`);
      } else {
        console.log(`⚠️ Contact message failed from ${name} (${email})`);
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to send message" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
