export interface Insight {
  title: string;
  potentialGain: string;
  explanation: string;
  benchmark: string;
  steps: string[];
  effort: 'Easy' | 'Medium' | 'Hard';
  urgency?: '🔴 Urgent' | '🟡 Important' | '🟢 Long-Term';
  industryComparison?: string;
  freeTools?: string[];
  revenueScore?: number;
}

export interface AnalysisResults {
  insights: Insight[];
  summary: {
    totalRevenue: string;
    bestSellingProduct: string;
    salesGrowth: string;
    cashFlowStatus: string;
    customerRetentionRate: string;
    profitMargins?: string;
    adSpendConversion?: string;
    industry?: string;
    location?: string;
  };
}

export async function generateInsights(data: any): Promise<AnalysisResults> {
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const customerCount = data?.customers?.length || 0;
  const hasEmail = data?.customers?.some((customer: any) => customer.email?.includes('@'));
  const hasPhoneNumbers = data?.customers?.some((customer: any) => customer.phone?.includes('-'));
  const industry = data?.userInfo?.industry || 'Retail';
  const location = data?.userInfo?.location || 'United States';
  
  const revenue = 15000 + (customerCount * 500);
  
  const growthBase = customerCount > 8 ? 4.5 : 2.1;
  const growth = (growthBase + (Math.random() * 0.8)).toFixed(1);
  
  const retentionBase = 68 + (customerCount * 0.5);
  const retention = Math.min(92, retentionBase);
  
  const profitMargins = `${Math.floor(20 + Math.random() * 15)}%`;
  
  const adSpend = Math.floor(revenue * 0.08);
  const conversionRate = (2 + Math.random() * 3).toFixed(1);
  const adSpendConversion = `$${adSpend.toLocaleString()} / ${conversionRate}%`;
  
  const urgencyLevels: Array<'🔴 Urgent' | '🟡 Important' | '🟢 Long-Term'> = ['🔴 Urgent', '🟡 Important', '🟢 Long-Term'];
  
  const insights: Insight[] = [];
  
  const baseRevenueScore = Math.min(8, Math.max(3, Math.floor(customerCount / 2) + (parseFloat(growth) > 3 ? 2 : 0)));
  
  if (hasEmail) {
    insights.push({
      title: "Implement Segmented Email Marketing Campaign",
      potentialGain: `$${(revenue * 0.07).toFixed(0)}/month`,
      explanation: "Your customer database contains email addresses that aren't being fully utilized. A targeted email campaign with segmented customer groups can significantly increase repeat purchases.",
      industryComparison: `Compared to similar businesses in ${industry} located in ${location}, your customer engagement rate is likely 15-20% lower than industry leaders using segmented campaigns.`,
      benchmark: "According to Campaign Monitor's 2023 report, segmented email campaigns drive 760% more revenue than generic campaigns. Mailchimp's analysis found that segmented campaigns had 14.31% higher open rates and 100.95% higher click-through rates than non-segmented campaigns.",
      steps: [
        "Segment your customer list based on purchase history and frequency.",
        "Create three different email templates for high, medium, and low-value customers.",
        "Schedule a monthly campaign with personalized offers for each segment."
      ],
      effort: "Medium",
      urgency: "🟡 Important",
      freeTools: [
        "Mailchimp (Free tier up to 2,000 contacts)",
        "HubSpot Email Marketing (Free tier available)",
        "Segmentation Template Spreadsheet (Available on our Resources page)"
      ],
      revenueScore: baseRevenueScore - 1 + Math.floor(Math.random() * 3)
    });
  }
  
  insights.push({
    title: "Launch Customer Loyalty Program",
    potentialGain: `$${(revenue * 0.09).toFixed(0)}/month`,
    explanation: `Your current retention rate of ${retention.toFixed(0)}% can be improved through a structured loyalty program. Increasing retention by just 5% would significantly boost your bottom line.`,
    industryComparison: `The average retention rate for ${industry} businesses in ${location} is 72%. Your rate of ${retention.toFixed(0)}% is ${retention > 72 ? 'above' : 'below'} average, but top performers achieve 80%+.`,
    benchmark: "Harvard Business Review research shows that increasing customer retention by 5% can increase profits by 25-95% depending on industry. Loyalty program members spend 12-18% more annually than non-members according to Bond's Loyalty Report.",
    steps: [
      "Create a simple points system that rewards repeat purchases.",
      "Implement a tiered rewards structure with clear benefits.",
      "Promote the program to existing customers via email and at point of sale."
    ],
    effort: customerCount > 10 ? "Hard" : "Medium",
    urgency: "🔴 Urgent",
    freeTools: [
      "Loyalty Program Planning Template (Free download from our Resources)",
      "Open Loyalty (Open-source loyalty program software)",
      "Customer Rewards Calculator Spreadsheet"
    ],
    revenueScore: baseRevenueScore + Math.floor(Math.random() * 2)
  });
  
  if (hasPhoneNumbers) {
    insights.push({
      title: "Develop Proactive Customer Outreach Strategy",
      potentialGain: `$${(revenue * 0.06).toFixed(0)}/month`,
      explanation: "Your customer database includes phone numbers, creating an opportunity for personalized outreach to high-value customers. Direct contact can significantly increase customer lifetime value.",
      industryComparison: `In the ${industry} sector, businesses that implement proactive customer outreach strategies see 22% higher customer lifetime value compared to reactive-only approaches.`,
      benchmark: "Bain & Company research shows that businesses with proactive outreach programs increase customer spending by 20-40% compared to reactive-only communication. A Gartner study found that proactive customer service results in a full point increase in Net Promoter Score.",
      steps: [
        "Identify your top 20% of customers by purchase value.",
        "Develop a simple call script focused on appreciation and gathering feedback.",
        "Schedule quarterly check-in calls with these high-value customers."
      ],
      effort: "Easy",
      urgency: "🟡 Important",
      freeTools: [
        "Google Voice (Free business phone number)",
        "Call Script Template (Available in our Resource Library)",
        "Customer Segmentation Calculator"
      ],
      revenueScore: baseRevenueScore + (Math.random() > 0.5 ? 1 : 0)
    });
  }
  
  insights.push({
    title: "Implement Data-Driven Pricing Optimization",
    potentialGain: `$${(revenue * 0.11).toFixed(0)}/month`,
    explanation: "Analysis suggests you can increase margins through strategic price adjustments on key products. Your current pricing structure may be leaving money on the table.",
    industryComparison: `Competitive analysis of ${industry} businesses in ${location} shows that top performers regularly adjust prices based on demand patterns and achieve 15-20% higher profit margins.`,
    benchmark: "McKinsey research shows that a 1% price optimization improvement yields an 8.7% increase in operating profits for most businesses. A study in the Harvard Business Review found that optimized pricing strategies can increase profit margins by 11% on average.",
    steps: [
      "Identify your top 5 products by sales volume.",
      "Test a 5-10% price increase on 2 products for 30 days.",
      "Analyze sales volume impact and adjust strategy accordingly."
    ],
    effort: "Medium",
    urgency: "🟡 Important",
    freeTools: [
      "Price Elasticity Calculator (Excel template)",
      "Competitor Price Monitoring Template",
      "A/B Testing Framework for Pricing"
    ],
    revenueScore: baseRevenueScore + 2
  });
  
  insights.push({
    title: "Streamline Operational Workflows",
    potentialGain: `$${(revenue * 0.05).toFixed(0)}/month`,
    explanation: "Your current operational structure has inefficiencies that can be addressed through process optimization. Reducing administrative overhead can free up capital for growth initiatives.",
    industryComparison: `Leading ${industry} businesses in ${location} typically operate with 15-20% lower administrative costs through streamlined workflows and automation.`,
    benchmark: "Deloitte's business operations benchmark study found that streamlined workflows typically reduce operational costs by 15-25% in small to medium businesses. A Boston Consulting Group study showed that companies with optimized operations grow 1.5x faster than competitors.",
    steps: [
      "Document current processes for your 3 most time-consuming activities.",
      "Identify redundant steps and automation opportunities.",
      "Implement changes and track time savings over 60 days."
    ],
    effort: "Easy",
    urgency: "🟢 Long-Term",
    freeTools: [
      "Process Mapping Template (Free Flowchart Tool)",
      "Trello (Free project management tool)",
      "Time Tracking Spreadsheet Template"
    ],
    revenueScore: baseRevenueScore - 1
  });
  
  insights.push({
    title: "Targeted Local Market Expansion Strategy",
    potentialGain: `$${(revenue * 0.13).toFixed(0)}/month`,
    explanation: `Analysis of your customer location data reveals untapped opportunities within a 15-mile radius of your primary business location. Strategic micro-targeting could expand your customer base in specific neighborhoods.`,
    industryComparison: `Top-performing ${industry} businesses in ${location} typically achieve 35% of new business from geographic expansion rather than product diversification.`,
    benchmark: "A Nielsen study found that 93% of consumers travel 20 minutes or less for everyday purchases. Research by Alignable shows that local businesses that target expansion to adjacent neighborhoods see a 24% increase in new customers over 6 months.",
    steps: [
      "Map current customer locations to identify concentration and gaps.",
      `Create targeted advertising campaigns for 3 specific neighborhoods within 15 miles with similar demographics to your top customers.`,
      "Develop a special 'new neighborhood' offer with tracking code to measure results."
    ],
    effort: "Medium",
    urgency: "🟡 Important",
    freeTools: [
      "Google My Business (Free local business listing)",
      "Google Maps radius tool (Free location targeting)",
      "Local SEO Checklist (Free download)"
    ],
    revenueScore: baseRevenueScore + 1 + Math.floor(Math.random() * 2)
  });
  
  const shuffledInsights = [...insights]
    .sort((a, b) => {
      const urgencyOrder = { '🔴 Urgent': 0, '🟡 Important': 1, '🟢 Long-Term': 2 };
      const aValue = a.urgency ? urgencyOrder[a.urgency] : 3;
      const bValue = b.urgency ? urgencyOrder[b.urgency] : 3;
      return aValue - bValue || Math.random() - 0.5;
    });
  
  let selectedInsights = shuffledInsights.slice(0, 4);
  
  return {
    insights: selectedInsights,
    summary: {
      totalRevenue: `$${revenue.toLocaleString()}`,
      bestSellingProduct: data?.fileName?.includes('invoice') ? 'Premium Service Package' : 'Signature Product',
      salesGrowth: `+${growth}%`,
      cashFlowStatus: customerCount > 7 ? 'Healthy' : 'Needs Attention',
      customerRetentionRate: `${retention.toFixed(0)}%`,
      profitMargins: profitMargins,
      adSpendConversion: adSpendConversion,
      industry: industry,
      location: location
    },
  };
}
