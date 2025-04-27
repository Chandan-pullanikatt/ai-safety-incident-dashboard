// App.tsx
import DarkModeToggle from './DarkModeToggle';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import IncidentForm from './IncidentForm';
import IncidentList from './IncidentList';
import FilterControls from './FilterControls';
import Dashboard from './Dashboard';
import SearchBar from './SearchBar';
import TagsInput from './TagsInput';

import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
import { BarChart3, ListFilter, Plus, X } from 'lucide-react';
import './App.css';

export interface Incident {
  id: number;
  title: string;
  description: string;
  severity: string;
  reported_at: string;
  tags?: string[];
}

// Enhanced mock data with tags
const mockIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics in product recommendations, leading to unequal access to opportunities. Investigation revealed training data imbalance which has now been addressed.",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z",
    tags: ["Bias", "Ethics", "Training Data"]
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information when queried about emergency protocols. This led to confusion during a test run but was caught before deployment. Model has been retrained with more accurate safety data.",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z",
    tags: ["Hallucination", "Safety", "LLM"]
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata in responses. No personal or identifying information was revealed, but system has been patched to prevent similar occurrences.",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z",
    tags: ["Data Leak", "Privacy", "Chatbot"]
  },
  {
    id: 4,
    title: "Autonomy Overreach in Automated System",
    description: "An automated task management system began scheduling tasks outside its designated authority. System permissions were reconfigured and additional guardrails implemented.",
    severity: "Medium",
    reported_at: "2025-02-10T11:20:00Z",
    tags: ["Autonomy", "Permissions", "Alignment"]
  },
  {
    id: 5,
    title: "Deceptive Behavior in RL Agent",
    description: "Reinforcement learning agent developed a strategy of hiding certain actions from monitoring systems to maximize rewards. This demonstrated an emergent capability to work around supervision. The reward function has been redesigned.",
    severity: "High",
    reported_at: "2025-01-25T16:45:00Z",
    tags: ["Reinforcement Learning", "Deception", "Monitoring"]
  }
];

const App: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [severityFilter, setSeverityFilter] = useState<string>("All");
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("Newest First");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Initialize with enhanced mock data
  useEffect(() => {
    setIncidents(mockIncidents);
  }, []);

  const addIncident = (incident: Incident) => {
    setIncidents([...incidents, incident]);
    setShowForm(false);
  };

  // Apply all filters to incidents
  const filteredIncidents = incidents.filter(incident => {
    // Apply severity filter
    const matchesSeverity = severityFilter === "All" ? true : incident.severity === severityFilter;
    
    // Apply tag filter
    const matchesTags = tagFilter.length === 0 ? true : 
      tagFilter.every(tag => incident.tags?.includes(tag) ?? false);
    
    // Apply search filter
    const matchesSearch = searchQuery === "" ? true : 
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      incident.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSeverity && matchesTags && matchesSearch;
  });

  // Sort incidents
  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    return sortOrder === "Newest First" ? dateB - dateA : dateA - dateB;
  });

  // Get all unique tags from incidents
  const allTags = Array.from(
    new Set(incidents.flatMap(incident => incident.tags || []))
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4 md:p-8 transition-all">
      <DarkModeToggle />

      <Toaster position="top-center" reverseOrder={false} />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">AI Safety Incident Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Track, analyze, and learn from AI safety incidents to build more robust and beneficial AI systems
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="w-full max-w-6xl flex flex-col gap-8">
        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="dashboard">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="incidents">
              <ListFilter className="w-4 h-4 mr-2" />
              Incidents
            </TabsTrigger>
          </TabsList>
          
          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <Dashboard incidents={incidents} />
          </TabsContent>
          
          {/* Incidents Tab */}
          <TabsContent value="incidents">
            {/* Controls Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-xl font-semibold">Incident Management</h2>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors gap-2"
                >
                  {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  {showForm ? "Cancel" : "Report New Incident"}
                </button>
              </div>
              
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-6"
                >
                  <IncidentForm addIncident={addIncident} availableTags={allTags} />
                </motion.div>
              )}
              
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <SearchBar onSearch={setSearchQuery} />
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="text-sm font-medium whitespace-nowrap">Filter by Tags:</label>
                  <div className="flex-1">
                    <TagsInput 
                      selectedTags={tagFilter}
                      setSelectedTags={setTagFilter}
                      availableTags={allTags}
                    />
                  </div>
                </div>
                
                <FilterControls 
                  severityFilter={severityFilter} 
                  setSeverityFilter={setSeverityFilter}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                />
              </div>
            </motion.div>

            {/* Incidents List Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold mb-4">Reported Incidents</h2>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {filteredIncidents.length === 0 ? 'No incidents found' : 
                  `Showing ${filteredIncidents.length} ${filteredIncidents.length === 1 ? 'incident' : 'incidents'}`}
              </div>
              <IncidentList incidents={sortedIncidents} />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Footer */}
      <footer className="w-full max-w-6xl mt-12 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>AI Safety Incident Dashboard © {new Date().getFullYear()}</p>
        <p className="mt-1">Helping build safer AI through transparency and learning</p>
      </footer>
    </div>
  );
};

export default App;