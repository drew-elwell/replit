import { pgTable, text, serial, integer, boolean, timestamp, varchar, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const consultationResponses = pgTable("consultation_responses", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  age: text("age"),
  primaryGoal: text("primary_goal").notNull(),
  timeframe: text("timeframe").notNull(),
  currentSituation: text("current_situation"),
  servicesInterest: text("services_interest").array().notNull(),
  investmentExperience: text("investment_experience").notNull(),
  currentAdvisor: text("current_advisor"),
  specificQuestions: text("specific_questions"),
  preferredMeetingTime: text("preferred_meeting_time"),
  status: text("status").default("New").notNull(),
  priority: text("priority").default("Medium").notNull(),
  notes: text("notes").default(""),
  followUpDate: text("follow_up_date"),
  assignedTo: text("assigned_to"),
  lastContact: text("last_contact"),
  nextAction: text("next_action"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertConsultationResponseSchema = createInsertSchema(consultationResponses).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  age: true,
  primaryGoal: true,
  timeframe: true,
  currentSituation: true,
  servicesInterest: true,
  investmentExperience: true,
  currentAdvisor: true,
  specificQuestions: true,
  preferredMeetingTime: true,
}).extend({
  primaryGoal: z.union([z.string(), z.array(z.string())]).transform(val => {
    if (Array.isArray(val)) {
      return val.filter(item => typeof item === 'string' && item.trim()).join(', ');
    }
    return typeof val === 'string' ? val.trim() : '';
  })
});

export type InsertConsultationResponse = z.infer<typeof insertConsultationResponseSchema>;
export type ConsultationResponse = typeof consultationResponses.$inferSelect;

// Availability submissions table
export const availabilitySubmissions = pgTable("availability_submissions", {
  id: serial("id").primaryKey(),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  preferredDates: text("preferred_dates").notNull(),
  preferredTimes: text("preferred_times").notNull(),
  timeZone: text("time_zone").default("MT (Mountain Time)"),
  meetingType: text("meeting_type").notNull().default("In-person"),
  additionalNotes: text("additional_notes"),
  status: text("status").default("Pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAvailabilitySubmissionSchema = createInsertSchema(availabilitySubmissions).pick({
  clientName: true,
  clientEmail: true,
  preferredDates: true,
  preferredTimes: true,
  timeZone: true,
  meetingType: true,
  additionalNotes: true,
});

export type InsertAvailabilitySubmission = z.infer<typeof insertAvailabilitySubmissionSchema>;
export type AvailabilitySubmission = typeof availabilitySubmissions.$inferSelect;
