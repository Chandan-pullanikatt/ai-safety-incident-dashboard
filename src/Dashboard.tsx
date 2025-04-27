// Dashboard.tsx
import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { Calendar, TrendingUp, AlertTriangle, FileText, User, Clock, Tag } from 'lucide-react';
import { Incident } from './App';

interface DashboardProps {
  incidents: Incident[];
}

const Dashboard: React.FC<DashboardProps> = ({ incidents }) => {
  // Calculate metrics
  const totalIncidents = incidents.length;
  const highSeverity = incidents.filter(i => i.severity === 'High').length;
  const mediumSeverity = incidents.filter(i => i.severity === 'Medium').length;
  const lowSeverity = incidents.filter(i => i.severity === 'Low').length;
  
  // Last 30 days incidents
  const last30Days = incidents.filter(i => {
    const incidentDate = new Date(i.reported_at);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return incidentDate >= thirtyDaysAgo;
  }).length;
  
  // Calculate the most recent incident date
  const mostRecentDate = incidents.length > 0 
    ? new Date(Math.max(...incidents.map(i => new Date(i.reported_at).getTime())))
    : null;
  
  const mostRecentDateFormatted = mostRecentDate 
    ? mostRecentDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    : 'N/A';

  // Prepare data for charts
  const severityData = [
    { name: 'Low', value: lowSeverity, color: '#3B82F6' },
    { name: 'Medium', value: mediumSeverity, color: '#FBBF24' },
    { name: 'High', value: highSeverity, color: '#EF4444' },
  ];
  
  // Tag distribution data
  const tagDistribution = useMemo(() => {
    const tagCounts: Record<string, number> = {};
    
    incidents.forEach(incident => {
      if (incident.tags) {
        incident.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    
    return Object.entries(tagCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5 tags
  }, [incidents]);
  
  // Prepare time series data
  const timeSeriesData = generateTimeSeriesData(incidents);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Dashboard Analytics</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard 
          title="Total Incidents" 
          value={totalIncidents.toString()} 
          icon={<FileText className="w-6 h-6 text-blue-500" />}
          color="bg-blue-100 dark:bg-blue-900"
        />
        <StatsCard 
          title="High Severity" 
          value={highSeverity.toString()} 
          icon={<AlertTriangle className="w-6 h-6 text-red-500" />}
          color="bg-red-100 dark:bg-red-900"
        />
        <StatsCard 
          title="Last 30 Days" 
          value={last30Days.toString()} 
          icon={<Calendar className="w-6 h-6 text-green-500" />}
          color="bg-green-100 dark:bg-green-900"
        />
        <StatsCard 
          title="Most Recent" 
          value={mostRecentDateFormatted} 
          icon={<Clock className="w-6 h-6 text-purple-500" />}
          color="bg-purple-100 dark:bg-purple-900"
          isDate
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Severity Distribution */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Severity Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Timeline Chart */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Incidents Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeSeriesData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#3B82F6" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Second row of charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Tags */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Top Tags</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={tagDistribution}
                layout="vertical"
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Safety Insight */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Safety Insight</h3>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
              Risk Analysis
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Based on your incident data, we've identified the following risk patterns:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                {highSeverity > 0 ? 
                  `${highSeverity} high severity incidents require immediate attention` : 
                  'No high severity incidents detected - excellent work!'}
              </li>
              <li>
                {tagDistribution.length > 0 ? 
                  `"${tagDistribution[0]?.name}" is your most common incident type` : 
                  'Not enough tag data to identify patterns'}
              </li>
              <li>
                {last30Days > totalIncidents / 2 ? 
                  'Recent uptick in incidents suggests increased monitoring needed' : 
                  'Incident frequency is stable or decreasing'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for stats cards
interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  isDate?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color, isDate }) => (
  <div className={`${color} rounded-lg p-4 flex items-center space-x-4`}>
    <div className="bg-white dark:bg-gray-800 rounded-full p-2">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</p>
      <p className={`text-xl font-bold ${isDate ? 'text-md' : 'text-2xl'}`}>{value}</p>
    </div>
  </div>
);

// Helper function to generate time series data
const generateTimeSeriesData = (incidents: Incident[]) => {
  // In a real app, you would aggregate real data
  // For demo purposes, we'll create a simple timeline
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  // Check if we have real data
  if (incidents.length > 5) {
    const data = [];
    const today = new Date();
    
    // Generate data for the last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(today.getMonth() - i);
      const monthStr = date.toLocaleString('default', { month: 'short' });
      
      // Count incidents in this month
      const count = incidents.filter(incident => {
        const incidentDate = new Date(incident.reported_at);
        return incidentDate.getMonth() === date.getMonth() && 
               incidentDate.getFullYear() === date.getFullYear();
      }).length;
      
      data.push({ date: monthStr, count });
    }
    
    return data;
  }
  
  // Fallback to demo data if not enough real data
  return [
    { date: 'Jan', count: 2 },
    { date: 'Feb', count: 5 },
    { date: 'Mar', count: 3 },
    { date: 'Apr', count: 7 },
    { date: 'May', count: 4 },
    { date: 'Jun', count: 6 },
  ];
};

export default Dashboard;