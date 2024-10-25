"use client";

import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function AnimatedSearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center font-['montserrat']">
      <div
        className={`relative ${
          isExpanded ? 'w-64' : 'w-12'
        } h-12 transition-all duration-300 ease-in-out bg-white/10 backdrop-blur-md rounded-full shadow-lg`}
      >
        <button
          onClick={toggleSearch}
          className={`absolute right-0 w-12 h-12 rounded-full flex items-center justify-center focus:outline-none ${
            isExpanded ? 'bg-opacity-0' : 'shadow-lg'
          }`}
        >
          <Search className="w-6 h-6 text-gray-300" />
        </button>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className={`absolute top-1/2 transform -translate-y-1/2 right-0 ${
            isExpanded ? 'pl-5 pr-12 w-64 opacity-100' : 'w-0 opacity-0'
          } h-12 bg-transparent text-white rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600`}
          onFocus={() => setIsExpanded(true)}
          onBlur={() => setIsExpanded(false)}
        />
      </div>
    </div>
  );
}
