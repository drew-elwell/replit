import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, RefreshCw, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ConsultationResponse, SpreadsheetResponse } from "@/types/consultation";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "@/constants/formOptions";
import ConsultationCard from "@/components/admin/ConsultationCard";
import ErrorBoundary from "@/components/ErrorBoundary";

// Remove duplicate interface as it's imported from types

export default function Admin() {
  const { toast } = useToast();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<ConsultationResponse | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const { data: responses, isLoading } = useQuery<ConsultationResponse[]>({
    queryKey: ["/api/consultation"],
  });

  const generateSpreadsheetMutation = useMutation({
    mutationFn: async (): Promise<SpreadsheetResponse> => {
      const response = await fetch("/api/consultation/generate-spreadsheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
    onSuccess: (data: SpreadsheetResponse) => {
      toast({
        title: "Spreadsheet Generated",
        description: `Auto-generated database with ${data.recordCount} records`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate spreadsheet",
        variant: "destructive",
      });
    },
  });

  const syncTemplateMutation = useMutation({
    mutationFn: async (): Promise<SpreadsheetResponse> => {
      const response = await fetch("/api/consultation/sync-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateName: "BennCo Advisor Database" }),
      });
      return response.json();
    },
    onSuccess: (data: SpreadsheetResponse) => {
      toast({
        title: "Template Synced",
        description: `Updated your template format with ${data.recordCount} records`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to sync template",
        variant: "destructive",
      });
    },
  });

  const handleExportToExcel = () => {
    window.open("/api/consultation/export", "_blank");
  };

  const handleDownloadLatest = () => {
    window.open("/api/consultation/download-latest", "_blank");
  };

  const handleGenerateSpreadsheet = () => {
    generateSpreadsheetMutation.mutate();
  };

  const handleSyncTemplate = () => {
    syncTemplateMutation.mutate();
  };

  const handleEditResponse = (response: ConsultationResponse) => {
    setSelectedResponse(response);
    setEditStatus(response.status || "New");
    setEditPriority(response.priority || "Medium");
    setEditNotes(response.notes || "");
    setEditModalOpen(true);
  };

  const handleSaveStatus = async () => {
    if (!selectedResponse) return;
    
    try {
      const response = await fetch(`/api/consultation/${selectedResponse.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: editStatus,
          priority: editPriority,
          notes: editNotes,
        }),
      });
      
      if (response.ok) {
        toast({
          title: "Status Updated",
          description: `Updated status for ${selectedResponse.firstName} ${selectedResponse.lastName}`,
        });
        setEditModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ['/api/consultation'] });
      } else {
        toast({
          title: "Error",
          description: "Failed to update status",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleViewDetails = (response: ConsultationResponse) => {
    // Scroll to the response or highlight it
    const element = document.getElementById(`response-${response.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('ring-2', 'ring-bennco-purple', 'ring-opacity-50');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-bennco-purple', 'ring-opacity-50');
      }, 2000);
    }
  };

  const handleDeleteResponse = async (id: number) => {
    if (confirm('Are you sure you want to delete this consultation response? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/consultation/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          // Refresh the data
          queryClient.invalidateQueries({ queryKey: ['/api/consultation'] });
          alert('Consultation response deleted successfully');
        } else {
          alert('Failed to delete consultation response');
        }
      } catch (error) {
        alert('Error deleting consultation response');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-bennco-navy mb-8">Consultation Responses</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-bennco-navy">Consultation Responses</h1>
        {responses && responses.length > 0 && (
          <div className="flex gap-3">
            <Button 
              onClick={handleDownloadLatest}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Database className="h-4 w-4" />
              Download Auto-Database
            </Button>
            <Button 
              onClick={handleSyncTemplate}
              disabled={syncTemplateMutation.isPending}
              variant="outline"
              className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 border-blue-300"
            >
              {syncTemplateMutation.isPending ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <FileSpreadsheet className="h-4 w-4" />
              )}
              Sync Your Template
            </Button>
            <Button 
              onClick={handleGenerateSpreadsheet}
              disabled={generateSpreadsheetMutation.isPending}
              variant="outline"
              className="flex items-center gap-2"
            >
              {generateSpreadsheetMutation.isPending ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Generate Standard
            </Button>
            <Button 
              onClick={handleExportToExcel}
              className="bg-gradient-premium hover:shadow-lg flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Quick Export
            </Button>
          </div>
        )}
      </div>

      

      {!responses || responses.length === 0 ? (
        <p className="text-gray-600">No consultation responses yet.</p>
      ) : (
        <div className="space-y-6">
          {responses.map((response) => (
            <ConsultationCard
              key={response.id}
              response={response}
              onEdit={handleEditResponse}
              onDelete={handleDeleteResponse}
            />
          ))}
        </div>
      )}

      {/* Edit Status Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Edit Status - {selectedResponse?.firstName} {selectedResponse?.lastName}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Meeting Scheduled">Meeting Scheduled</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                  <SelectItem value="Closed - Won">Closed - Won</SelectItem>
                  <SelectItem value="Closed - Lost">Closed - Lost</SelectItem>
                  <SelectItem value="Follow-up Required">Follow-up Required</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Select value={editPriority} onValueChange={setEditPriority}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Add internal notes..."
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveStatus}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}