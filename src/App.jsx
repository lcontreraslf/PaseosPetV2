import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import { User, PawPrint, LogIn } from 'lucide-react';
import HomeTab from '@/components/tabs/HomeTab';
import PetsTab from '@/components/tabs/PetsTab';
import WalkersTab from '@/components/tabs/WalkersTab';
import BookingsTab from '@/components/tabs/BookingsTab';
import AddPetModal from '@/components/modals/AddPetModal';
import BookingModal from '@/components/modals/BookingModal';
import LoginModal from '@/components/modals/LoginModal';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [pets, setPets] = useState([]);
  const [walkers, setWalkers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showAddPet, setShowAddPet] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedWalker, setSelectedWalker] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedPets = localStorage.getItem('petcare_pets');
    const savedWalkers = localStorage.getItem('petcare_walkers');
    const savedBookings = localStorage.getItem('petcare_bookings');
    const savedUser = localStorage.getItem('petcare_user');

    if (savedPets) setPets(JSON.parse(savedPets));
    if (savedWalkers) setWalkers(JSON.parse(savedWalkers));
    if (savedBookings) setBookings(JSON.parse(savedBookings));
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    if (!savedWalkers || JSON.parse(savedWalkers).length === 0) {
      const initialWalkers = [
        {
          id: 1,
          name: 'María González',
          rating: 4.9,
          experience: '3 años',
          price: 15,
          location: 'Centro',
          services: ['Paseos', 'Cuidado en casa', 'Alimentación'],
          avatar: 'https://images.unsplash.com/photo-1494790108375-2616b612b786?w=150&h=150&fit=crop&crop=face',
          reviews: 127,
          verified: true
        },
        {
          id: 2,
          name: 'Carlos Ruiz',
          rating: 4.8,
          experience: '5 años',
          price: 18,
          location: 'Norte',
          services: ['Paseos', 'Entrenamiento', 'Veterinario'],
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          reviews: 89,
          verified: true
        },
        {
          id: 3,
          name: 'Ana López',
          rating: 5.0,
          experience: '2 años',
          price: 12,
          location: 'Sur',
          services: ['Paseos', 'Cuidado en casa'],
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          reviews: 156,
          verified: true
        }
      ];
      setWalkers(initialWalkers);
      localStorage.setItem('petcare_walkers', JSON.stringify(initialWalkers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('petcare_pets', JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    localStorage.setItem('petcare_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('petcare_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('petcare_user');
    }
  }, [currentUser]);

  const addPet = (petData) => {
    const newPet = {
      id: Date.now(),
      ...petData,
      createdAt: new Date().toISOString()
    };
    setPets([...pets, newPet]);
    setShowAddPet(false);
    toast({
      title: "¡Mascota agregada!",
      description: `${petData.name} ha sido agregada exitosamente.`
    });
  };

  const createBooking = (bookingData) => {
    if (!currentUser) {
      toast({
        title: "¡Inicia sesión!",
        description: "Debes iniciar sesión para crear una reserva.",
        variant: "destructive"
      });
      setShowLogin(true);
      return;
    }
    const newBooking = {
      id: Date.now(),
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      userId: currentUser.id
    };
    setBookings([...bookings, newBooking]);
    setShowBooking(false);
    setSelectedWalker(null);
    toast({
      title: "¡Reserva creada!",
      description: "Tu solicitud ha sido enviada al cuidador."
    });
  };

  const deletePet = (petId) => {
    setPets(pets.filter(pet => pet.id !== petId));
    toast({
      title: "Mascota eliminada",
      description: "La mascota ha sido eliminada de tu perfil."
    });
  };

  const updateBookingStatus = (bookingId, status) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status } : booking
    ));
    toast({
      title: "Estado actualizado",
      description: `La reserva ha sido ${status === 'confirmed' ? 'confirmada' : 'cancelada'}.`
    });
  };

  const handleLogin = (userData) => {
    const user = { id: Date.now(), email: userData.email, name: userData.email.split('@')[0] }; 
    setCurrentUser(user);
    setShowLogin(false);
    toast({
      title: `¡Bienvenido, ${user.name}!`,
      description: "Has iniciado sesión correctamente."
    });
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Conexión con Supabase pendiente",
      description: "La integración con Supabase no está completa. Por favor, sigue los pasos para conectar tu cuenta de Supabase.",
      variant: "destructive"
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente."
    });
  };

  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'pets', label: 'Mis Mascotas' },
    { id: 'walkers', label: 'Cuidadores' },
    { id: 'bookings', label: 'Reservas' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-green-600 rounded-full flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-green-700 bg-clip-text text-transparent">
                PetCare
              </span>
            </motion.div>

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

            {currentUser ? (
              <Button onClick={handleLogout} className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white">
                <User className="w-4 h-4 mr-2" />
                {currentUser.name} (Salir)
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  onClick={() => alert('Función de registro próximamente')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium rounded-md"
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
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && <HomeTab key="home" onFindWalkerClick={() => setActiveTab('walkers')} />}
          {activeTab === 'pets' && (
            <PetsTab
              key="pets"
              pets={pets.filter(p => !currentUser || p.userId === currentUser.id)}
              onAddPet={() => {
                if (!currentUser) { setShowLogin(true); return; }
                setShowAddPet(true);
              }}
              onDeletePet={deletePet}
              currentUser={currentUser}
            />
          )}
          {activeTab === 'walkers' && (
            <WalkersTab
              key="walkers"
              walkers={walkers}
              pets={pets.filter(p => !currentUser || p.userId === currentUser.id)}
              onSelectWalker={(walker) => {
                if (!currentUser) { setShowLogin(true); return; }
                setSelectedWalker(walker);
                setShowBooking(true);
              }}
              currentUser={currentUser}
            />
          )}
          {activeTab === 'bookings' && (
            <BookingsTab
              key="bookings"
              bookings={bookings.filter(b => !currentUser || b.userId === currentUser.id)}
              walkers={walkers}
              pets={pets}
              onUpdateStatus={updateBookingStatus}
              currentUser={currentUser}
            />
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showAddPet && currentUser && (
          <AddPetModal
            onClose={() => setShowAddPet(false)}
            onAdd={(petData) => addPet({...petData, userId: currentUser.id})}
          />
        )}
        {showBooking && selectedWalker && currentUser && (
          <BookingModal
            walker={selectedWalker}
            pets={pets.filter(p => p.userId === currentUser.id)}
            onClose={() => {
              setShowBooking(false);
              setSelectedWalker(null);
            }}
            onBook={createBooking}
          />
        )}
        {showLogin && !currentUser && (
          <LoginModal
            onClose={() => setShowLogin(false)}
            onLogin={handleLogin}
            onGoogleLogin={handleGoogleLogin}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
