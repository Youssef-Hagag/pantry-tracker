"use client";
import { usePantry } from '@/context/PantryContext';
import PantryList from '@/components/PantryList';
import ProtectedRoute from '@/components/ProtectedRoute';

const ListPage = () => {
  const { items } = usePantry();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto p-6 pt-8">
          <h2 className="text-2xl font-semibold mb-4">All Pantry Items</h2>
          <PantryList items={items} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ListPage;
