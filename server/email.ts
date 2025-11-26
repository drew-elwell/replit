import nodemailer from 'nodemailer';
import { MailService } from '@sendgrid/mail';

// Create email service - prefer SMTP, fallback to SendGrid or console
const createEmailService = () => {
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    // Use custom SMTP settings if provided
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    return { type: 'smtp', service: transporter };
  } else if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY.startsWith('SG.')) {
    const mailService = new MailService();
    mailService.setApiKey(process.env.SENDGRID_API_KEY);
    return { type: 'sendgrid', service: mailService };
  } else {
    // For development/testing - use console logging with helpful diagnostics
    console.log("🔧 No valid email configuration found. Using console logging for development.");
    console.log("💡 Current SMTP settings:");
    console.log(`   - Host: ${process.env.EMAIL_HOST || 'Not set'}`);
    console.log(`   - User: ${process.env.EMAIL_USER || 'Not set'}`);
    console.log(`   - Pass: ${process.env.EMAIL_PASS ? '[Set]' : 'Not set'}`);
    console.log(`   - Port: ${process.env.EMAIL_PORT || 'Not set'}`);
    console.log("💡 To enable emails, configure either:");
    console.log("   - SMTP: EMAIL_HOST, EMAIL_USER, EMAIL_PASS");
    console.log("   - SendGrid: SENDGRID_API_KEY (starting with 'SG.')");
    return { type: 'console', service: null };
  }
};

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  const emailService = createEmailService();
  
  if (emailService.type === 'console') {
    // Development mode - log email content instead of sending
    console.log(`📧 [DEVELOPMENT] Email would be sent to: ${params.to}`);
    console.log(`📧 [DEVELOPMENT] From: ${params.from}`);
    console.log(`📧 [DEVELOPMENT] Subject: ${params.subject}`);
    console.log(`📧 [DEVELOPMENT] Content:\n${params.text || params.html}`);
    console.log(`📧 [DEVELOPMENT] ========================`);
    return true;
  }

  try {
    if (emailService.type === 'sendgrid' && emailService.service) {
      // Use SendGrid
      const sendGridService = emailService.service as MailService;
      await sendGridService.send({
        to: params.to,
        from: params.from,
        subject: params.subject,
        text: params.text || '',
        html: params.html || '',
      });
      console.log(`✅ Email sent via SendGrid to ${params.to}`);
    } else if (emailService.type === 'smtp' && emailService.service) {
      // Use SMTP
      const smtpService = emailService.service as any;
      await smtpService.sendMail({
        from: params.from,
        to: params.to,
        subject: params.subject,
        text: params.text || '',
        html: params.html || '',
      });
      console.log(`✅ Email sent via SMTP to ${params.to}`);
    }
    return true;
  } catch (error) {
    console.error('❌ Email sending error:', error);
    return false;
  }
}

interface AvailabilityEmailData {
  clientName: string;
  clientEmail: string;
  preferredDates: string;
  preferredTimes: string;
  meetingType: string;
  timezone: string;
  additionalNotes?: string;
}

interface ConsultationEmailData {
  // Client Information
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  age?: string;
  
  // Financial Information  
  primaryGoal?: string;
  timeframe?: string;
  currentSituation?: string;
  servicesInterest?: string;
  investmentExperience?: string;
  currentAdvisor?: string;
  specificQuestions?: string;

  
  // Availability Information
  preferredDates: string;
  preferredTimes: string;
  meetingType: string;
  timezone: string;
  additionalNotes?: string;
}

