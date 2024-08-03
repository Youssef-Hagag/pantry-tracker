"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';

const PantryContext = createContext();

export const usePantry = () => useContext(PantryContext);

export const PantryProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'pantry'), (snapshot) => {
      const itemsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setItems(itemsData);
    });

    return () => unsubscribe();
  }, []);

  const addItem = async (item) => {
    const docRef = await addDoc(collection(db, 'pantry'), item);
    setItems([...items, { ...item, id: docRef.id }]);
  };

  const removeItem = async (id) => {
    await deleteDoc(doc(db, 'pantry', id));
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = async (id, updatedItem) => {
    await updateDoc(doc(db, 'pantry', id), updatedItem);
    setItems(items.map(item => (item.id === id ? { ...updatedItem, id } : item)));
  };

  return (
    <PantryContext.Provider value={{ items, addItem, removeItem, updateItem }}>
      {children}
    </PantryContext.Provider>
  );
};
