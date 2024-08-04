"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useUser } from '../context/UserContext';

const Nav = () => {
  const { user, signOut } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl">Pantry Management</div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          ☰
        </button>
        <div className={`space-x-4 md:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
          <Link href="/list" className="block md:inline-block">
            List
          </Link>
          <Link href="/search" className="block md:inline-block">
            Search
          </Link>
          <Link href="/add" className="block md:inline-block">
            Add Item
          </Link>
          {user ? (
            <>
              <span className="block md:inline-block">
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="block md:inline-block"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="block md:inline-block">
                Sign In
              </Link>
              <Link href="/signup" className="block md:inline-block">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
