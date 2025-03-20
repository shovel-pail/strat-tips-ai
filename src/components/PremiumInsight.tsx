
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Lock, Mail, User, Phone, ArrowRight, Building, MapPin, Rocket, AlertTriangle, Lightbulb, Wrench } from 'lucide-react';
import { toast } from 'sonner';

type PremiumInsightProps = {
  title: string;
  className?: string;
};

export function PremiumInsight({ title, className }: PremiumInsightProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const lead = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      company,
      industry,
      location,
      source: 'premium-insight' as const,
      timestamp: new Date().toISOString(),
    };
    
    const existingLeads = JSON.parse(localStorage.getItem('businessInsightLeads') || '[]');
    localStorage.setItem('businessInsightLeads', JSON.stringify([...existingLeads, lead]));
    
    setTimeout(() => {
      setLoading(false);
      setDialogOpen(false);
      
      toast.success('Premium insight unlocked!', {
        description: 'Check your email for the full analysis and action plan.',
      });
      
      setEmail('');
      setName('');
      setPhone('');
      setCompany('');
      setIndustry('');
      setLocation('');
    }, 1500);
  };

  return (
    <div className={cn(
      "bg-gradient-to-b from-secondary to-white rounded-xl border overflow-hidden", 
      className
    )}>
      <div className="p-6">
        <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-primary/10 mb-4">
          <Rocket className="h-6 w-6 text-primary" />
        </div>
        
        <h3 className="text-lg font-medium text-center mb-2">
          Take your business off with Premium Insights & Implementation
        </h3>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Unlock premium features to maximize your business potential with our comprehensive analysis and implementation plan.
        </p>
        
        {/* Premium Benefits */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-amber-100">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Real-Time Alerts for Financial & Operational Risks</h4>
              <p className="text-xs text-muted-foreground">Get instant notifications about critical business issues</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
              <Lightbulb className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Premium Business Insights</h4>
              <p className="text-xs text-muted-foreground">Advanced analytics and personalized recommendations</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100">
              <Wrench className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Implementation Support</h4>
              <p className="text-xs text-muted-foreground">Expert guidance to put insights into action</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-3 mt-6">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full" variant="gradient">
                Unlock Premium Insight
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Unlock Premium Business Insight</DialogTitle>
                <DialogDescription>
                  Enter your details to receive this high-value business analysis and downloadable action plan.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4 py-3">
                <div className="space-y-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      required
                      type="text"
                      placeholder="Full Name"
                      className="pl-10"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      required
                      type="email"
                      placeholder="Email Address"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      required
                      type="tel"
                      placeholder="Phone Number"
                      className="pl-10"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Building className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      required
                      type="text"
                      placeholder="Company Name"
                      className="pl-10"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Building className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        required
                        type="text"
                        placeholder="Industry"
                        className="pl-10"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        required
                        type="text"
                        placeholder="Location"
                        className="pl-10"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2 space-y-2 sm:space-y-0 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setDialogOpen(false)}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    variant="gradient"
                    className="w-full sm:w-auto"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Get Premium Insight'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="px-6 py-3 bg-muted/20 border-t">
        {/* Empty div to maintain spacing, but without the View leads link */}
      </div>
    </div>
  );
}
