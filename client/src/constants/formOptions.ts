export const AGE_RANGE_OPTIONS = [
  { value: "under-40", label: "Under 40", id: "under-40" },
  { value: "40-55", label: "40-55", id: "40-55" },
  { value: "55-65", label: "55-65", id: "55-65" },
  { value: "over-65", label: "Over 65", id: "over-65" }
];

export const TIMEFRAME_OPTIONS = [
  { value: "immediate", label: "Immediate (within 1 year)", id: "immediate" },
  { value: "short-term", label: "Short-term (1-5 years)", id: "short-term" },
  { value: "medium-term", label: "Medium-term (5-10 years)", id: "medium-term" },
  { value: "long-term", label: "Long-term (10+ years)", id: "long-term" }
];

export const INVESTMENT_EXPERIENCE_OPTIONS = [
  { value: "beginner", label: "Limited experience", id: "beginner" },
  { value: "intermediate", label: "Some experience", id: "intermediate" },
  { value: "experienced", label: "Comfortable with investments", id: "experienced" },
  { value: "expert", label: "Extensive experience", id: "expert" }
];

export const MEETING_TIME_OPTIONS = [
  { value: "morning", label: "Morning (8AM - 12PM)", id: "morning" },
  { value: "afternoon", label: "Afternoon (12PM - 5PM)", id: "afternoon" },
  { value: "evening", label: "Evening (5PM - 7PM)", id: "evening" },
  { value: "flexible", label: "Flexible", id: "flexible" }
];

export const ADVISOR_STATUS_OPTIONS = [
  { value: "no", label: "No", id: "no-advisor" },
  { value: "yes-satisfied", label: "Yes, but looking for a change", id: "yes-satisfied" },
  { value: "yes-second-opinion", label: "Yes, but seeking a second opinion", id: "yes-second-opinion" }
];

export const PRIMARY_GOAL_OPTIONS = [
  { value: "retirement-planning", label: "Retirement Planning", id: "retirement-planning" },
  { value: "investment-growth", label: "Investment Growth", id: "investment-growth" },
  { value: "real-estate-exchange", label: "Real Estate Exchanges (1031)", id: "real-estate-exchange" },
  { value: "tax-planning", label: "Tax Planning", id: "tax-planning" },
  { value: "estate-planning", label: "Legacy Planning", id: "estate-planning" },
  { value: "other", label: "Other", id: "other-goal" }
];

export const SERVICES_INTEREST_OPTIONS = [
  { value: "Growing My Net Worth", label: "Growing My Net Worth", id: "Growing My Net Worth" },
  { value: "Getting organized around retirement", label: "Getting organized around retirement", id: "Getting organized around retirement" },
  { value: "Tax Deferred Real Estate Exchanges", label: "Tax Deferred Real Estate Exchanges", id: "Tax Deferred Real Estate Exchanges" },
  { value: "Reducing taxes now or in the future", label: "Reducing taxes now or in the future", id: "Reducing taxes now or in the future" },
  { value: "Legacy Planning", label: "Legacy Planning", id: "Legacy Planning" },
  { value: "Getting a second opinion on my portfolio", label: "Getting a second opinion on my portfolio", id: "Getting a second opinion on my portfolio" }
];

export const STATUS_OPTIONS = [
  "New",
  "Contacted", 
  "Meeting Scheduled",
  "In Progress",
  "Proposal Sent",
  "Closed - Won",
  "Closed - Lost",
  "Follow-up Required"
];

export const PRIORITY_OPTIONS = [
  "Low",
  "Medium", 
  "High",
  "Urgent"
];