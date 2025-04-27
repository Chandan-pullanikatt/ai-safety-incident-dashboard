// IncidentForm.tsx
import { AlertTriangle, Info, AlertCircle, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import TagsInput from './TagsInput';
import SearchBar from './SearchBar';

import { Incident } from './App';

interface IncidentFormProps {
  addIncident: (incident: Incident) => void;
  availableTags: string[];
}

const IncidentForm: React.FC<IncidentFormProps> = ({ addIncident, availableTags }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('Low');
  const [tags, setTags] = useState<string[]>([]);
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      setFormError('Please enter a title');
      return;
    }
    
    if (!description.trim()) {
      setFormError('Please enter a description');
      return;
    }
    
    // Clear error if validation passes
    setFormError('');
    
    const newIncident: Incident = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      severity,
      reported_at: new Date().toISOString(),
      tags: tags.length > 0 ? tags : undefined
    };
    
    addIncident(newIncident);
    toast.success('Incident reported successfully!');
    
    // Reset form
    setTitle('');
    setDescription('');
    setSeverity('Low');
    setTags([]);
  };

  const getSeverityIcon = () => {
    switch(severity) {
      case 'Low': return <Info className="w-5 h-5 text-blue-500" />;
      case 'Medium': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'High': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {formError}
        </div>
      )}
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Incident Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief title describing the incident"
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description *
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed description of what happened and any relevant context"
          rows={4}
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          required
        />
      </div>

      <div>
        <label htmlFor="severity" className="block text-sm font-medium mb-1">
          Severity Level *
        </label>
        <div className="relative">
          <select
            id="severity"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="w-full p-2 pl-9 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors appearance-none pr-10"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {getSeverityIcon()}
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Tags
        </label>
        <TagsInput 
          selectedTags={tags}
          setSelectedTags={setTags}
          availableTags={availableTags}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Add relevant tags to categorize the incident
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-medium py-2.5 px-5 rounded-md transition-colors"
      >
        Submit Incident Report
      </button>
    </form>
  );
};

export default IncidentForm;