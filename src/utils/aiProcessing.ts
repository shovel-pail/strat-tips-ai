
export interface Insight {
  title: string;
  potentialGain: string;
  explanation: string;
  benchmark: string;
  steps: string[];
  effort: 'Easy' | 'Medium' | 'Hard';
}

export interface AnalysisResults {
  insights: Insight[];
  summary: {
    totalRevenue: string;
    bestSellingProduct: string;
    salesGrowth: string;
    cashFlowStatus: string;
    customerRetentionRate: string;
  };
}

// For this demo version, we're generating insights based on some basic patterns in the data
// In a real implementation, this would connect to an actual AI service
export async function generateInsights(data: any): Promise<AnalysisResults> {
  // Simulate processing time to make the AI analysis feel more realistic
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Use the number of customers to influence some of the generated values
  const customerCount = data?.customers?.length || 0;
  const hasEmail = data?.customers?.some((customer: any) => customer.email?.includes('@'));
  const hasPhoneNumbers = data?.customers?.some((customer: any) => customer.phone?.includes('-'));
  
  // Generate revenue based on customer count
  const revenue = 15000 + (customerCount * 500);
  
  // Generate growth rate with slight randomization
  const growthBase = customerCount > 8 ? 4.5 : 2.1;
  const growth = (growthBase + (Math.random() * 0.8)).toFixed(1);
  
  // Determine retention rate
  const retentionBase = 68 + (customerCount * 0.5);
  const retention = Math.min(92, retentionBase);
  
  // Generate custom insights based on data patterns
  const insights: Insight[] = [];
  
  // Email marketing insight if we have email addresses
  if (hasEmail) {
    insights.push({
      title: "Implement Segmented Email Marketing Campaign",
      potentialGain: `$${(revenue * 0.07).toFixed(0)}/month`,
      explanation: "Your customer database contains email addresses that aren't being fully utilized. A targeted email campaign with segmented customer groups can significantly increase repeat purchases.",
      benchmark: "According to Campaign Monitor's 2023 report, segmented email campaigns drive 760% more revenue than generic campaigns.",
      steps: [
        "Segment your customer list based on purchase history and frequency.",
        "Create three different email templates for high, medium, and low-value customers.",
        "Schedule a monthly campaign with personalized offers for each segment."
      ],
      effort: "Medium"
    });
  }
  
  // Customer retention insight
  insights.push({
    title: "Launch Customer Loyalty Program",
    potentialGain: `$${(revenue * 0.09).toFixed(0)}/month`,
    explanation: `Your current retention rate of ${retention.toFixed(0)}% can be improved through a structured loyalty program. Increasing retention by just 5% would significantly boost your bottom line.`,
    benchmark: "Harvard Business Review research shows that increasing customer retention by 5% can increase profits by 25-95% depending on industry.",
    steps: [
      "Create a simple points system that rewards repeat purchases.",
      "Implement a tiered rewards structure with clear benefits.",
      "Promote the program to existing customers via email and at point of sale."
    ],
    effort: customerCount > 10 ? "Hard" : "Medium"
  });
  
  // Phone-based outreach if we have phone numbers
  if (hasPhoneNumbers) {
    insights.push({
      title: "Develop Proactive Customer Outreach Strategy",
      potentialGain: `$${(revenue * 0.06).toFixed(0)}/month`,
      explanation: "Your customer database includes phone numbers, creating an opportunity for personalized outreach to high-value customers. Direct contact can significantly increase customer lifetime value.",
      benchmark: "Bain & Company research shows that businesses with proactive outreach programs increase customer spending by 20-40% compared to reactive-only communication.",
      steps: [
        "Identify your top 20% of customers by purchase value.",
        "Develop a simple call script focused on appreciation and gathering feedback.",
        "Schedule quarterly check-in calls with these high-value customers."
      ],
      effort: "Easy"
    });
  }
  
  // Pricing optimization insight
  insights.push({
    title: "Implement Data-Driven Pricing Optimization",
    potentialGain: `$${(revenue * 0.11).toFixed(0)}/month`,
    explanation: "Analysis suggests you can increase margins through strategic price adjustments on key products. Your current pricing structure may be leaving money on the table.",
    benchmark: "McKinsey research shows that a 1% price optimization improvement yields an 8.7% increase in operating profits for most businesses.",
    steps: [
      "Identify your top 5 products by sales volume.",
      "Test a 5-10% price increase on 2 products for 30 days.",
      "Analyze sales volume impact and adjust strategy accordingly."
    ],
    effort: "Medium"
  });
  
  // Operational efficiency insight
  insights.push({
    title: "Streamline Operational Workflows",
    potentialGain: `$${(revenue * 0.05).toFixed(0)}/month`,
    explanation: "Your current operational structure has inefficiencies that can be addressed through process optimization. Reducing administrative overhead can free up capital for growth initiatives.",
    benchmark: "Deloitte's business operations benchmark study found that streamlined workflows typically reduce operational costs by 15-25% in small to medium businesses.",
    steps: [
      "Document current processes for your 3 most time-consuming activities.",
      "Identify redundant steps and automation opportunities.",
      "Implement changes and track time savings over 60 days."
    ],
    effort: "Easy"
  });
  
  // Randomize the order of insights
  const shuffledInsights = [...insights].sort(() => Math.random() - 0.5);
  
  // Take the first 4 insights
  const selectedInsights = shuffledInsights.slice(0, 4);
  
  return {
    insights: selectedInsights,
    summary: {
      totalRevenue: `$${revenue.toLocaleString()}`,
      bestSellingProduct: data?.fileName?.includes('invoice') ? 'Premium Service Package' : 'Signature Product',
      salesGrowth: `+${growth}%`,
      cashFlowStatus: customerCount > 7 ? 'Healthy' : 'Needs Attention',
      customerRetentionRate: `${retention.toFixed(0)}%`,
    },
  };
}
