
import React from 'react';
import { Link } from 'react-router-dom';
import { LockIcon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-10 w-full backdrop-blur-apple bg-background/80 border-b border-border/50">
        <div className="container mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 transition-opacity duration-200 hover:opacity-80"
          >
            <LockIcon className="h-5 w-5 text-primary" />
            <span className="font-medium text-lg">SecretNote</span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-foreground"
            >
              Create
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-foreground"
            >
              About
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 w-full">
        <div className="container mx-auto py-8 px-4 sm:px-6 min-h-[calc(100vh-10rem)]">
          {children}
        </div>
      </main>
      
      <footer className="w-full border-t border-border/50 py-6">
        <div className="container mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground">
          <p>SecretNote — Share notes securely with automatic expiration</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
