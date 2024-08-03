"use client";
import { useState } from 'react';
import { usePantry } from '../context/PantryContext';

const Search = ({ setSearchResults }) => {
  const { items } = usePantry();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const results = items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search for an item"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
