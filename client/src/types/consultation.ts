export interface ConsultationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  primaryGoal: string[] | string;
  timeframe: string;
  currentSituation: string;
  servicesInterest: string[];
  investmentExperience: string;
  currentAdvisor: string;
  specificQuestions: string;

}

export interface ConsultationResponse extends Omit<ConsultationFormData, 'primaryGoal'> {
  id: number;
  primaryGoal: string;
  status: string;
  priority: string;
  notes: string;
  followUpDate: string;
  assignedTo: string;
  lastContact: string;
  nextAction: string;
  createdAt: string;
}

export interface SpreadsheetResponse {
  success: boolean;
  recordCount?: number;
  filename?: string;
  error?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}