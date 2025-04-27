import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface TagsInputProps {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  availableTags?: string[];
}

const TagsInput: React.FC<TagsInputProps> = ({ 
  selectedTags, 
  setSelectedTags, 
  availableTags = ['Bias', 'Hallucination', 'Data Leak', 'Privacy', 'Security', 'Performance', 'Ethics']
}) => {
  const [input, setInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const addTag = (tag: string) => {
    if (tag.trim() !== '' && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setInput('');
    setIsDropdownOpen(false);
  };
  
  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };
  
  const filteredTags = availableTags.filter(tag => 
    !selectedTags.includes(tag) && 
    tag.toLowerCase().includes(input.toLowerCase())
  );
  
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 min-h-10">
        {selectedTags.map(tag => (
          <div 
            key={tag}
            className="flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 focus:outline-none"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        
        <div className="relative flex-1 min-w-24">
          <div className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 100)}
              placeholder={selectedTags.length === 0 ? "Add tags..." : ""}
              className="border-none bg-transparent outline-none w-full text-sm"
            />
            {input && (
              <button
                type="button"
                onClick={() => addTag(input)}
                className="p-1 ml-1 text-blue-600"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {isDropdownOpen && filteredTags.length > 0 && (
            <div className="absolute mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-10">
              {filteredTags.map(tag => (
                <div
                  key={tag}
                  onClick={() => addTag(tag)}
                  className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagsInput;
