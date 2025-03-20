
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserAgreement } from './UserAgreement';
import { Building, MapPin } from 'lucide-react';

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
  const [agreeOpen, setAgreeOpen] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user has agreed to terms
    if (!hasAgreed) {
      setAgreeOpen(true);
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
    onClose();
  };
  
  const handleAccept = () => {
    setHasAgreed(true);
    setAgreeOpen(false);
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
            </div>
            
            <DialogFooter>
              <Button type="submit" variant="gradient">Continue</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <UserAgreement
        open={agreeOpen}
        onOpenChange={setAgreeOpen}
        onAccept={handleAccept}
      />
    </>
  );
}
