import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PawPrint, LogIn, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header({ navItems, activeTab, setActiveTab, currentUser, setShowLogin, setShowRegister, handleLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-green-600 rounded-full flex items-center justify-center">
              <PawPrint className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-green-700 bg-clip-text text-transparent">
              PaseosPet
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary bg-green-100'
                    : 'text-foreground/70 hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          {currentUser ? (
            <Button
              onClick={handleLogout}
              className="hidden md:inline-flex bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
            >
              <User className="w-4 h-4 mr-2" />
              {currentUser.name} (Salir)
            </Button>
          ) : (
            <div className="hidden md:flex space-x-2">
              <Button
                onClick={() => setShowRegister(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
              >
                Registrarse
              </Button>
              <Button
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-green-700 text-primary-foreground"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Iniciar Sesión
              </Button>
            </div>
          )}

          {/* Hamburger Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-card border-t border-border px-4 pt-4 pb-6 space-y-4"
          >
            {navItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left text-sm px-3 py-2 rounded-md ${
                  activeTab === tab.id
                    ? 'text-primary bg-green-100'
                    : 'text-foreground/70 hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}

            {currentUser ? (
              <Button
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white mt-4"
              >
                <User className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setShowRegister(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-blue-600 text-white"
                >
                  Registrarse
                </Button>
                <Button
                  onClick={() => {
                    setShowLogin(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-primary to-green-600 text-primary-foreground"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Iniciar Sesión
                </Button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
