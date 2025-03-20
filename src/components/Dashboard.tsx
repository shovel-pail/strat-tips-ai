
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { InsightCard } from './InsightCard';
import { PremiumInsight } from './PremiumInsight';
import { Button } from '@/components/ui/button';
import { FileUpload } from './FileUpload';
import { UserAgreement } from './UserAgreement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Upload, CheckCircle } from 'lucide-react';
import { generateInsights, type AnalysisResults, type Insight } from '@/utils/aiProcessing';

type DashboardProps = {
  className?: string;
};

export function Dashboard({ className }: DashboardProps) {
  const [step, setStep] = useState<'upload' | 'agreement' | 'insights'>('upload');
  const [uploadedData, setUploadedData] = useState<any>(null);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [processingError, setProcessingError] = useState<string | null>(null);
  
  const handleFileProcessed = (data: any) => {
    setUploadedData(data);
    setStep('agreement');
  };

  const handleAgreementAccepted = async () => {
    setStep('insights');
    setProcessingComplete(false);
    setProcessingError(null);
    
    try {
      // Process the uploaded data with AI
      const results = await generateInsights(uploadedData);
      setAnalysisResults(results);
      setProcessingComplete(true);
    } catch (error) {
      console.error('Error processing data:', error);
      setProcessingError('There was an error analyzing your data. Please try again.');
      setProcessingComplete(true);
    }
  };

  const resetProcess = () => {
    setStep('upload');
    setUploadedData(null);
    setProcessingComplete(false);
    setAnalysisResults(null);
    setProcessingError(null);
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
          ) : processingError ? (
            <div className="p-6 border rounded-lg bg-red-50 border-red-100 mb-6">
              <h3 className="text-lg font-medium mb-2 text-red-700">Processing Error</h3>
              <p className="text-red-600">{processingError}</p>
              <Button 
                variant="outline"
                className="mt-4"
                onClick={resetProcess}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <div className="p-4 border rounded-lg bg-green-50 border-green-100 mb-6 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <p className="text-sm text-green-700">
                  Analysis complete! Here are your personalized business insights based on the data you provided.
                </p>
              </div>
              
              {analysisResults && (
                <Tabs defaultValue="insights" className="mb-8">
                  <TabsList>
                    <TabsTrigger value="insights">Business Insights</TabsTrigger>
                    <TabsTrigger value="data">Data Summary</TabsTrigger>
                  </TabsList>
                  <TabsContent value="insights">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2 grid grid-cols-1 gap-6">
                        {analysisResults.insights.slice(0, 2).map((insight: Insight, index: number) => (
                          <InsightCard
                            key={index}
                            title={insight.title}
                            potentialGain={insight.potentialGain}
                            explanation={insight.explanation}
                            benchmark={insight.benchmark}
                            steps={insight.steps}
                            effort={insight.effort}
                            className={`animate-slide-up stagger-${index + 1}`}
                          />
                        ))}
                      </div>
                      {analysisResults.insights.length > 2 && (
                        <PremiumInsight 
                          title={analysisResults.insights[2].title}
                          className="animate-slide-up stagger-3"
                        />
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="data">
                    <div className="bg-white p-6 rounded-xl border">
                      <h3 className="text-lg font-medium mb-4">Business Summary</h3>
                      {uploadedData && analysisResults.summary && (
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Key Metrics</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <p className="text-muted-foreground">Total Revenue:</p>
                              <p>{analysisResults.summary.totalRevenue}</p>
                              <p className="text-muted-foreground">Best Selling Product:</p>
                              <p>{analysisResults.summary.bestSellingProduct}</p>
                              <p className="text-muted-foreground">Sales Growth:</p>
                              <p>{analysisResults.summary.salesGrowth}</p>
                              <p className="text-muted-foreground">Cash Flow Status:</p>
                              <p>{analysisResults.summary.cashFlowStatus}</p>
                              <p className="text-muted-foreground">Customer Retention Rate:</p>
                              <p>{analysisResults.summary.customerRetentionRate}</p>
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
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
