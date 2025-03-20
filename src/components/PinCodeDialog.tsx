
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from 'sonner';
import { useNavigate, useLocation } from 'react-router-dom';

interface PinCodeDialogProps {
  children: React.ReactNode;
  title: string;
  description: string;
  correctPin?: string;
  onSuccess?: () => void;
  redirectTo?: string;
}

export function PinCodeDialog({ 
  children, 
  title, 
  description, 
  correctPin = "0000", 
  onSuccess,
  redirectTo
}: PinCodeDialogProps) {
  const [pin, setPin] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // If we're on the leads page and don't have authorization, show dialog
  useEffect(() => {
    const hasAuthorized = sessionStorage.getItem('leads-authorized') === 'true';
    if (location.pathname === '/leads' && !hasAuthorized) {
      setIsOpen(true);
    }
  }, [location.pathname]);

  const handlePinSubmit = () => {
    if (pin === correctPin) {
      setError(false);
      setIsOpen(false);
      
      // Store authorization in session storage
      if (redirectTo === '/leads') {
        sessionStorage.setItem('leads-authorized', 'true');
      }
      
      if (onSuccess) {
        onSuccess();
      } else if (redirectTo) {
        navigate(redirectTo);
      }
    } else {
      setError(true);
      toast.error('Invalid PIN code', {
        description: 'Please try again with the correct PIN.'
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-center mb-4">
              Enter the 4-digit PIN code to access this feature.
            </p>
            
            <InputOTP 
              maxLength={4} 
              value={pin} 
              onChange={setPin}
              containerClassName="justify-center"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className={error ? "border-red-500" : ""} />
                <InputOTPSlot index={1} className={error ? "border-red-500" : ""} />
                <InputOTPSlot index={2} className={error ? "border-red-500" : ""} />
                <InputOTPSlot index={3} className={error ? "border-red-500" : ""} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              setIsOpen(false);
              if (location.pathname === '/leads') {
                navigate('/dashboard');
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="gradient"
            onClick={handlePinSubmit}
            disabled={pin.length !== 4}
          >
            Unlock Access
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
