import { useState } from 'react';
import { cn } from '@/lib/utils';
import { InsightCard } from './InsightCard';
import { PremiumInsight } from './PremiumInsight';
import { Button } from '@/components/ui/button';
import { FileUpload } from './FileUpload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Upload, CheckCircle, User, Download, BarChart2, Lock, Calendar, Headphones } from 'lucide-react';
import { generateInsights, type AnalysisResults, type Insight } from '@/utils/aiProcessing';
import { UserInfo } from './UserInfoForm';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';
import { PinCodeDialog } from './PinCodeDialog';
import { useNavigate } from 'react-router-dom';

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
  const [showAllInsights, setShowAllInsights] = useState(false);
  const navigate = useNavigate();
  
  const handleFileProcessed = async (data: any) => {
    setUploadedData(data);
    setUserInfo(data.userInfo);
    setStep('insights');
    setProcessingComplete(false);
    setProcessingError(null);
    
    try {
      const results = await generateInsights(data);
      setAnalysisResults(results);
      setProcessingComplete(true);
      
      if (data.userInfo) {
        const lead = {
          id: Date.now().toString(),
          name: data.userInfo.name,
          email: data.userInfo.email,
          company: data.userInfo.company || '',
          industry: data.userInfo.industry || '',
          location: data.userInfo.location || '',
          source: 'free-submission',
          timestamp: new Date().toISOString(),
          fileName: data.fileName || '',
          fileSize: data.fileSize || 0,
          fileType: data.fileType || '',
          customers: data.customers || [],
          insights: results.insights || [],
        };
        
        console.log('About to store free submission lead:', lead);
        
        const existingLeads = JSON.parse(localStorage.getItem('businessInsightLeads') || '[]');
        localStorage.setItem('businessInsightLeads', JSON.stringify([...existingLeads, lead]));
        
        console.log('Free submission lead stored with all insights:', lead);
      }
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
    toast.success('Action Plan Downloaded', {
      description: 'Your personalized business action plan has been downloaded.',
    });
  };

  const handleAllInsightsAccess = () => {
    setShowAllInsights(true);
    toast.success('All Insights Unlocked', {
      description: 'You now have access to all premium insights.'
    });
  };

  const handleLeadsAccess = () => {
    navigate('/leads');
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
                variant="gradient" 
                size="sm" 
                onClick={handleDownloadPlan}
                className="flex items-center transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg animate-pulse-slow"
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
                    {showAllInsights ? (
                      <TabsTrigger value="all-insights">All Insights</TabsTrigger>
                    ) : (
                      <PinCodeDialog 
                        title="Unlock All Insights" 
                        description="Enter the PIN code to access all premium insights."
                        onSuccess={handleAllInsightsAccess}
                      >
                        <div className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm opacity-50 cursor-pointer">
                          All Insights <Lock className="ml-1 h-3 w-3" />
                        </div>
                      </PinCodeDialog>
                    )}
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
                            healthScore={insight.healthScore}
                            className={`animate-slide-up stagger-${index + 1}`}
                            showPremiumAlert={index === 0}
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
                              
                              {analysisResults.summary.businessHealthScore && (
                                <div>
                                  <div className="flex items-center justify-between mb-1 text-sm">
                                    <span>Business Health Score</span>
                                    <span className="font-medium">{analysisResults.summary.businessHealthScore}/10</span>
                                  </div>
                                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-primary rounded-full" 
                                      style={{ 
                                        width: `${(analysisResults.summary.businessHealthScore / 10) * 100}%` 
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <Button 
                              variant="gradient" 
                              size="sm" 
                              className="w-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg animate-pulse-slow" 
                              onClick={handleDownloadPlan}
                            >
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
                  <TabsContent value="all-insights">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>All Generated Insights</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            This tab shows all insights generated for your business, including those that would normally require a premium upgrade.
                          </p>
                          
                          <div className="space-y-6 mt-4">
                            {analysisResults.insights.map((insight: Insight, index: number) => (
                              <div key={index} className="p-4 border rounded-lg">
                                <h3 className="text-lg font-medium mb-2">{insight.title}</h3>
                                <div className="flex items-center gap-2 mb-2 text-sm">
                                  <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                                    Potential Gain: {insight.potentialGain}
                                  </span>
                                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                                    Effort: {insight.effort}
                                  </span>
                                  <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                                    Urgency: {insight.urgency}
                                  </span>
                                </div>
                                <p className="text-sm mb-3">{insight.explanation}</p>
                                {insight.steps && (
                                  <div className="mt-2">
                                    <h4 className="text-sm font-medium mb-1">Implementation Steps:</h4>
                                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                      {insight.steps.map((step, stepIndex) => (
                                        <li key={stepIndex}>{step}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {insight.benchmark && (
                                  <div className="mt-2 text-sm">
                                    <span className="font-medium">Benchmark: </span>
                                    <span className="text-muted-foreground">{insight.benchmark}</span>
                                  </div>
                                )}
                                {insight.industryComparison && (
                                  <div className="mt-2 text-sm">
                                    <span className="font-medium">Industry Comparison: </span>
                                    <span className="text-muted-foreground">{insight.industryComparison}</span>
                                  </div>
                                )}
                              </div>
                            ))}
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

