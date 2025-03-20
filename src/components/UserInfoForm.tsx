import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Building, MapPin, Shield } from 'lucide-react';
import { Dialog as AgreementDialog, DialogContent as AgreementContent, DialogDescription as AgreementDescription, DialogFooter as AgreementFooter, DialogHeader as AgreementHeader, DialogTitle as AgreementTitle, DialogTrigger as AgreementTrigger } from '@/components/ui/dialog';

export interface UserInfo {
  name: string;
  email: string;
  company?: string;
  industry?: string;
  location?: string;
}

type UserInfoFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userInfo: UserInfo) => void;
};

export function UserInfoForm({ isOpen, onClose, onSubmit }: UserInfoFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showAgreementDialog, setShowAgreementDialog] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user has agreed to terms
    if (!agreedToTerms) {
      // Don't submit if terms not agreed
      return;
    }
    
    // If user has agreed, submit the form
    onSubmit({
      name,
      email,
      company: company || undefined,
      industry: industry || undefined,
      location: location || undefined,
    });
    
    // Reset form
    setName('');
    setEmail('');
    setCompany('');
    setIndustry('');
    setLocation('');
    setAgreedToTerms(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => {
        if (!open) onClose();
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Your Information</DialogTitle>
            <DialogDescription>
              Please provide your details so we can customize your business insights.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="company">Company Name (Optional)</Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your company name"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="industry">Industry</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Building className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="industry"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      placeholder="e.g. Retail, Tech"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City, State, Country"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              
              {/* End-User License Agreement Checkbox */}
              <div className="bg-secondary/20 rounded-lg p-4 border">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 bg-primary/10 p-1.5 rounded-md">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-3 flex-1">
                    <div>
                      <h4 className="text-sm font-medium">End-User License Agreement</h4>
                      <p className="text-xs text-muted-foreground">
                        Before we process your data, please review and accept our terms.
                      </p>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked === true)} 
                        className="mt-1"
                      />
                      <div className="grid gap-1 leading-none">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the End-User License Agreement
                        </label>
                        <p className="text-xs text-muted-foreground">
                          By checking this box, you agree to the terms of our End-User License Agreement governing your use of Strat Tips.{" "}
                          <AgreementDialog open={showAgreementDialog} onOpenChange={setShowAgreementDialog}>
                            <AgreementTrigger asChild>
                              <button className="text-primary underline-offset-2 hover:underline focus:outline-none">
                                View full agreement
                              </button>
                            </AgreementTrigger>
                            <AgreementContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                              <AgreementHeader>
                                <AgreementTitle>End-User License Agreement (EULA) for Strat Tips</AgreementTitle>
                                <AgreementDescription>
                                  Please read our EULA carefully before proceeding.
                                </AgreementDescription>
                              </AgreementHeader>
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
                              <AgreementFooter className="pt-4 mt-4 border-t">
                                <Button 
                                  variant="outline"
                                  onClick={() => setShowAgreementDialog(false)}
                                >
                                  Close
                                </Button>
                                <Button 
                                  onClick={() => {
                                    setAgreedToTerms(true);
                                    setShowAgreementDialog(false);
                                  }}
                                >
                                  Accept Terms
                                </Button>
                              </AgreementFooter>
                            </AgreementContent>
                          </AgreementDialog>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit" variant="gradient" disabled={!agreedToTerms}>Continue</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
