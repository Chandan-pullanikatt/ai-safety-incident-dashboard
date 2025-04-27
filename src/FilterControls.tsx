// FilterControls.tsx
import React from 'react';

interface FilterControlsProps {
  severityFilter: string;
  setSeverityFilter: (filter: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  severityFilter,
  setSeverityFilter,
  sortOrder,
  setSortOrder
}) => {
  const severityOptions = ["All", "Low", "Medium", "High"];
  const sortOptions = ["Newest First", "Oldest First"];

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">Filter by Severity:</label>
        <div className="flex gap-2 flex-wrap">
          {severityOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSeverityFilter(option)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                severityFilter === option
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">Sort by Date:</label>
        <div className="flex gap-2 flex-wrap">
          {sortOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSortOrder(option)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                sortOrder === option
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterControls;