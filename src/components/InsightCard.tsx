
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, DollarSign, TrendingUp, Clock, Globe, Wrench, BarChart, Headphones } from 'lucide-react';
import { toast } from 'sonner';

type InsightCardProps = {
  title: string;
  potentialGain: string;
  explanation: string;
  benchmark: string;
  steps: string[];
  effort: 'Easy' | 'Medium' | 'Hard';
  urgency?: '🔴 Urgent' | '🟡 Important' | '🟢 Long-Term';
  industryComparison?: string;
  freeTools?: string[];
  healthScore?: number;
  className?: string;
  showPremiumAlert?: boolean;
};

export function InsightCard({
  title,
  potentialGain,
  explanation,
  benchmark,
  steps,
  effort,
  urgency,
  industryComparison,
  freeTools,
  healthScore,
  className,
}: InsightCardProps) {
  const effortColor = {
    Easy: 'bg-green-50 text-green-700',
    Medium: 'bg-amber-50 text-amber-700',
    Hard: 'bg-red-50 text-red-700',
  }[effort];

  const handleScheduleCall = () => {
    toast.success('Call Scheduled', {
      description: 'Our implementation coach will contact you soon.',
    });
  };

  return (
    <div className={cn(
      "bg-white rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-card",
      className
    )}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-medium leading-tight flex items-center gap-2">
            {urgency && <span className="text-base">{urgency}</span>}
            {title}
          </h3>
          <Badge variant="outline" className={cn("ml-2", effortColor)}>
            {effort} effort
          </Badge>
        </div>
        
        <div className="flex items-center mb-6 bg-primary/5 p-3 rounded-lg">
          <DollarSign className="h-6 w-6 text-primary flex-shrink-0" />
          <div className="ml-3">
            <p className="text-xs text-muted-foreground">Potential Revenue Gain or Cost Savings</p>
            <p className="font-medium">{potentialGain}</p>
          </div>
        </div>
        
        {healthScore !== undefined && (
          <div className="mb-6 bg-green-50 p-3 rounded-lg">
            <div className="flex items-center mb-2">
              <Award className="h-5 w-5 text-green-600 flex-shrink-0" />
              <p className="ml-3 text-sm font-medium text-green-700">Business Health Score</p>
            </div>
            <div className="relative h-2 bg-green-100 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-green-600 rounded-full"
                style={{ width: `${(healthScore / 10) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-green-700">0</span>
              <span className="text-xs font-medium text-green-700">{healthScore}/10</span>
              <span className="text-xs text-green-700">10</span>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center mb-1">
              <TrendingUp className="h-4 w-4 text-muted-foreground mr-1.5" />
              <h4 className="text-sm font-medium">Why This Works</h4>
            </div>
            <p className="text-sm text-muted-foreground">{explanation}</p>
          </div>
          
          {industryComparison && (
            <div>
              <div className="flex items-center mb-1">
                <Globe className="h-4 w-4 text-muted-foreground mr-1.5" />
                <h4 className="text-sm font-medium">Industry Comparison</h4>
              </div>
              <p className="text-sm text-muted-foreground">{industryComparison}</p>
            </div>
          )}
          
          <div>
            <div className="flex items-center mb-1">
              <Award className="h-4 w-4 text-muted-foreground mr-1.5" />
              <h4 className="text-sm font-medium">Industry Benchmark</h4>
            </div>
            <p className="text-sm text-muted-foreground">{benchmark}</p>
          </div>
          
          <div>
            <div className="flex items-center mb-1">
              <Clock className="h-4 w-4 text-muted-foreground mr-1.5" />
              <h4 className="text-sm font-medium">Do This Now</h4>
            </div>
            <ul className="space-y-2 mt-2">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium flex-shrink-0 mt-0.5 mr-2">
                    {index + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">{step}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {freeTools && freeTools.length > 0 && (
            <div>
              <div className="flex items-center mb-1">
                <Wrench className="h-4 w-4 text-muted-foreground mr-1.5" />
                <h4 className="text-sm font-medium">Helpful Free Tools</h4>
              </div>
              <ul className="space-y-2 mt-2">
                {freeTools.map((tool, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium flex-shrink-0 mt-0.5 mr-2">
                      •
                    </span>
                    <span className="text-sm text-muted-foreground">{tool}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="pt-2">
            <Button 
              variant="gradient" 
              size="sm"
              className="w-full shadow-sm hover:shadow-md transition-all duration-300"
              onClick={handleScheduleCall}
            >
              <Headphones className="mr-2 h-4 w-4" />
              Schedule a Free Call with an Implementation Coach
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