export async function sendAvailabilityNotification(data: AvailabilityEmailData): Promise<boolean> {
  const subject = `New Client Availability Request - ${data.clientName}`;
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2c3e50; margin: 0; font-size: 24px;">New Availability Request</h1>
          <p style="color: #7f8c8d; margin: 5px 0 0 0;">BennCo Advisors Client Portal</p>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h2 style="color: #34495e; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e74c3c; padding-bottom: 5px;">Client Information</h2>
          <p style="margin: 8px 0; color: #2c3e50;"><strong>Name:</strong> ${data.clientName}</p>
          <p style="margin: 8px 0; color: #2c3e50;"><strong>Email:</strong> <a href="mailto:${data.clientEmail}" style="color: #3498db;">${data.clientEmail}</a></p>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h2 style="color: #34495e; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e74c3c; padding-bottom: 5px;">Meeting Preferences</h2>
          <p style="margin: 8px 0; color: #2c3e50;"><strong>Preferred Dates:</strong> ${data.preferredDates}</p>
          <p style="margin: 8px 0; color: #2c3e50;"><strong>Preferred Times:</strong> ${data.preferredTimes}</p>
          <p style="margin: 8px 0; color: #2c3e50;"><strong>Meeting Type:</strong> ${data.meetingType}</p>
          ${data.timezone !== "Not specified" ? `<p style="margin: 8px 0; color: #2c3e50;"><strong>Time Zone:</strong> ${data.timezone}</p>` : ''}
        </div>
        
        ${data.additionalNotes ? `
          <div style="margin-bottom: 25px;">
            <h2 style="color: #34495e; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e74c3c; padding-bottom: 5px;">Additional Notes</h2>
            <p style="margin: 8px 0; color: #2c3e50; background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #e74c3c;">${data.additionalNotes}</p>
          </div>
        ` : ''}
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-top: 30px; text-align: center;">
          <p style="margin: 0; color: #7f8c8d; font-size: 14px;">Please follow up with this client to schedule their consultation.</p>
        </div>
      </div>
    </div>
  `;
  
  const textContent = `
New Client Availability Request - ${data.clientName}

Client Information:
- Name: ${data.clientName}
- Email: ${data.clientEmail}

Meeting Preferences:
- Preferred Dates: ${data.preferredDates}
- Preferred Times: ${data.preferredTimes}
- Meeting Type: ${data.meetingType}
${data.timezone !== "Not specified" ? `- Time Zone: ${data.timezone}` : ''}

${data.additionalNotes ? `Additional Notes:\n${data.additionalNotes}` : ''}

Please follow up with this client to schedule their consultation.
  `;

  return await sendEmail({
    to: 'marie@bennco.com',
    from: 'noreply@bennco.com',
    subject,
    text: textContent,
    html: htmlContent,
  });
}

export async function sendConsultationWithAvailabilityNotification(data: ConsultationEmailData): Promise<boolean> {
  const subject = `New Client Consultation & Availability - ${data.firstName} ${data.lastName}`;
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2c3e50; margin: 0; font-size: 24px;">New Client Consultation Complete</h1>
          <p style="color: #7f8c8d; margin: 5px 0 0 0;">BennCo Advisors Client Portal</p>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h2 style="color: #34495e; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e74c3c; padding-bottom: 5px;">Client Information</h2>
          <p style="margin: 8px 0; color: #2c3e50;"><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p style="margin: 8px 0; color: #2c3e50;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #3498db;">${data.email}</a></p>
          ${data.phone ? `<p style="margin: 8px 0; color: #2c3e50;"><strong>Phone:</strong> <a href="tel:${data.phone}" style="color: #3498db;">${data.phone}</a></p>` : ''}
          ${data.age ? `<p style="margin: 8px 0; color: #2c3e50;"><strong>Age Range:</strong> ${data.age}</p>` : ''}
        </div>
        
        <div style="margin-bottom: 25px;">
          <h2 style="color: #34495e; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e74c3c; padding-bottom: 5px;">Financial Information</h2>
          ${data.primaryGoal ? `<p style="margin: 8px 0; color: #2c3e50;"><strong>Primary Goal:</strong> ${data.primaryGoal}</p>` : ''}
          ${data.timeframe ? `<p style="margin: 8px 0; color: #2c3e50;"><strong>Timeframe:</strong> ${data.timeframe}</p>` : ''}
          ${data.currentSituation ? `<p style="margin: 8px 0; color: #2c3e50;"><strong>Current Situation:</strong> ${data.currentSituation}</p>` : ''}
          ${data.servicesInterest ? `<p style="margin: 8px 0; color: #2c3e50;"><strong>Services of Interest:</strong> ${data.servicesInterest}</p>` : ''}
          ${data.investmentExperience ? `<p style="margin: 8px 0; color: #2c3e50;"><strong>Investment Experience:</strong> ${data.investmentExperience}</p>` : ''}
          ${data.currentAdvisor ? `<p style="margin: 8px 0; color: #2c3e50;"><strong>Current Advisor:</strong> ${data.currentAdvisor}</p>` : ''}

        </div>
        
        ${data.specificQuestions ? `
          <div style="margin-bottom: 25px;">
            <h2 style="color: #34495e; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e74c3c; padding-bottom: 5px;">Specific Questions</h2>
            <p style="margin: 8px 0; color: #2c3e50; background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #e74c3c;">${data.specificQuestions}</p>
          </div>
        ` : ''}
        
        <div style="margin-bottom: 25px;">
          <h2 style="color: #34495e; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e74c3c; padding-bottom: 5px;">Requested Availability</h2>
          <p style="margin: 8px 0; color: #2c3e50;"><strong>Preferred Dates:</strong> ${data.preferredDates}</p>
          <p style="margin: 8px 0; color: #2c3e50;"><strong>Preferred Times:</strong> ${data.preferredTimes}</p>
          <p style="margin: 8px 0; color: #2c3e50;"><strong>Meeting Type:</strong> ${data.meetingType}</p>
          ${data.timezone !== "Not specified" ? `<p style="margin: 8px 0; color: #2c3e50;"><strong>Time Zone:</strong> ${data.timezone}</p>` : ''}
        </div>
        
        ${data.additionalNotes ? `
          <div style="margin-bottom: 25px;">
            <h2 style="color: #34495e; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e74c3c; padding-bottom: 5px;">Additional Notes</h2>
            <p style="margin: 8px 0; color: #2c3e50; background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #e74c3c;">${data.additionalNotes}</p>
          </div>
        ` : ''}
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-top: 30px; text-align: center;">
          <p style="margin: 0; color: #7f8c8d; font-size: 14px;">This is a complete consultation submission. Please review all information and contact this client to schedule their appointment.</p>
        </div>
      </div>
    </div>
  `;
  
  const textContent = `
New Client Consultation & Availability - ${data.firstName} ${data.lastName}

Client Information:
- Name: ${data.firstName} ${data.lastName}
- Email: ${data.email}
${data.phone ? `- Phone: ${data.phone}` : ''}
${data.age ? `- Age Range: ${data.age}` : ''}

Financial Information:
${data.primaryGoal ? `- Primary Goal: ${data.primaryGoal}` : ''}
${data.timeframe ? `- Timeframe: ${data.timeframe}` : ''}
${data.currentSituation ? `- Current Situation: ${data.currentSituation}` : ''}
${data.servicesInterest ? `- Services of Interest: ${data.servicesInterest}` : ''}
${data.investmentExperience ? `- Investment Experience: ${data.investmentExperience}` : ''}
${data.currentAdvisor ? `- Current Advisor: ${data.currentAdvisor}` : ''}


${data.specificQuestions ? `Specific Questions:\n${data.specificQuestions}` : ''}

Requested Availability:
- Preferred Dates: ${data.preferredDates}
- Preferred Times: ${data.preferredTimes}
- Meeting Type: ${data.meetingType}
${data.timezone !== "Not specified" ? `- Time Zone: ${data.timezone}` : ''}

${data.additionalNotes ? `Additional Notes:\n${data.additionalNotes}` : ''}

This is a complete consultation submission. Please review all information and contact this client to schedule their appointment.
  `;

  return await sendEmail({
    to: 'marie@bennco.com',
    from: 'noreply@bennco.com',
    subject,
    text: textContent,
    html: htmlContent,
  });
}

