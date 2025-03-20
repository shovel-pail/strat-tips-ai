
import { Dashboard as DashboardComponent } from '@/components/Dashboard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PinCodeDialog } from '@/components/PinCodeDialog';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="py-20 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DashboardComponent />
        </div>
      </section>
      <Footer />
      
      {/* Add PIN protection to view leads link */}
      <div className="fixed bottom-4 right-4 z-10">
        <PinCodeDialog 
          title="Access Business Leads" 
          description="Enter the PIN code to view all business leads."
          redirectTo="/leads"
        >
          <button className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center">
            View all leads
            <span className="ml-1 p-1 bg-muted rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </span>
          </button>
        </PinCodeDialog>
      </div>
    </div>
  );
};

export default Dashboard;
