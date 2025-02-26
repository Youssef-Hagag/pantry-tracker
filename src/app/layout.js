import { Inter } from "next/font/google";
import "./globals.css";
import { PantryProvider } from '../context/PantryContext';
import { UserProvider } from '../context/UserContext';
import Nav from '../components/Nav';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pantry Tracker",
  description: "A simple pantry tracker app built with Next.js and Firebase.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <PantryProvider>
        <UserProvider>
          <Nav></Nav>
          {children}
        </UserProvider>
      </PantryProvider>
      </body>
    </html>
  );
}
