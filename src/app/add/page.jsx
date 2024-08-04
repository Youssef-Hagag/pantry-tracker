"use client";
import { useRouter } from 'next/navigation';
import AddItem from '@/components/AddItem';
import ProtectedRoute from '@/components/ProtectedRoute';

const AddPage = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/list');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto p-6 pt-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Item</h2>
          <AddItem onSuccess={handleSuccess} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AddPage;
