
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { InsightCard } from './InsightCard';
import { PremiumInsight } from './PremiumInsight';
import { Button } from '@/components/ui/button';
import { FileUpload } from './FileUpload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Upload, CheckCircle, User, Download, BarChart2 } from 'lucide-react';
import { generateInsights, type AnalysisResults, type Insight } from '@/utils/aiProcessing';
import { UserInfo } from './UserInfoForm';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type DashboardProps = {
  className?: string;
};

export function Dashboard({ className }: DashboardProps) {
  const [step, setStep] = useState<'upload' | 'insights'>('upload');
  const [uploadedData, setUploadedData] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [processingError, setProcessingError] = useState<string | null>(null);
  
  const handleFileProcessed = async (data: any) => {
    setUploadedData(data);
    setUserInfo(data.userInfo);
    setStep('insights');
    setProcessingComplete(false);
    setProcessingError(null);
    
    try {
      // Process the uploaded data with AI
      const results = await generateInsights(data);
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
    setUserInfo(null);
    setProcessingComplete(false);
    setAnalysisResults(null);
    setProcessingError(null);
  };
  
  const handleDownloadPlan = () => {
    // In a real implementation, this would generate a PDF summary
    // For this demo, we'll just show a toast message
    import('sonner').then(({ toast }) => {
      toast.success('Action Plan Downloaded', {
        description: 'Your personalized business action plan has been downloaded.',
      });
    });
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
      
      {step === 'insights' && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
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
            
            {processingComplete && !processingError && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDownloadPlan}
                className="flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Action Plan
              </Button>
            )}
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
              
              {userInfo && (
                <div className="mb-6 p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">{userInfo.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {userInfo.email} 
                        {userInfo.company ? ` • ${userInfo.company}` : ''}
                        {userInfo.industry ? ` • ${userInfo.industry}` : ''}
                        {userInfo.location ? ` • ${userInfo.location}` : ''}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
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
                            urgency={insight.urgency}
                            industryComparison={insight.industryComparison}
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
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <Card className="lg:col-span-2">
                        <CardHeader>
                          <CardTitle className="text-lg">Business Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
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
                                  {analysisResults.summary.profitMargins && (
                                    <>
                                      <p className="text-muted-foreground">Profit Margins:</p>
                                      <p>{analysisResults.summary.profitMargins}</p>
                                    </>
                                  )}
                                  {analysisResults.summary.adSpendConversion && (
                                    <>
                                      <p className="text-muted-foreground">Ad Spend / Conversion:</p>
                                      <p>{analysisResults.summary.adSpendConversion}</p>
                                    </>
                                  )}
                                  {analysisResults.summary.industry && (
                                    <>
                                      <p className="text-muted-foreground">Industry:</p>
                                      <p>{analysisResults.summary.industry}</p>
                                    </>
                                  )}
                                  {analysisResults.summary.location && (
                                    <>
                                      <p className="text-muted-foreground">Location:</p>
                                      <p>{analysisResults.summary.location}</p>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Performance Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-md">
                              <BarChart2 className="h-5 w-5 text-primary" />
                              <div>
                                <h4 className="text-sm font-medium">Overall Performance</h4>
                                <p className="text-sm text-muted-foreground">Based on your data analysis</p>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              {/* Performance metrics */}
                              <div>
                                <div className="flex items-center justify-between mb-1 text-sm">
                                  <span>Revenue Growth</span>
                                  <span className="font-medium">{analysisResults.summary.salesGrowth.replace('+', '')}</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary rounded-full" 
                                    style={{ 
                                      width: `${Math.min(100, parseInt(analysisResults.summary.salesGrowth.replace('+', '').replace('%', '')) * 5)}%` 
                                    }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex items-center justify-between mb-1 text-sm">
                                  <span>Customer Retention</span>
                                  <span className="font-medium">{analysisResults.summary.customerRetentionRate}</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary rounded-full" 
                                    style={{ 
                                      width: `${parseInt(analysisResults.summary.customerRetentionRate.replace('%', ''))}%` 
                                    }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex items-center justify-between mb-1 text-sm">
                                  <span>Cash Flow Status</span>
                                  <span className="font-medium">{analysisResults.summary.cashFlowStatus}</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary rounded-full" 
                                    style={{ 
                                      width: analysisResults.summary.cashFlowStatus === 'Healthy' ? '80%' : '40%' 
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            
                            <Button variant="outline" size="sm" className="w-full" onClick={handleDownloadPlan}>
                              <Download className="h-4 w-4 mr-2" />
                              Download Full Report
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="lg:col-span-3">
                        <CardHeader>
                          <CardTitle className="text-lg">Customer Data</CardTitle>
                        </CardHeader>
                        <CardContent>
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
                        </CardContent>
                      </Card>
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
