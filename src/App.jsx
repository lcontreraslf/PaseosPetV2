// src/App.jsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import NotificationManager from "@/components/layout/NotificationManager";
import { toast } from "@/components/ui/use-toast";

import HomeTab from "@/components/tabs/HomeTab";
import WalkersTab from "@/components/tabs/WalkersTab";
import PetSittersTab from "@/components/tabs/PetSittersTab";
import AddPetModal from "@/components/modals/AddPetModal";
import BookingModal from "@/components/modals/BookingModal";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DashboardUser from "@/components/views/DashboardUser";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [pets, setPets] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showAddPet, setShowAddPet] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedWalker, setSelectedWalker] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedPets = localStorage.getItem("petcare_pets");
    const savedBookings = localStorage.getItem("petcare_bookings");
    const savedUser = localStorage.getItem("petcare_user");

    if (savedPets) setPets(JSON.parse(savedPets));
    if (savedBookings) {
      const cleanBookings = JSON.parse(savedBookings).map(({ dismiss, ...rest }) => rest);
      setBookings(cleanBookings);
    }
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

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

  const addPet = (petData) => {
    const newPet = {
      id: Date.now(),
      ...petData,
      createdAt: new Date().toISOString(),
      userId: currentUser?.id,
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
    setActiveTab("dashboard");
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
    setActiveTab("home");
  };

  const navItems = [
    { id: "dogwalkers", label: "Paseadores" },
    { id: "caregivers", label: "Cuidadores" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NotificationManager currentUser={currentUser} />

      <Header
        navItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        setShowLogin={setShowLogin}
        setShowRegister={setShowRegister}
        handleLogout={handleLogout}
        onNavigateToDashboard={() => setActiveTab("dashboard")}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === "home" && <HomeTab key="home" onFindWalkerClick={() => setActiveTab("dogwalkers")} />}
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
          {activeTab === "dashboard" && currentUser && (
            <DashboardUser
              key="dashboard"
              currentUser={currentUser}
              pets={pets}
              setPets={setPets}
              bookings={bookings}
              setBookings={setBookings}
              showAddPet={showAddPet}
              setShowAddPet={setShowAddPet}
              addPet={addPet}
              deletePet={deletePet}
              createBooking={createBooking}
              updateBookingStatus={updateBookingStatus}
              setShowBooking={setShowBooking}
              setSelectedWalker={setSelectedWalker}
              setShowLogin={setShowLogin}
            />
          )}
          {activeTab === "dashboard" && !currentUser && (
            <div className="text-center py-20 text-foreground/70">
              <h2 className="text-3xl font-bold mb-4">Acceso Denegado</h2>
              <p className="mb-6">Por favor, inicia sesión para acceder a tu dashboard.</p>
              <Button onClick={() => setShowLogin(true)}>Iniciar Sesión</Button>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

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
