
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, User, Building, Mail, Phone, MapPin, CalendarClock } from 'lucide-react';

type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  location?: string;
  source: 'premium-insight' | 'file-upload';
  timestamp: string;
  fileData?: any;
};

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  
  useEffect(() => {
    // Load leads from localStorage
    const storedLeads = localStorage.getItem('businessInsightLeads');
    if (storedLeads) {
      setLeads(JSON.parse(storedLeads));
    } else {
      // Set some sample leads for demo purposes
      const sampleLeads: Lead[] = [
        {
          id: '1',
          name: 'John Smith',
          email: 'john.smith@example.com',
          phone: '555-123-4567',
          company: 'Acme Inc',
          industry: 'Technology',
          location: 'New York',
          source: 'premium-insight',
          timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah.j@example.com',
          phone: '555-987-6543',
          company: 'Johnson Solutions',
          industry: 'Consulting',
          location: 'Chicago',
          source: 'premium-insight',
          timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
        },
        {
          id: '3',
          name: 'Michael Williams',
          email: 'michael.w@example.com',
          phone: '555-567-8901',
          company: 'Williams Group',
          industry: 'Finance',
          location: 'Boston',
          source: 'file-upload',
          timestamp: new Date().toISOString(),
          fileData: {
            customers: [
              { name: 'Customer 1', email: 'customer1@example.com' },
              { name: 'Customer 2', email: 'customer2@example.com' },
            ]
          }
        },
      ];
      setLeads(sampleLeads);
      localStorage.setItem('businessInsightLeads', JSON.stringify(sampleLeads));
    }
  }, []);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };
  
  const exportLeads = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(leads, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "business_insight_leads.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Leads Dashboard</h1>
        </div>
        <Button onClick={exportLeads} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Leads
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Lead Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Leads</p>
              <p className="text-3xl font-bold">{leads.length}</p>
            </div>
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Premium Insights</p>
              <p className="text-3xl font-bold">
                {leads.filter(lead => lead.source === 'premium-insight').length}
              </p>
            </div>
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">File Uploads</p>
              <p className="text-3xl font-bold">
                {leads.filter(lead => lead.source === 'file-upload').length}
              </p>
            </div>
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Last 24 Hours</p>
              <p className="text-3xl font-bold">
                {leads.filter(lead => {
                  const leadDate = new Date(lead.timestamp);
                  const yesterday = new Date();
                  yesterday.setDate(yesterday.getDate() - 1);
                  return leadDate > yesterday;
                }).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Leads</TabsTrigger>
          <TabsTrigger value="premium">Premium Insights</TabsTrigger>
          <TabsTrigger value="upload">File Uploads</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              {leads.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Company/Industry</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                      .map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              {lead.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              {lead.email}
                            </div>
                            {lead.phone && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <Phone className="h-3 w-3" />
                                {lead.phone}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {lead.company && (
                              <div className="flex items-center gap-2">
                                <Building className="h-4 w-4 text-muted-foreground" />
                                {lead.company}
                              </div>
                            )}
                            {lead.industry && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                {lead.industry}
                              </div>
                            )}
                            {lead.location && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <MapPin className="h-3 w-3" />
                                {lead.location}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant={lead.source === 'premium-insight' ? 'default' : 'outline'}>
                              {lead.source === 'premium-insight' ? 'Premium Insight' : 'File Upload'}
                            </Badge>
                            {lead.source === 'file-upload' && lead.fileData && (
                              <div className="text-xs text-muted-foreground mt-1">
                                {lead.fileData.customers?.length || 0} customers
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CalendarClock className="h-4 w-4 text-muted-foreground" />
                              {formatDate(lead.timestamp)}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground">No leads found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="premium">
          <Card>
            <CardContent className="p-0">
              {leads.filter(lead => lead.source === 'premium-insight').length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Company/Industry</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads
                      .filter(lead => lead.source === 'premium-insight')
                      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                      .map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              {lead.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              {lead.email}
                            </div>
                            {lead.phone && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <Phone className="h-3 w-3" />
                                {lead.phone}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {lead.company && (
                              <div className="flex items-center gap-2">
                                <Building className="h-4 w-4 text-muted-foreground" />
                                {lead.company}
                              </div>
                            )}
                            {lead.industry && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                {lead.industry}
                              </div>
                            )}
                            {lead.location && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <MapPin className="h-3 w-3" />
                                {lead.location}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CalendarClock className="h-4 w-4 text-muted-foreground" />
                              {formatDate(lead.timestamp)}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground">No premium insight leads found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upload">
          <Card>
            <CardContent className="p-0">
              {leads.filter(lead => lead.source === 'file-upload').length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Company/Industry</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads
                      .filter(lead => lead.source === 'file-upload')
                      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                      .map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              {lead.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              {lead.email}
                            </div>
                            {lead.phone && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <Phone className="h-3 w-3" />
                                {lead.phone}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {lead.company && (
                              <div className="flex items-center gap-2">
                                <Building className="h-4 w-4 text-muted-foreground" />
                                {lead.company}
                              </div>
                            )}
                            {lead.industry && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                {lead.industry}
                              </div>
                            )}
                            {lead.location && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <MapPin className="h-3 w-3" />
                                {lead.location}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {lead.fileData && lead.fileData.customers ? (
                              <div>
                                <Badge variant="outline" className="mb-1">
                                  {lead.fileData.customers.length} customers
                                </Badge>
                                <div className="text-xs text-muted-foreground">
                                  {lead.fileData.fileName}
                                </div>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">No data</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CalendarClock className="h-4 w-4 text-muted-foreground" />
                              {formatDate(lead.timestamp)}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground">No file upload leads found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
