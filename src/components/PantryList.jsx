"use client";
import { useState } from 'react';
import { usePantry } from '../context/PantryContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PantryList = ({ items }) => {
  const { removeItem, updateItem } = usePantry();
  const [editingItem, setEditingItem] = useState(null);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = (item) => {
    setEditingItem(item.id);
    setName(item.name);
    setQuantity(item.quantity);
    setImageUrl(item.imageUrl);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let updatedImageUrl = imageUrl;

    if (image) {
      const storage = getStorage();
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      updatedImageUrl = await getDownloadURL(imageRef);
    }

    const updatedItem = { name, quantity: parseInt(quantity, 10), imageUrl: updatedImageUrl };
    await updateItem(editingItem, updatedItem);

    setEditingItem(null);
    setName('');
    setQuantity('');
    setImage(null);
    setImageUrl('');
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
            <div className="flex items-center space-x-4">
              {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded" />}
              <div>
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => removeItem(item.id)}
                className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
              >
                Remove
              </button>
              <button
                onClick={() => handleUpdate(item)}
                className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Update Item</h2>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="name">Item Name</label>
              <input
                id="name"
                type="text"
                placeholder="Item Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="image">Image</label>
              <input
                id="image"
                type="file"
                onChange={handleImageChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-primary rounded hover:opacity-75"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Item'}
              </button>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PantryList;
