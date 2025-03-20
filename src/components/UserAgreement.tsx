
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
            <h3 className="text-base font-medium mb-1">End-User License Agreement</h3>
            <p className="text-sm text-muted-foreground">
              Before we process your data, please review and accept our End-User License Agreement.
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
                I agree to the End-User License Agreement
              </label>
              <p className="text-xs text-muted-foreground">
                By checking this box, you agree to the terms of our End-User License Agreement governing your use of Strat Tips.{" "}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <button className="text-primary underline-offset-2 hover:underline focus:outline-none">
                      View full agreement
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                    <DialogHeader>
                      <DialogTitle>End-User License Agreement (EULA) for Strat Tips</DialogTitle>
                      <DialogDescription>
                        Please read our EULA carefully before proceeding.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto pr-2 text-sm">
                      <div className="space-y-4">
                        <p className="text-muted-foreground italic">
                          Effective Date: [Insert Date]<br />
                          Last Updated: [Insert Date]
                        </p>
                        
                        <p className="font-medium">
                          THIS AGREEMENT CONTAINS LEGAL TERMS THAT GOVERN YOUR USE OF STRAT TIPS. PLEASE READ IT CAREFULLY.
                        </p>
                        
                        <p>
                          This End-User License Agreement ("Agreement") is a legally binding contract between Strat Tips, Inc. ("Strat Tips," "Company," "we," "our," or "us") and you ("User," "you," or "your"), governing your access to and use of Strat Tips' software, services, and third-party integrations (collectively, the "Software").
                        </p>
                        
                        <p>
                          By accessing or using the Software, you agree to the terms of this Agreement. If you do not agree, you must immediately discontinue use.
                        </p>
                        
                        <h4 className="font-semibold text-base mt-6">1. License Grant</h4>
                        <p>
                          Strat Tips grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Software strictly for business analytics purposes.
                        </p>
                        
                        <p>
                          <span className="font-medium">Prohibited Uses:</span>
                          <ul className="list-disc pl-6 space-y-1 mt-1">
                            <li>Copying, modifying, distributing, sublicensing, or reselling the Software.</li>
                            <li>Reverse engineering, decompiling, or disassembling the Software.</li>
                            <li>Using the Software for fraudulent, illegal, or unauthorized activities.</li>
                            <li>Accessing or extracting data beyond your authorized permissions.</li>
                          </ul>
                        </p>
                        
                        <h4 className="font-semibold text-base mt-6">2. Third-Party Integrations (QuickBooks, Stripe, Shopify, etc.)</h4>
                        <p>
                          Strat Tips integrates with QuickBooks, Stripe, Shopify, Google Sheets, and other third-party platforms to retrieve and analyze business data.
                        </p>
                        
                        <p>
                          <span className="font-medium">By linking your account(s), you:</span>
                          <ul className="list-disc pl-6 space-y-1 mt-1">
                            <li>Authorize Strat Tips to access, retrieve, and process your business data for insights.</li>
                            <li>Acknowledge that we do not modify, store, or share your payment credentials.</li>
                            <li>Understand that service disruptions, API failures, or policy changes from third-party providers are beyond our control.</li>
                          </ul>
                        </p>
                        
                        <p>
                          You may revoke access at any time by disconnecting your integrations in your account settings.
                        </p>
                        
                        <h4 className="font-semibold text-base mt-6">3. Data Ownership & Privacy</h4>
                        
                        <p className="font-medium">A. Your Data Rights</p>
                        <ul className="list-disc pl-6 space-y-1 mt-1">
                          <li>You retain full ownership of your business data. Strat Tips does not claim rights over your financial records.</li>
                          <li>We process data only to generate insights. We do not alter, sell, or misuse it.</li>
                        </ul>
                        
                        <p className="font-medium mt-3">B. Security & Compliance</p>
                        <ul className="list-disc pl-6 space-y-1 mt-1">
                          <li>Data Encryption: We use end-to-end encryption for secure data transfers.</li>
                          <li>Compliance: Strat Tips complies with GDPR, CCPA, and applicable data protection laws.</li>
                          <li>Access Controls: We restrict internal access to user data to authorized personnel only.</li>
                        </ul>
                        
                        <p className="font-medium mt-3">C. Data Retention & Deletion</p>
                        <ul className="list-disc pl-6 space-y-1 mt-1">
                          <li>Strat Tips does not retain raw user financial data after processing insights.</li>
                          <li>You may request data deletion by contacting [Insert Contact Email].</li>
                        </ul>
                        
                        <h4 className="font-semibold text-base mt-6">4. Disclaimer of Warranties</h4>
                        <ul className="list-disc pl-6 space-y-1 mt-1">
                          <li>The Software is provided "as is" without warranties of any kind.</li>
                          <li>We do not guarantee the accuracy, completeness, or reliability of AI-generated insights.</li>
                          <li>Use of the Software is at your own risk.</li>
                        </ul>
                        
                        <p className="mt-3">
                          <span className="font-medium">Strat Tips is not responsible for:</span>
                          <ul className="list-disc pl-6 space-y-1 mt-1">
                            <li>Business losses, financial damages, or missed opportunities due to AI-generated insights.</li>
                            <li>Errors, bugs, or inaccuracies in insights.</li>
                            <li>Third-party service disruptions affecting data access.</li>
                          </ul>
                        </p>
                        
                        <p className="mt-3">
                          <span className="font-medium">No Professional Advice:</span> Strat Tips does not provide financial, tax, legal, or investment advice. Consult a qualified professional before making financial decisions.
                        </p>
                        
                        <h4 className="font-semibold text-base mt-6">5. Limitation of Liability</h4>
                        <p>
                          To the maximum extent permitted by law:
                          <ul className="list-disc pl-6 space-y-1 mt-1">
                            <li>Strat Tips is not liable for indirect, incidental, special, punitive, or consequential damages.</li>
                            <li>Total liability is capped at the amount you paid for the Software in the last three (3) months.</li>
                            <li>We are not responsible for API restrictions or service interruptions from third-party providers.</li>
                          </ul>
                        </p>
                        
                        <h4 className="font-semibold text-base mt-6">6. Termination of Access</h4>
                        <p>
                          Strat Tips may suspend or terminate your account if:
                          <ul className="list-disc pl-6 space-y-1 mt-1">
                            <li>You violate this Agreement.</li>
                            <li>You misuse integrations with QuickBooks, Stripe, or other platforms.</li>
                            <li>Third-party providers revoke our API access.</li>
                          </ul>
                        </p>
                        
                        <p className="mt-3">
                          Upon termination, your license to use Strat Tips ends immediately, and any stored data may be deleted.
                        </p>
                        
                        <h4 className="font-semibold text-base mt-6">7. Software Updates & Modifications</h4>
                        <p>
                          Strat Tips reserves the right to:
                          <ul className="list-disc pl-6 space-y-1 mt-1">
                            <li>Modify, update, or discontinue features at any time.</li>
                            <li>Communicate major updates requiring user consent in advance.</li>
                            <li>Enforce continued use of the Software as acceptance of new terms.</li>
                          </ul>
                        </p>
                        
                        <h4 className="font-semibold text-base mt-6">8. Governing Law & Dispute Resolution</h4>
                        <p>
                          This Agreement is governed by the laws of [Insert Jurisdiction].
                          <ul className="list-disc pl-6 space-y-1 mt-1">
                            <li>Dispute Resolution: All disputes shall be resolved through arbitration before legal action is pursued.</li>
                            <li>Class-Action Waiver: Users waive the right to participate in class-action lawsuits against Strat Tips.</li>
                          </ul>
                        </p>
                        
                        <p className="mt-3">
                          For legal concerns, contact: [Insert Legal Email]
                        </p>
                        
                        <h4 className="font-semibold text-base mt-6">9. Force Majeure</h4>
                        <p>
                          Strat Tips is not liable for service interruptions or failures caused by:
                          <ul className="list-disc pl-6 space-y-1 mt-1">
                            <li>Cyberattacks, data breaches, or third-party API failures.</li>
                            <li>Natural disasters, government actions, or pandemics.</li>
                            <li>Economic downturns or financial regulations affecting operations.</li>
                          </ul>
                        </p>
                        
                        <h4 className="font-semibold text-base mt-6">10. Entire Agreement & Severability</h4>
                        <ul className="list-disc pl-6 space-y-1 mt-1">
                          <li>This Agreement constitutes the entire agreement between you and Strat Tips.</li>
                          <li>If any part of this Agreement is found to be invalid, the remaining terms remain in full effect.</li>
                          <li>Failure to enforce any term does not waive our right to enforce it later.</li>
                        </ul>
                        
                        <h4 className="font-semibold text-base mt-6">11. Contact Information</h4>
                        <p>
                          For any questions or concerns regarding this Agreement, contact us at:<br />
                          [Insert Contact Email]
                        </p>
                        
                        <p className="text-muted-foreground mt-6">
                          Last Updated: [Insert Date]
                        </p>
                      </div>
                    </div>
                    <DialogFooter className="pt-4 mt-4 border-t">
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
