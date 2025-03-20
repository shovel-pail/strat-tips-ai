
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Shield, ArrowRight } from 'lucide-react';

type UserAgreementProps = {
  onAccept: () => void;
  className?: string;
};

export function UserAgreement({ onAccept, className }: UserAgreementProps) {
  const [agreed, setAgreed] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAgree = () => {
    setAgreed(true);
  };

  const handleProceed = () => {
    if (agreed) {
      onAccept();
    } else {
      setDialogOpen(true);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="bg-white rounded-xl p-6 border shadow-card">
        <div className="flex items-start mb-4">
          <div className="mr-4 bg-primary/10 p-2.5 rounded-lg">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-medium mb-1">User Agreement</h3>
            <p className="text-sm text-muted-foreground">
              Before we process your data, please review and accept our terms.
            </p>
          </div>
        </div>
        
        <div className="border-t pt-4 mt-4">
          <div className="flex items-start space-x-2 mb-5">
            <Checkbox 
              id="terms" 
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)} 
              className="mt-1"
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the terms and conditions
              </label>
              <p className="text-xs text-muted-foreground">
                By checking this box, you agree to allow us to process your uploaded data to provide 
                business insights. Your data remains private and secure.{" "}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <button className="text-primary underline-offset-2 hover:underline focus:outline-none">
                      View full agreement
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Terms and Conditions</DialogTitle>
                      <DialogDescription>
                        Please read our terms carefully before proceeding.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[60vh] overflow-y-auto pr-2">
                      <div className="space-y-4 text-sm">
                        <h4 className="font-medium">1. Data Usage</h4>
                        <p className="text-muted-foreground">
                          By uploading your data, you grant us permission to process and analyze this information 
                          solely for the purpose of generating business insights for your use. We do not sell or 
                          share your data with third parties.
                        </p>
                        
                        <h4 className="font-medium">2. Data Security</h4>
                        <p className="text-muted-foreground">
                          We implement industry-standard security measures to protect your data. Files are 
                          processed securely and are not stored longer than necessary to provide our services.
                        </p>
                        
                        <h4 className="font-medium">3. AI Analysis</h4>
                        <p className="text-muted-foreground">
                          Our system uses AI to analyze your business data and generate profitability insights. 
                          The quality and accuracy of these insights depend on the data provided.
                        </p>
                        
                        <h4 className="font-medium">4. Privacy</h4>
                        <p className="text-muted-foreground">
                          We respect your privacy and comply with applicable data protection regulations. 
                          For more information, please refer to our Privacy Policy.
                        </p>
                        
                        <h4 className="font-medium">5. Premium Insights</h4>
                        <p className="text-muted-foreground">
                          Some insights are available only in the premium section. Accessing these insights 
                          may require additional registration or purchase.
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        variant="outline"
                        onClick={() => setDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={() => {
                          setAgreed(true);
                          setDialogOpen(false);
                        }}
                      >
                        Accept Terms
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleProceed}
            disabled={!agreed}
            className="w-full"
          >
            Process Data
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
