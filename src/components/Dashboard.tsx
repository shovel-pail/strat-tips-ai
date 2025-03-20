
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { InsightCard } from './InsightCard';
import { PremiumInsight } from './PremiumInsight';
import { Button } from '@/components/ui/button';
import { FileUpload } from './FileUpload';
import { UserAgreement } from './UserAgreement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Upload, CheckCircle } from 'lucide-react';

type DashboardProps = {
  className?: string;
};

export function Dashboard({ className }: DashboardProps) {
  const [step, setStep] = useState<'upload' | 'agreement' | 'insights'>('upload');
  const [uploadedData, setUploadedData] = useState<any>(null);
  const [processingComplete, setProcessingComplete] = useState(false);
  
  // Mock insights data - in a real app, this would come from the AI processing
  const insights = [
    {
      title: "Implement Variable Pricing Strategy for Top Products",
      potentialGain: "$2,500/month",
      explanation: "Analysis shows your best-selling products have inelastic demand, meaning customers are less sensitive to price increases. Implementing a 5-10% increase on these items can significantly boost profit margins.",
      benchmark: "According to McKinsey & Company research, strategic price optimization typically yields a 2-4% revenue increase, translating to a 10-15% profit increase for small businesses.",
      steps: [
        "Identify your top 3 products by sales volume and profit margin.",
        "Implement a 5% price increase and monitor sales for 2 weeks.",
        "If volume remains stable, consider an additional 5% increase.",
      ],
      effort: "Easy" as const,
    },
    {
      title: "Optimize Marketing Spend Allocation",
      potentialGain: "$1,800/month",
      explanation: "Your current ad spend is evenly distributed, but conversion rates vary significantly by channel. Reallocating budget to high-performing channels will improve ROI.",
      benchmark: "HubSpot's 2023 marketing report found businesses that reallocate marketing budgets quarterly see 23% higher conversion rates than those with static budgets.",
      steps: [
        "Review conversion rates across all marketing channels.",
        "Reduce budget for channels with below-average conversion by 30%.",
        "Reinvest those funds in your top-performing channel.",
      ],
      effort: "Medium" as const,
    },
    {
      title: "Implement Customer Retention Program",
      potentialGain: "$3,200/month",
      explanation: "Your data shows a 15% customer churn rate, higher than industry average. A structured retention program focusing on high-value customers can significantly increase lifetime value.",
      benchmark: "According to Harvard Business Review, increasing customer retention by just 5% can increase profits by 25-95% depending on industry.",
      steps: [
        "Segment customers by purchase frequency and average order value.",
        "Create a personalized offer for your top 20% of customers.",
        "Implement an email sequence with exclusive benefits to encourage repeat purchases.",
      ],
      effort: "Hard" as const,
    },
  ];

  const handleFileProcessed = (data: any) => {
    setUploadedData(data);
    setStep('agreement');
  };

  const handleAgreementAccepted = () => {
    setStep('insights');
    
    // Simulate AI processing time
    setTimeout(() => {
      setProcessingComplete(true);
    }, 3000);
  };

  const resetProcess = () => {
    setStep('upload');
    setUploadedData(null);
    setProcessingComplete(false);
  };

  return (
    <div className={cn("w-full", className)}>
      {step === 'upload' && (
        <div className="max-w-2xl mx-auto animate-fade-in">
          <h2 className="text-2xl font-semibold mb-2">Upload Your Business Data</h2>
          <p className="text-muted-foreground mb-6">
            We'll analyze your customer data to generate actionable profitability insights.
          </p>
          <FileUpload onFileProcessed={handleFileProcessed} />
        </div>
      )}
      
      {step === 'agreement' && (
        <div className="max-w-2xl mx-auto animate-fade-in">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-2" 
              onClick={resetProcess}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <h2 className="text-2xl font-semibold">Review & Agree</h2>
          </div>
          
          {uploadedData && (
            <>
              <div className="mb-6 p-4 bg-secondary rounded-lg">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Upload className="h-4 w-4 mr-1.5" />
                  Uploaded File Preview
                </h3>
                <div className="text-sm">
                  <p className="text-muted-foreground">
                    Filename: <span className="text-foreground">{uploadedData.fileName}</span>
                  </p>
                  <p className="text-muted-foreground">
                    Customers: <span className="text-foreground">{uploadedData.customers.length} records</span>
                  </p>
                  
                  <div className="mt-3 border-t pt-3">
                    <p className="text-xs text-muted-foreground mb-1">Sample Data (first 2 records):</p>
                    <div className="grid grid-cols-1 gap-2">
                      {uploadedData.customers.slice(0, 2).map((customer: any, index: number) => (
                        <div key={index} className="text-xs p-2 bg-white rounded border">
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                            <span className="text-muted-foreground">Name:</span>
                            <span>{customer.name}</span>
                            <span className="text-muted-foreground">Email:</span>
                            <span>{customer.email}</span>
                            <span className="text-muted-foreground">Phone:</span>
                            <span>{customer.phone}</span>
                            <span className="text-muted-foreground">Address:</span>
                            <span>{customer.address}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <UserAgreement onAccept={handleAgreementAccepted} />
            </>
          )}
        </div>
      )}
      
      {step === 'insights' && (
        <div className="animate-fade-in">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-2" 
              onClick={resetProcess}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              New Analysis
            </Button>
            <h2 className="text-2xl font-semibold">Your Business Insights</h2>
          </div>
          
          {!processingComplete ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 animate-pulse">
                <div className="h-8 w-8 rounded-full border-2 border-t-transparent border-primary animate-spin"></div>
              </div>
              <h3 className="text-lg font-medium mb-2">Analyzing Your Business Data</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Our AI is processing your information to generate personalized profitability insights.
                This typically takes 20-30 seconds.
              </p>
            </div>
          ) : (
            <>
              <div className="p-4 border rounded-lg bg-green-50 border-green-100 mb-6 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <p className="text-sm text-green-700">
                  Analysis complete! Here are your personalized business insights based on the data you provided.
                </p>
              </div>
              
              <Tabs defaultValue="insights" className="mb-8">
                <TabsList>
                  <TabsTrigger value="insights">Business Insights</TabsTrigger>
                  <TabsTrigger value="data">Data Summary</TabsTrigger>
                </TabsList>
                <TabsContent value="insights">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 grid grid-cols-1 gap-6">
                      <InsightCard
                        title={insights[0].title}
                        potentialGain={insights[0].potentialGain}
                        explanation={insights[0].explanation}
                        benchmark={insights[0].benchmark}
                        steps={insights[0].steps}
                        effort={insights[0].effort}
                        className="animate-slide-up stagger-1"
                      />
                      <InsightCard
                        title={insights[1].title}
                        potentialGain={insights[1].potentialGain}
                        explanation={insights[1].explanation}
                        benchmark={insights[1].benchmark}
                        steps={insights[1].steps}
                        effort={insights[1].effort}
                        className="animate-slide-up stagger-2"
                      />
                    </div>
                    <PremiumInsight 
                      title={insights[2].title}
                      className="animate-slide-up stagger-3"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="data">
                  <div className="bg-white p-6 rounded-xl border">
                    <h3 className="text-lg font-medium mb-4">Data Summary</h3>
                    {uploadedData && (
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">File Information</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <p className="text-muted-foreground">Filename:</p>
                            <p>{uploadedData.fileName}</p>
                            <p className="text-muted-foreground">File Size:</p>
                            <p>{Math.round(uploadedData.fileSize / 1024)} KB</p>
                            <p className="text-muted-foreground">File Type:</p>
                            <p>{uploadedData.fileType}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Customer Data</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            {uploadedData.customers.length} customer records processed
                          </p>
                          
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="bg-muted">
                                  <th className="py-2 px-3 text-left text-xs font-medium text-muted-foreground">Name</th>
                                  <th className="py-2 px-3 text-left text-xs font-medium text-muted-foreground">Email</th>
                                  <th className="py-2 px-3 text-left text-xs font-medium text-muted-foreground">Phone</th>
                                  <th className="py-2 px-3 text-left text-xs font-medium text-muted-foreground">Address</th>
                                </tr>
                              </thead>
                              <tbody>
                                {uploadedData.customers.map((customer: any, index: number) => (
                                  <tr key={index} className="border-b last:border-0">
                                    <td className="py-2 px-3">{customer.name}</td>
                                    <td className="py-2 px-3">{customer.email}</td>
                                    <td className="py-2 px-3">{customer.phone}</td>
                                    <td className="py-2 px-3">{customer.address}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      )}
    </div>
  );
}
