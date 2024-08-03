"use client";
import { useState } from 'react';
import Search from '../../components/Search';
import PantryList from '../../components/PantryList';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 pt-8">
        <h2 className="text-2xl font-semibold mb-4">Search Pantry Items</h2>
        <Search setSearchResults={setSearchResults} />
        <PantryList items={searchResults} />
      </div>
    </div>
  );
};

export default SearchPage;
