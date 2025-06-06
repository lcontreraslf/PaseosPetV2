// src/App.jsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button"; // Se mantiene si se usa en los mensajes de acceso denegado
import NotificationManager from "@/components/layout/NotificationManager";
import { toast } from "@/components/ui/use-toast";
// Iconos User, PawPrint, LogIn ya no son necesarios si no se usan directamente en App.jsx
// import { User, PawPrint, LogIn } from "lucide-react";

import HomeTab from "@/components/tabs/HomeTab";
// PetsTab ya NO es una pestaña principal. Ahora es una sección del DashboardUser.
// import PetsTab from "@/components/tabs/PetsTab";
import WalkersTab from "@/components/tabs/WalkersTab";
import PetSittersTab from "@/components/tabs/PetSittersTab";
import BookingsTab from "@/components/tabs/BookingsTab"; // Se mantiene por ahora, si el dashboard lo usa internamente.

import AddPetModal from "@/components/modals/AddPetModal";
import BookingModal from "@/components/modals/BookingModal";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import Header from "@/components/layout/Header";

// Importa DashboardUser desde su nueva ubicación en 'views'
import DashboardUser from "@/components/views/DashboardUser"; // ¡IMPORTACIÓN ACTUALIZADA A views!

// PetDataManager y BookingDataManager pueden ser removidos si sus respectivas
// pestañas/componentes ya gestionan su propio localStorage o fetching de datos.
// Si aún se usan en App.jsx para pasar props, se mantienen.
// Basado en las últimas refactorizaciones, probablemente ya no son necesarios en App.jsx.
// import PetDataManager from '@/components/logic/PetDataManager';
// import BookingDataManager from '@/components/logic/BookingDataManager';


