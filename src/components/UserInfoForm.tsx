
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { toast } from 'sonner';
import { UserAgreement } from './UserAgreement';

interface UserInfoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userInfo: UserInfo) => void;
}

export interface UserInfo {
  name: string;
  email: string;
  company: string;
  agreedToTerms: boolean;
}

export function UserInfoForm({ isOpen, onClose, onSubmit }: UserInfoFormProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    email: '',
    company: '',
    agreedToTerms: false
  });
  const [agreementOpen, setAgreementOpen] = useState(false);

  const handleChange = (field: keyof UserInfo, value: string | boolean) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!userInfo.name || !userInfo.email) {
      toast.error('Missing information', {
        description: 'Please fill in all required fields.'
      });
      return;
    }
    
    if (!userInfo.agreedToTerms) {
      toast.error('Terms required', {
        description: 'You must agree to the terms and conditions to continue.'
      });
      return;
    }
    
    // Submit form
    onSubmit(userInfo);
    onClose();
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Complete your upload</SheetTitle>
            <SheetDescription>
              Please provide your information before we process your file.
            </SheetDescription>
          </SheetHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input 
                id="name"
                value={userInfo.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input 
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input 
                id="company"
                value={userInfo.company}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder="Acme Inc."
              />
            </div>
            
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox 
                id="terms" 
                checked={userInfo.agreedToTerms}
                onCheckedChange={(checked) => 
                  handleChange('agreedToTerms', checked === true)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the terms and conditions
                </label>
                <p className="text-sm text-muted-foreground">
                  <button 
                    type="button"
                    className="underline text-primary hover:text-primary/80"
                    onClick={() => setAgreementOpen(true)}
                  >
                    View user agreement
                  </button>
                </p>
              </div>
            </div>
            
            <SheetFooter className="pt-4">
              <Button type="submit">Continue</Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
      
      <UserAgreement 
        open={agreementOpen} 
        onOpenChange={setAgreementOpen}
        onAccept={() => {
          handleChange('agreedToTerms', true);
          setAgreementOpen(false);
        }}
      />
    </>
  );
}
