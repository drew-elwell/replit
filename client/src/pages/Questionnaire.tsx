import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { RadioGroupField } from "@/components/forms/RadioGroupField";
import { CheckboxGroupField } from "@/components/forms/CheckboxGroupField";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ConsultationFormData } from "@/types/consultation";
import AvailabilityForm from "@/components/AvailabilityForm";
import {
  AGE_RANGE_OPTIONS,
  TIMEFRAME_OPTIONS,
  INVESTMENT_EXPERIENCE_OPTIONS,
  PRIMARY_GOAL_OPTIONS,
  SERVICES_INTEREST_OPTIONS,
  ADVISOR_STATUS_OPTIONS,

} from "@/constants/formOptions";

const validationSchema = {
  firstName: { required: true, minLength: 2 },
  lastName: { required: true, minLength: 2 },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  phone: { required: true, minLength: 10 },
  primaryGoal: { required: true },
  timeframe: { required: true },
  servicesInterest: { required: true },
  investmentExperience: { required: true }
};

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showAvailabilityForm, setShowAvailabilityForm] = useState(false);
  const [formData, setFormData] = useState<ConsultationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    primaryGoal: [] as string[],
    timeframe: "",
    currentSituation: "",
    servicesInterest: [] as string[],
    investmentExperience: "",
    currentAdvisor: "",
    specificQuestions: "",

  });

  const totalSteps = 4;
  const { toast } = useToast();
  const { errors, validateForm, validateSingleField } = useFormValidation(validationSchema);

  const saveConsultationMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/consultation", data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your consultation request has been saved. Now let's schedule your appointment.",
      });
      setShowAvailabilityForm(true);
    },
    onError: (error) => {
      console.error("Error saving consultation:", error);
      toast({
        title: "Error",
        description: "There was a problem saving your consultation request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateSingleField(field, value);
  }, [validateSingleField]);

  const handleServiceInterest = useCallback((service: string, checked: boolean) => {
    const newServicesInterest = checked 
      ? [...formData.servicesInterest, service]
      : formData.servicesInterest.filter(s => s !== service);
    
    setFormData(prev => ({ ...prev, servicesInterest: newServicesInterest }));
    validateSingleField('servicesInterest', newServicesInterest);
  }, [formData.servicesInterest, validateSingleField]);

  const handlePrimaryGoal = useCallback((goal: string, checked: boolean) => {
    const newPrimaryGoal = checked 
      ? [...(formData.primaryGoal as string[]), goal]
      : (formData.primaryGoal as string[]).filter(g => g !== goal);
    
    setFormData(prev => ({ ...prev, primaryGoal: newPrimaryGoal }));
    validateSingleField('primaryGoal', newPrimaryGoal);
  }, [formData.primaryGoal, validateSingleField]);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Convert primaryGoal array to string for database compatibility
    const submissionData = {
      ...formData,
      primaryGoal: Array.isArray(formData.primaryGoal) ? (formData.primaryGoal as string[]).join(', ') : formData.primaryGoal as string
    } as any;
    saveConsultationMutation.mutate(submissionData);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.primaryGoal.length > 0 && formData.timeframe;
      case 3:
        return formData.servicesInterest.length > 0 && formData.investmentExperience;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bennco-beige via-white to-sage-light py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-bennco-navy mb-4">
            Schedule Your Free Consultation
          </h1>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            Help us understand your financial goals so we can provide you with personalized advice
            tailored to your unique situation.
          </p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-bennco-navy text-center">Tell Us a Bit About Yourself</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-premium h-3 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 text-center font-medium">
              Step {currentStep} of {totalSteps}
            </p>

            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-bennco-navy mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-base font-medium">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Enter your first name"
                      className="mt-2 h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-base font-medium">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Enter your last name"
                      className="mt-2 h-12"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-base font-medium">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email address"
                    className="mt-2 h-12"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-base font-medium">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="(555) 123-4567"
                      className="mt-2 h-12"
                    />
                  </div>
                  <RadioGroupField
                    label="Age Range"
                    value={formData.age}
                    onValueChange={(value) => handleInputChange("age", value)}
                    options={AGE_RANGE_OPTIONS}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Financial Goals */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-bennco-navy mb-6">Your Financial Goals</h3>
                <CheckboxGroupField
                  label="What are your primary financial goals?"
                  selectedValues={formData.primaryGoal as string[]}
                  onValueChange={handlePrimaryGoal}
                  options={PRIMARY_GOAL_OPTIONS}
                  required={true}
                />
                
                <RadioGroupField
                  label="What is your timeframe for achieving this goal?"
                  value={formData.timeframe}
                  onValueChange={(value) => handleInputChange("timeframe", value)}
                  options={TIMEFRAME_OPTIONS}
                  required={true}
                />

                <div>
                  <Label htmlFor="currentSituation" className="text-base font-medium">What do you want your money to do for you?</Label>
                  <Textarea
                    id="currentSituation"
                    value={formData.currentSituation}
                    onChange={(e) => handleInputChange("currentSituation", e.target.value)}
                    placeholder="Tell us about your current financial position, challenges, or opportunities..."
                    className="mt-3 min-h-24"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Services Interest */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-bennco-navy mb-6">Services of Interest</h3>
                
                <CheckboxGroupField
                  label="Where could you use the most guidance right now?"
                  selectedValues={formData.servicesInterest}
                  onValueChange={handleServiceInterest}
                  options={SERVICES_INTEREST_OPTIONS}
                  required={true}
                />

                <RadioGroupField
                  label="What is your investment experience level?"
                  value={formData.investmentExperience}
                  onValueChange={(value) => handleInputChange("investmentExperience", value)}
                  options={INVESTMENT_EXPERIENCE_OPTIONS}
                  required={true}
                />
              </div>
            )}

            {/* Step 4: Additional Information */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-bennco-navy mb-6">Additional Information</h3>
                
                <RadioGroupField
                  label="Do you currently work with a financial advisor?"
                  value={formData.currentAdvisor}
                  onValueChange={(value) => handleInputChange("currentAdvisor", value)}
                  options={ADVISOR_STATUS_OPTIONS}
                />

                


              </div>
            )}

            {/* Contact Information for Scheduling Conflicts */}
            {currentStep === totalSteps && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 text-center">
                  If none of the available times work for you, please call us at{' '}
                  <a 
                    href="tel:+17195770099" 
                    className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    (719) 577-0099
                  </a>
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="flex items-center gap-2 bg-gradient-premium px-6 py-3"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={saveConsultationMutation.isPending}
                  className="bg-gradient-premium hover:shadow-2xl px-8 py-3"
                >
                  {saveConsultationMutation.isPending ? "Saving..." : "Schedule My Meeting"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Availability Form Modal */}
      <AvailabilityForm 
        isOpen={showAvailabilityForm}
        onClose={() => setShowAvailabilityForm(false)}
        clientEmail={formData.email}
        clientName={`${formData.firstName} ${formData.lastName}`}
      />
    </div>
  );
}