function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [pets, setPets] = useState([]); // Necesario para pasar a DashboardUser
  const [bookings, setBookings] = useState([]); // Necesario para pasar a DashboardUser
  const [showAddPet, setShowAddPet] = useState(false); // Necesario si AddPetModal se abre desde App
  const [showBooking, setShowBooking] = useState(false); // Necesario si BookingModal se abre desde App
  const [selectedWalker, setSelectedWalker] = useState(null); // Necesario para BookingModal
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Lógica para cargar pets, bookings, currentUser de localStorage al iniciar App
  useEffect(() => {
    const savedPets = localStorage.getItem("petcare_pets");
    const savedBookings = localStorage.getItem("petcare_bookings");
    const savedUser = localStorage.getItem("petcare_user");

    if (savedPets) setPets(JSON.parse(savedPets));
    if (savedBookings) setBookings(JSON.parse(savedBookings));
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  // Efectos para guardar en localStorage cuando los estados cambian
  useEffect(() => {
    localStorage.setItem("petcare_pets", JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    localStorage.setItem("petcare_bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("petcare_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("petcare_user");
    }
  }, [currentUser]);

  // Funciones de gestión de datos que afectan estados globales (pets, bookings)
  // Se mantienen aquí en App.jsx como fuente de verdad.
  const addPet = (petData) => {
    const newPet = {
      id: Date.now(),
      ...petData,
      createdAt: new Date().toISOString(),
      userId: currentUser?.id, // Asegura que la mascota se asocie al usuario
    };
    setPets([...pets, newPet]);
    setShowAddPet(false);
    toast({
      title: "¡Mascota agregada!",
      description: `${petData.name} ha sido agregada exitosamente.`,
    });
  };

  const createBooking = (bookingData) => {
    if (!currentUser) {
      toast({
        title: "¡Inicia sesión!",
        description: "Debes iniciar sesión para crear una reserva.",
        variant: "destructive",
      });
      setShowLogin(true);
      return;
    }
    const newBooking = {
      id: Date.now(),
      ...bookingData,
      status: "pending",
      createdAt: new Date().toISOString(),
      userId: currentUser.id,
    };
    setBookings([...bookings, newBooking]);
    setShowBooking(false);
    setSelectedWalker(null);
    toast({
      title: "¡Reserva creada!",
      description: "Tu solicitud ha sido enviada al cuidador.",
    });
  };

  const deletePet = (petId) => {
    setPets(pets.filter((pet) => pet.id !== petId));
    toast({
      title: "Mascota eliminada",
      description: "La mascota ha sido eliminada de tu perfil.",
    });
  };

  const updateBookingStatus = (bookingId, status) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status } : booking
      )
    );
    toast({
      title: "Estado actualizado",
      description: `La reserva ha sido ${status === "confirmed" ? "confirmada" : "cancelada"}.`,
    });
  };

  const handleLogin = (userData) => {
    const user = {
      id: Date.now(),
      email: userData.email,
      name: userData.email.split("@")[0],
    };
    setCurrentUser(user);
    setShowLogin(false);
    toast({
      title: `¡Bienvenido, ${user.name}!`,
      description: "Has iniciado sesión correctamente.",
    });
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Conexión con Supabase pendiente",
      description: "La integración con Supabase no está completa. Por favor, sigue los pasos para conectar tu cuenta.",
      variant: "destructive",
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente.",
    });
  };

  // Definición de los ítems de navegación principales
  const navItems = [
    { id: "home", label: "Inicio" },
    // { id: "pets", label: "Mis Mascotas" }, // ¡ELIMINADA DE LA NAVEGACIÓN PRINCIPAL!
    { id: "dogwalkers", label: "Paseadores" },
    { id: "caregivers", label: "Cuidadores" },
    { id: "bookings", label: "Reservas" }, // Se mantiene en el nav principal si es una vista general de reservas
  ];

  return (
    <div className="min-h-screen bg-background">
      <NotificationManager currentUser={currentUser} />
      {/* DataManagers ya no deberían ser componentes, sino hooks o funciones directas */}
      {/* <PetDataManager pets={pets} setPets={setPets} /> */}
      {/* <BookingDataManager bookings={bookings} setBookings={setBookings} /> */}

      <Header
        navItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        setShowLogin={setShowLogin}
        setShowRegister={setShowRegister}
        handleLogout={handleLogout}
        // Nuevo prop para navegar al dashboard desde el Header (al hacer clic en el perfil)
        onNavigateToDashboard={() => setActiveTab("dashboard")}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "home" && <HomeTab key="home" onFindWalkerClick={() => setActiveTab("dogwalkers")} />}

          {/* Antiguo renderizado de PetsTab como pestaña principal - ELIMINADO */}
          {/* {activeTab === "pets" && (
            <PetsTab
              key="pets"
              pets={pets.filter((p) => !currentUser || p.userId === currentUser.id)}
              onAddPet={() => {
                if (!currentUser) {
                  setShowLogin(true);
                  return;
                }
                setShowAddPet(true);
              }}
              onDeletePet={deletePet}
              currentUser={currentUser}
            />
          )} */}

          {activeTab === "dogwalkers" && (
            <WalkersTab
              key="dogwalkers"
              pets={pets.filter((p) => !currentUser || p.userId === currentUser.id)}
              onSelectWalker={(walker) => {
                if (!currentUser) {
                  setShowLogin(true);
                  return;
                }
                setSelectedWalker(walker);
                setShowBooking(true);
              }}
              currentUser={currentUser}
            />
          )}
          {activeTab === "caregivers" && (
            <PetSittersTab
              key="caregivers"
              pets={pets.filter((p) => !currentUser || p.userId === currentUser.id)}
              onSelectPetSitter={(sitter) => {
                if (!currentUser) {
                  setShowLogin(true);
                  return;
                }
                setSelectedWalker(sitter);
                setShowBooking(true);
              }}
              currentUser={currentUser}
            />
          )}
          {activeTab === "bookings" && (
            <BookingsTab
              key="bookings"
              bookings={bookings.filter((b) => !currentUser || b.userId === currentUser.id)}
              // Nota: los walkers aquí podrían ser un problema si BookingTab los necesita todos.
              // En un futuro, BookingTab debería obtener la información del paseador/cuidador
              // a través del ID de la reserva, o de un contexto global de datos.
              walkers={[]}
              pets={pets}
              onUpdateStatus={updateBookingStatus}
              currentUser={currentUser}
            />
          )}

          {/* Nuevo: Renderizado del DashboardUser cuando activeTab es "dashboard" */}
          {activeTab === "dashboard" && currentUser && (
            <DashboardUser
              key="dashboard"
              currentUser={currentUser}
              pets={pets} // Se pasa el estado completo de las mascotas de App.jsx
              setPets={setPets} // Se pasa el setter de mascotas
              bookings={bookings} // Se pasa el estado completo de las reservas de App.jsx
              setBookings={setBookings} // Se pasa el setter de reservas
              // También se pasan las funciones y estados necesarios para los modales que abre el Dashboard
              showAddPet={showAddPet}
              setShowAddPet={setShowAddPet}
              addPet={addPet} // Pasamos la función addPet desde App.jsx
              deletePet={deletePet} // Pasamos la función deletePet desde App.jsx
              // Si el BookingModal se abre desde el Dashboard, necesitará estas props:
              // onSelectWalker={onSelectWalker}
              // setShowBooking={setShowBooking}
              // selectedWalker={selectedWalker}
              // createBooking={createBooking}
              // updateBookingStatus={updateBookingStatus}
            />
          )}
          {/* Mensaje si el usuario no está logueado y intenta acceder al dashboard */}
          {activeTab === "dashboard" && !currentUser && (
            <div className="text-center py-20 text-foreground/70">
              <h2 className="text-3xl font-bold mb-4">Acceso Denegado</h2>
              <p className="mb-6">Por favor, inicia sesión para acceder a tu dashboard.</p>
              <Button onClick={() => setShowLogin(true)}>Iniciar Sesión</Button>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Los modales se mantienen aquí en App.jsx si se abren desde varias pestañas
          o si necesitan acceder a estados y funciones globales de App.jsx */}
      <AnimatePresence>
        {showAddPet && currentUser && (
          <AddPetModal
            onClose={() => setShowAddPet(false)}
            onAdd={(petData) => addPet({ ...petData, userId: currentUser.id })}
          />
        )}
        {showBooking && selectedWalker && currentUser && (
          <BookingModal
            walker={selectedWalker}
            pets={pets.filter((p) => p.userId === currentUser.id)}
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
            onSwitchToRegister={() => {
              setShowLogin(false);
              setShowRegister(true);
            }}
          />
        )}
        {showRegister && !currentUser && (
          <RegisterModal
            onClose={() => setShowRegister(false)}
            onGoogleLogin={handleGoogleLogin}
            onSwitchToLogin={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;