
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { Footer } from '@/components/Footer';
import { ArrowDown, BarChart2, FileText, Brain, Zap, ArrowRight } from 'lucide-react';

const Index = () => {
  const dashboardRef = useRef<HTMLDivElement>(null);
  
  const scrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden bg-gradient-to-b from-white to-secondary/20">
        <div className="absolute inset-0 bg-subtle-grid opacity-25"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              AI-Powered Business Insights
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-down">
              Unlock Hidden Profits in Your Business Data
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-down stagger-1">
              Upload your business data and get instant, AI-generated profitability insights that help you make smarter decisions and boost your bottom line.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-down stagger-2">
              <Button size="lg" onClick={scrollToDashboard}>
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
            
            <div className="mt-16 flex justify-center animate-slide-down stagger-3">
              <button 
                onClick={scrollToDashboard}
                className="flex flex-col items-center text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <span className="mb-2">Scroll to try it out</span>
                <ArrowDown className="h-4 w-4 animate-float" />
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Turn your business data into actionable insights in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="relative p-6 rounded-xl border bg-white shadow-card transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">1. Upload Your Data</h3>
              <p className="text-muted-foreground">
                Simply upload a PDF or CSV file containing your business data. Our system securely processes customer information.
              </p>
            </div>
            
            <div className="relative p-6 rounded-xl border bg-white shadow-card transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">2. AI Analysis</h3>
              <p className="text-muted-foreground">
                Our advanced AI analyzes your data to identify profit-boosting opportunities and efficiency improvements.
              </p>
            </div>
            
            <div className="relative p-6 rounded-xl border bg-white shadow-card transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">3. Get Actionable Insights</h3>
              <p className="text-muted-foreground">
                Receive clear, specific recommendations with estimated financial impact and simple implementation steps.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dashboard Section */}
      <section ref={dashboardRef} className="py-20 md:py-32 bg-gradient-to-b from-secondary/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <BarChart2 className="h-4 w-4 mr-2" />
              Try It Yourself
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Generate Your Business Insights</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Upload your business data below and discover new opportunities for growth
            </p>
          </div>
          
          <Dashboard />
        </div>
      </section>
      
      {/* Testimonials/CTA Section - optional, not implementing for brevity */}
      
      <Footer />
    </div>
  );
};

export default Index;
