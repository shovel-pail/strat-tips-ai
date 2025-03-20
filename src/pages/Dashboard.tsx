
import { Dashboard as DashboardComponent } from '@/components/Dashboard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PremiumInsightsDialog } from '@/components/PremiumInsightsDialog';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="py-20 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DashboardComponent />
          <PremiumInsightsDialog />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
