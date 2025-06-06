// src/components/views/DashboardUser.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { PawPrint, PlusCircle } from 'lucide-react';

// Importa el componente PetsTab que vamos a reutilizar como sección
import PetsTab from '@/components/tabs/PetsTab';
// Importamos PetCard, aunque PetsTab ya lo usa, se mantiene para claridad
// import PetCard from '@/components/common/PetCard'; // No es estrictamente necesario aquí si PetsTab ya lo importa y usa.

// También importamos el modal para agregar mascotas si se abre desde el Dashboard
import AddPetModal from "@/components/modals/AddPetModal";
// Importamos BookingModal si el Dashboard lo va a gestionar directamente
// import BookingModal from "@/components/modals/BookingModal";


// Este Dashboard es para el usuario dueño de mascotas.
export default function DashboardUser({ currentUser, pets, setPets, bookings, setBookings, onSelectWalker, setShowLogin, setShowBooking }) {
  // El estado de 'showAddPet' y 'showBooking' se mantiene aquí en el Dashboard,
  // ya que son parte de su UI directa.
  const [showAddPet, setShowAddPet] = useState(false);
  const [selectedWalker, setSelectedWalker] = useState(null); // Para el BookingModal si se usa aquí


  // NOTA: La lógica de carga/guardado de 'pets' y 'bookings' ahora debería estar
  // centralizada en App.jsx o en un hook/contexto global si se necesita en muchos lugares.
  // Por ahora, PetsTab y BookingsTab gestionan parte de ello, y el Dashboard
  // recibirá 'pets', 'setPets', 'bookings', 'setBookings' como props desde App.jsx.


  const addPet = (petData) => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para agregar una mascota.",
        variant: "destructive",
      });
      return;
    }
    const newPet = {
      id: Date.now(),
      ...petData,
      createdAt: new Date().toISOString(),
      userId: currentUser.id, // Asegura que la mascota se asocie al usuario
    };
    setPets([...pets, newPet]);
    setShowAddPet(false);
    toast({
      title: "¡Mascota agregada!",
      description: `${petData.name} ha sido agregada exitosamente.`,
    });
  };

  const deletePet = (petId) => {
    setPets(pets.filter((pet) => pet.id !== petId));
    toast({
      title: "Mascota eliminada",
      description: "La mascota ha sido eliminada de tu perfil.",
    });
  };

  // Esta función puede estar en App.jsx y pasarse, o si el dashboard la necesita para mostrar el estado.
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


  const userPets = currentUser ? pets.filter(p => p.userId === currentUser.id) : [];
  const userBookings = currentUser ? bookings.filter(b => b.userId === currentUser.id) : [];


  // Esta es la parte más importante: renderizar PetsTab y BookingsTab (o sus contenidos)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
    >
      <h1 className="text-4xl font-extrabold text-foreground mb-8">
        Bienvenido a tu Dashboard, {currentUser?.name || 'Usuario'}
      </h1>

      {/* Grid principal del Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna izquierda: Mis Mascotas (Ahora usando PetsTab directamente) */}
        {/* PetsTab ahora gestiona su propia visualización y lógica de añadir/eliminar */}
        {/* NOTA: PetsTab debería recibir 'pets', 'onAddPet', 'onDeletePet', 'currentUser' */}
        <div className="lg:col-span-2">
            <PetsTab
                pets={userPets} // Le pasamos las mascotas ya filtradas por el usuario
                onAddPet={() => setShowAddPet(true)} // Abrir AddPetModal desde el Dashboard
                onDeletePet={deletePet}
                currentUser={currentUser}
                isDashboardSection={true} // Un nuevo prop para que PetsTab sepa que está en el dashboard
            />
        </div>


        {/* Columna derecha: Reservas y Otros (ocupa 1 columna en pantallas grandes) */}
        <div className="lg:col-span-1 space-y-8">
          {/* Sección de Reservas (puedes adaptar BookingsTab o crear un componente más simple) */}
          <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Tus Próximas Reservas
            </h2>
            {userBookings.length === 0 ? (
              <p className="text-foreground/70 text-center py-4 border border-dashed border-border rounded-lg">
                No tienes reservas activas.
              </p>
            ) : (
              // Aquí puedes renderizar una versión simplificada de BookingsTab
              // o un componente 'BookingCard' para cada reserva.
              <ul className="space-y-3">
                {userBookings.slice(0, 3).map(booking => ( // Mostrar solo las 3 primeras
                  <li key={booking.id} className="bg-muted/30 p-3 rounded-lg flex items-center justify-between text-sm">
                    <span>
                      {booking.petName} con {booking.walkerName} - {new Date(booking.date).toLocaleDateString()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </li>
                ))}
                {userBookings.length > 3 && (
                  <Button variant="link" className="w-full">Ver todas las reservas</Button>
                )}
              </ul>
            )}
            <Button className="w-full" onClick={() => toast({ title: "Funcionalidad", description: "Ver historial de reservas completo (en desarrollo)." })}>
              Gestionar Reservas
            </Button>
          </div>

          {/* Sección de Paseos (Historial) - Placeholder */}
          <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Historial de Paseos
            </h2>
            <p className="text-foreground/70 text-center py-4 border border-dashed border-border rounded-lg">
              Aquí aparecerán tus paseos completados. (En desarrollo)
            </p>
            <Button className="w-full" variant="outline">
              Ver Paseos
            </Button>
          </div>

          {/* Sección de Cuidados (Historial) - Placeholder */}
          <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Historial de Cuidados
            </h2>
            <p className="text-foreground/70 text-center py-4 border border-dashed border-border rounded-lg">
              Aquí aparecerán tus cuidados completados. (En desarrollo)
            </p>
            <Button className="w-full" variant="outline">
              Ver Cuidados
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAddPet && currentUser && (
          <AddPetModal
            onClose={() => setShowAddPet(false)}
            onAdd={addPet}
          />
        )}
        {/* Si BookingModal se va a abrir desde el Dashboard, también debe estar aquí */}
        {/* {showBooking && selectedWalker && currentUser && (
          <BookingModal
            walker={selectedWalker}
            pets={userPets} // Pasa las mascotas del usuario
            onClose={() => {
              setShowBooking(false);
              setSelectedWalker(null);
            }}
            onBook={createBooking} // Necesitarías definir createBooking en el Dashboard si la usas aquí
          />
        )} */}
      </AnimatePresence>
    </motion.div>
  );
}