interface ContactMessageData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  preferredDateTime: string;
  mainFocus: string;
}

export async function sendContactMessage(data: ContactMessageData): Promise<boolean> {
  const subject = `Contact Form Submission - ${data.subject}`;
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2c3e50; margin: 0; font-size: 24px;">New Contact Form Message</h1>
          <p style="color: #7f8c8d; margin: 5px 0 0 0;">BennCo Advisors Website</p>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h2 style="color: #34495e; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e74c3c; padding-bottom: 5px;">Contact Information</h2>
          <p style="margin: 8px 0; color: #2c3e50;"><strong>Name:</strong> ${data.name}</p>
          <p style="margin: 8px 0; color: #2c3e50;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #3498db;">${data.email}</a></p>
          ${data.phone ? `<p style="margin: 8px 0; color: #2c3e50;"><strong>Phone:</strong> <a href="tel:${data.phone}" style="color: #3498db;">${data.phone}</a></p>` : ''}
          <p style="margin: 8px 0; color: #2c3e50;"><strong>Subject:</strong> ${data.subject}</p>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h2 style="color: #34495e; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e74c3c; padding-bottom: 5px;">Meeting Request</h2>
          <p style="margin: 8px 0; color: #2c3e50;"><strong>Preferred Date & Time:</strong></p>
          <p style="margin: 8px 0; color: #2c3e50; background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #e74c3c; white-space: pre-wrap;">${data.preferredDateTime}</p>
          <p style="margin: 8px 0; color: #2c3e50;"><strong>Main Focus:</strong></p>
          <p style="margin: 8px 0; color: #2c3e50; background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #e74c3c; white-space: pre-wrap;">${data.mainFocus}</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-top: 30px; text-align: center;">
          <p style="margin: 0; color: #7f8c8d; font-size: 14px;">This message was submitted through the BennCo Advisors contact form. Please respond directly to the client's email address.</p>
        </div>
      </div>
    </div>
  `;
  
  const textContent = `
Contact Form Submission - ${data.subject}

Contact Information:
- Name: ${data.name}
- Email: ${data.email}
${data.phone ? `- Phone: ${data.phone}` : ''}
- Subject: ${data.subject}

Preferred Date & Time:
${data.preferredDateTime}

Main Focus:
${data.mainFocus}

This message was submitted through the BennCo Advisors contact form. Please respond directly to the client's email address.
  `;

  return await sendEmail({
    to: 'marie@bennco.com',
    from: 'noreply@bennco.com',
    subject,
    text: textContent,
    html: htmlContent,
  });
}