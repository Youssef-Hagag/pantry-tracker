"use client";
import { useState } from 'react';
import AddItem from '../components/AddItem';
import PantryList from '../components/PantryList';
import Search from '../components/Search';

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full bg-blue-600 text-white py-6 shadow-md">
        <h1 className="text-3xl font-bold text-center">Pantry Management</h1>
      </header>
      <main className="w-full max-w-4xl p-6 pt-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Item</h2>
          <AddItem />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Search Pantry Items</h2>
          <Search setSearchResults={setSearchResults} />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Pantry List</h2>
          <PantryList items={searchResults} />
        </div>
      </main>
    </div>
  );
}
