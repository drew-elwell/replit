import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import AvailabilityForm from "@/components/AvailabilityForm";

interface ConsultationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationForm({ isOpen, onClose }: ConsultationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showAvailabilityForm, setShowAvailabilityForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    primaryGoal: "",
    timeframe: "",
    currentSituation: "",
    servicesInterest: [] as string[],
    investmentExperience: "",
    currentAdvisor: "",
    specificQuestions: "",

  });

  const totalSteps = 4;
  const { toast } = useToast();

  const saveConsultationMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceInterest = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      servicesInterest: checked 
        ? [...prev.servicesInterest, service]
        : prev.servicesInterest.filter(s => s !== service)
    }));
  };

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
    saveConsultationMutation.mutate(formData);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.primaryGoal && formData.timeframe;
      case 3:
        return formData.servicesInterest.length > 0 && formData.investmentExperience;
      case 4:
        return true;
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto">
      <Card className="w-full max-w-2xl my-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl text-bennco-navy">
            Schedule Your Free Consultation
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-premium h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 text-center">
            Step {currentStep} of {totalSteps}
          </p>

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-bennco-navy mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email address"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age Range</Label>
                  <RadioGroup 
                    value={formData.age} 
                    onValueChange={(value) => handleInputChange("age", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="under-40" id="under-40" />
                      <Label htmlFor="under-40">Under 40</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="40-55" id="40-55" />
                      <Label htmlFor="40-55">40-55</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="55-65" id="55-65" />
                      <Label htmlFor="55-65">55-65</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="over-65" id="over-65" />
                      <Label htmlFor="over-65">Over 65</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Financial Goals */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-bennco-navy mb-4">Your Financial Goals</h3>
              <div>
                <Label>What is your primary financial goal? *</Label>
                <RadioGroup 
                  value={formData.primaryGoal} 
                  onValueChange={(value) => handleInputChange("primaryGoal", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="retirement-planning" id="retirement-planning" />
                    <Label htmlFor="retirement-planning">Retirement Planning</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="investment-growth" id="investment-growth" />
                    <Label htmlFor="investment-growth">Investment Growth</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="real-estate-exchange" id="real-estate-exchange" />
                    <Label htmlFor="real-estate-exchange">Real Estate Exchange (1031)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tax-planning" id="tax-planning" />
                    <Label htmlFor="tax-planning">Tax Planning</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="estate-planning" id="estate-planning" />
                    <Label htmlFor="estate-planning">Estate Planning</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other-goal" />
                    <Label htmlFor="other-goal">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label>What is your timeframe for achieving this goal? *</Label>
                <RadioGroup 
                  value={formData.timeframe} 
                  onValueChange={(value) => handleInputChange("timeframe", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="immediate" id="immediate" />
                    <Label htmlFor="immediate">Immediate (within 1 year)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="short-term" id="short-term" />
                    <Label htmlFor="short-term">Short-term (1-5 years)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium-term" id="medium-term" />
                    <Label htmlFor="medium-term">Medium-term (5-10 years)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="long-term" id="long-term" />
                    <Label htmlFor="long-term">Long-term (10+ years)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="currentSituation">Briefly describe your current financial situation</Label>
                <Textarea
                  id="currentSituation"
                  value={formData.currentSituation}
                  onChange={(e) => handleInputChange("currentSituation", e.target.value)}
                  placeholder="Tell us about your current financial position, challenges, or opportunities..."
                  className="mt-2"
                />
              </div>
            </div>
          )}

          {/* Step 3: Services Interest */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-bennco-navy mb-4">Services of Interest</h3>
              
              <div>
                <Label className="text-base font-medium">Which services are you most interested in? * (Select all that apply)</Label>
                <div className="mt-3 space-y-3">
                  {[
                    "Investment Management",
                    "Retirement Planning", 
                    "Real Estate Exchanges (1031)",
                    "Tax Planning",
                    "Estate Planning",
                    "Portfolio Review"
                  ].map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={formData.servicesInterest.includes(service)}
                        onCheckedChange={(checked) => handleServiceInterest(service, checked as boolean)}
                      />
                      <Label htmlFor={service}>{service}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>What is your investment experience level? *</Label>
                <RadioGroup 
                  value={formData.investmentExperience} 
                  onValueChange={(value) => handleInputChange("investmentExperience", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner">Beginner - Limited experience</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate - Some experience</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="experienced" id="experienced" />
                    <Label htmlFor="experienced">Experienced - Comfortable with investments</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="expert" id="expert" />
                    <Label htmlFor="expert">Expert - Extensive experience</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 4: Additional Information */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-bennco-navy mb-4">Additional Information</h3>
              
              <div>
                <Label>Do you currently work with a financial advisor?</Label>
                <RadioGroup 
                  value={formData.currentAdvisor} 
                  onValueChange={(value) => handleInputChange("currentAdvisor", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no-advisor" />
                    <Label htmlFor="no-advisor">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes-satisfied" id="yes-satisfied" />
                    <Label htmlFor="yes-satisfied">Yes, but looking for a change</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes-second-opinion" id="yes-second-opinion" />
                    <Label htmlFor="yes-second-opinion">Yes, but seeking a second opinion</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="specificQuestions">Any specific questions or topics you'd like to discuss?</Label>
                <Textarea
                  id="specificQuestions"
                  value={formData.specificQuestions}
                  onChange={(e) => handleInputChange("specificQuestions", e.target.value)}
                  placeholder="Share any specific questions, concerns, or topics you'd like to cover during our meeting..."
                  className="mt-2"
                />
              </div>


            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="flex items-center gap-2 bg-gradient-premium"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={saveConsultationMutation.isPending}
                className="bg-gradient-premium hover:shadow-2xl"
              >
                {saveConsultationMutation.isPending ? "Saving..." : "Schedule My Meeting"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Availability Form Modal */}
      <AvailabilityForm 
        isOpen={showAvailabilityForm}
        onClose={() => {
          setShowAvailabilityForm(false);
          onClose();
        }}
        clientEmail={formData.email}
        clientName={`${formData.firstName} ${formData.lastName}`}
      />
    </div>
  );
}