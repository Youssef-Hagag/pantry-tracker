import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <ul className="flex space-x-4">
        <li>
          <Link href="/list">
            <div className="text-white">Pantry List</div>
          </Link>
        </li>
        <li>
          <Link href="/search">
            <div className="text-white">Search</div>
          </Link>
        </li>
        <li>
          <Link href="/add">
            <div className="text-white">Add Item</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
