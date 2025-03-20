
import { useState, useEffect } from 'react';
import { AlertTriangle, X, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type PremiumInsightsDialogProps = {
  count?: number;
};

export function PremiumInsightsDialog({ count = 2 }: PremiumInsightsDialogProps) {
  const [open, setOpen] = useState(false);
  
  // Show the dialog after a short delay when the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 1500); // Show after 1.5 seconds
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-red-600 gap-2">
            <AlertTriangle className="h-5 w-5" />
            Premium Insights Available
          </DialogTitle>
          <DialogDescription>
            You have {count} urgent premium insights waiting that could help improve your business!
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-100 mt-2">
          <p className="text-red-700 text-sm flex items-start gap-2">
            <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
            Premium insights provide deeper analysis and higher-value recommendations tailored to your business.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-end">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
          >
            <X className="mr-2 h-4 w-4" />
            Not Now
          </Button>
          <Button 
            variant="gradient"
            onClick={() => setOpen(false)}
          >
            View Premium Insights
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
