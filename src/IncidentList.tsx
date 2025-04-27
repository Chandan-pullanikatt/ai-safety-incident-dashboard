// IncidentList.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Tag } from 'lucide-react';
import { Incident } from './App';

const IncidentList: React.FC<{ incidents: Incident[] }> = ({ incidents }) => {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (incidents.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center text-gray-500 dark:text-gray-400 py-10"
      >
        <p className="text-lg">🔍 No incidents match your current filters</p>
        <p className="text-sm mt-1">Try changing your filter settings or add a new incident</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {incidents.map((incident) => {
        const isExpanded = expandedIds.includes(incident.id);
        const severityClass = getSeverityColor(incident.severity);
        
        return (
          <motion.div
            key={incident.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <div className="bg-gray-50 dark:bg-gray-800 p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{incident.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityClass}`}>
                  {incident.severity}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>
                  Reported: {new Date(incident.reported_at).toLocaleDateString()} at {' '}
                  {new Date(incident.reported_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <button 
                  onClick={() => toggleExpand(incident.id)}
                  className="flex items-center gap-1 px-3 py-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  {isExpanded ? 'Hide Details' : 'View Details'}
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
            </div>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Description:</h4>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{incident.description}</p>
                    
                    {incident.tags && incident.tags.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                          <Tag className="w-4 h-4 mr-1" /> Tags:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {incident.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default IncidentList;