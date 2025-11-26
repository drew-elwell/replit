import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ConsultationResponse } from "@/types/consultation";

interface ConsultationCardProps {
  response: ConsultationResponse;
  onEdit: (response: ConsultationResponse) => void;
  onDelete: (id: number) => void;
}

const ConsultationCard = React.memo(({ response, onEdit, onDelete }: ConsultationCardProps) => {
  return (
    <Card 
      id={`response-${response.id}`} 
      className="border-l-4 border-l-bennco-purple transition-all duration-300"
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span className="text-bennco-navy">
            {response.firstName} {response.lastName}
          </span>
          <Badge variant="outline">
            #{response.id} - {format(new Date(response.createdAt), "MMM dd, yyyy 'at' h:mm a")}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Contact Info</h4>
            <p><strong>Email:</strong> {response.email}</p>
            <p><strong>Phone:</strong> {response.phone}</p>
            {response.age && <p><strong>Age Range:</strong> {response.age}</p>}
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Financial Goals</h4>
            <p><strong>Primary Goal:</strong> {response.primaryGoal}</p>
            <p><strong>Timeframe:</strong> {response.timeframe}</p>
            <p><strong>Investment Experience:</strong> {response.investmentExperience}</p>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-semibold text-sm text-gray-600 uppercase tracking-wide mb-2">Services of Interest</h4>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(response.servicesInterest) ? response.servicesInterest.map((service) => (
              <Badge key={service} variant="secondary">{service}</Badge>
            )) : (
              <Badge variant="secondary">{response.servicesInterest}</Badge>
            )}
          </div>
        </div>

        {response.currentSituation && (
          <div>
            <h4 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Current Situation</h4>
            <p className="text-gray-700">{response.currentSituation}</p>
          </div>
        )}

        {response.specificQuestions && (
          <div>
            <h4 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Specific Questions</h4>
            <p className="text-gray-700">{response.specificQuestions}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          {response.currentAdvisor && (
            <p><strong>Current Advisor:</strong> {response.currentAdvisor}</p>
          )}
          {response.preferredMeetingTime && (
            <p><strong>Preferred Meeting Time:</strong> {response.preferredMeetingTime}</p>
          )}
        </div>
        
        <Separator />
        
        <div className="flex justify-between items-center pt-2">
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">
              Status: {response.status || 'New'}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Priority: {response.priority || 'Medium'}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit(response)}
            >
              Edit Status
            </Button>
            
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => onDelete(response.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

ConsultationCard.displayName = 'ConsultationCard';

export default ConsultationCard;