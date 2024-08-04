"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { db, app } from '@/firebase';
import { collection, setDoc, deleteDoc, doc, updateDoc, onSnapshot, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const PantryContext = createContext();
const auth = getAuth(app);

export const usePantry = () => useContext(PantryContext);

export const PantryProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        fetchItems(user);
      } else {
        setItems([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const fetchItems = async (user) => {
    if (user) {
      const itemsSnapshot = await getDocs(collection(db, 'pantry', user.uid, 'items'));
      const itemsList = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(itemsList);
    }
  };

  const addItem = async (item) => {
    if (user) {
      const itemRef = doc(collection(db, 'pantry', user.uid, 'items'));
      await setDoc(itemRef, { ...item, userId: user.uid });
      fetchItems(user);
    }
  };

  const removeItem = async (id) => {
    if (user) {
      await deleteDoc(doc(db, 'pantry', user.uid, 'items', id));
      fetchItems(user);
    }
  };

  const updateItem = async (id, updatedItem) => {
    if (user) {
      await updateDoc(doc(db, 'pantry', user.uid, 'items', id), updatedItem);
      fetchItems(user);
    }
  };

  return (
    <PantryContext.Provider value={{ items, addItem, removeItem, updateItem }}>
      {children}
    </PantryContext.Provider>
  );
};
