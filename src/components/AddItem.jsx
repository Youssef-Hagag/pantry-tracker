"use client";
import { useState } from 'react';
import { usePantry } from '../context/PantryContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const AddItem = ({ onSuccess }) => {
  const { addItem } = usePantry();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = '';

    if (image) {
      const storage = getStorage();
      const imageRef = ref(storage, `images/${uuidv4()}_${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    const newItem = { name, quantity: parseInt(quantity, 10), imageUrl };
    await addItem(newItem);

    setLoading(false);
    setName('');
    setQuantity('');
    setImage(null);

    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Item'}
        </button>
      </div>
    </form>
  );
};

export default AddItem;
