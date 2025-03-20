import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Lock, Mail, User, Phone, ArrowRight, Building, MapPin, Rocket, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

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
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);

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

  const handleScheduleSubmit = (e: React.FormEvent) => {
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
      source: 'implementation-coach' as const,
      timestamp: new Date().toISOString(),
    };
    
    const existingLeads = JSON.parse(localStorage.getItem('businessInsightLeads') || '[]');
    localStorage.setItem('businessInsightLeads', JSON.stringify([...existingLeads, lead]));
    
    setTimeout(() => {
      setLoading(false);
      setScheduleDialogOpen(false);
      
      toast.success('Call scheduled!', {
        description: 'An implementation coach will contact you shortly.',
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
          Unlock this high-value insight to maximize your business potential. Our premium analysis includes a detailed implementation guide.
        </p>
        
        <div className="space-y-3">
          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden relative">
            <div className="absolute inset-0 bg-stripes opacity-10"></div>
          </div>
          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden relative">
            <div className="absolute inset-0 bg-stripes opacity-10"></div>
          </div>
          <div className="w-3/4 h-3 bg-secondary rounded-full overflow-hidden relative">
            <div className="absolute inset-0 bg-stripes opacity-10"></div>
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
          
          <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full" variant="outline">
                Schedule a Free Call with an Implementation Coach
                <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule Your Implementation Call</DialogTitle>
                <DialogDescription>
                  Our implementation coaches will help you put insights into action with a personalized strategy session.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleScheduleSubmit} className="space-y-4 py-3">
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
                    onClick={() => setScheduleDialogOpen(false)}
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
                    {loading ? 'Scheduling...' : 'Schedule Call'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="px-6 py-3 bg-muted/20 border-t flex justify-between items-center">
        <Link to="/leads" className="text-xs text-muted-foreground hover:text-primary transition-colors">
          View all leads
        </Link>
      </div>
    </div>
  );
}
