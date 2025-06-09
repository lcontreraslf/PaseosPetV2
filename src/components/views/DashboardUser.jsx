// src/components/views/DashboardUser.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { PawPrint, PlusCircle, Star } from 'lucide-react';

// Importaciones de componentes
import PetsTab from '@/components/tabs/PetsTab';
import AddPetModal from "@/components/modals/AddPetModal";
import BookingModal from "@/components/modals/BookingModal";
import ProfessionalProfileCard from '@/components/common/ProfessionalProfileCard';
import PetAvatarCard from '@/components/common/PetAvatarCard';


export default function DashboardUser({ currentUser, pets, setPets, bookings, setBookings, addPet, deletePet, createBooking, updateBookingStatus, setShowLogin }) {
  // Estados internos del DashboardUser
  const [showAddPet, setShowAddPet] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedWalker, setSelectedWalker] = useState(null);
  const [favoriteProfessionals, setFavoriteProfessionals] = useState([]);

  // Lógica de carga/inicialización de profesionales favoritos
  useEffect(() => {
    const localStorageKey = "petcare_favorite_professionals";
    const savedFavorites = localStorage.getItem(localStorageKey);
    let initialFavoritesData = [];

    // Cargar desde localStorage si existen y no están vacíos
    if (savedFavorites) { // Solo si savedFavorites existe (no null)
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        if (Array.isArray(parsedFavorites) && parsedFavorites.length > 0) { // Y es un array no vacío
            initialFavoritesData = parsedFavorites;
        }
      } catch (e) {
        console.error("Error parsing saved favorites from localStorage:", e);
        // initialFavoritesData se mantendrá como [] si hay un error de parseo o no es un array válido
      }
    }

    // Si después de intentar cargar, initialFavoritesData sigue vacío, entonces usa los datos dummy
    if (initialFavoritesData.length === 0) {
      initialFavoritesData = [
        {
          id: 101, // ID de María González (paseadora)
          name: "María González", rating: 4.9, experience: "3 años", price: 15, location: "Centro",
          services: ["Paseos", "Entrenamiento Básico"], avatar: "https://robohash.org/mariagonzalez?size=150x150&set=set4", reviews: 127, verified: true
        },
        {
          id: 201, // ID de Ana López (cuidadora)
          name: "Ana López", rating: 5.0, experience: "2 años", price: 12, location: "Sur",
          services: ["Cuidado en casa", "Hospedaje nocturno"], avatar: "https://robohash.org/analopez?size=150x150&set=set4", reviews: 156, verified: true
        },
        { // Añadimos un tercer profesional favorito para asegurar 3 tarjetas
          id: 103, // ID de Javier Soto (paseador)
          name: "Javier Soto", rating: 4.7, experience: "4 años", price: 16, location: "Este",
          services: ["Paseos", "Cuidado diurno"], avatar: "https://robohash.org/javiersoto?size=150x150&set=set4", reviews: 110, verified: false,
        },
      ];
      localStorage.setItem(localStorageKey, JSON.stringify(initialFavoritesData));
    }
    setFavoriteProfessionals(initialFavoritesData);
  }, []); // Dependencia vacía para que se ejecute solo una vez al montar

  // Efecto para guardar favoritos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("petcare_favorite_professionals", JSON.stringify(favoriteProfessionals));
  }, [favoriteProfessionals]); // Depende de favoriteProfessionals


  // Derivación de datos para el usuario actual
  const userPets = currentUser ? pets.filter(p => p.userId === currentUser.id) : [];
  const userBookings = currentUser ? bookings.filter(b => b.userId === currentUser.id) : [];

  // Manejador para seleccionar un profesional favorito y abrir el modal de reserva
  const handleSelectFavoriteProfessional = (professional) => {
    if (!currentUser) {
      setShowLogin(true); // Abre el modal de login si no hay usuario
      toast({
        title: "¡Inicia sesión!",
        description: "Debes iniciar sesión para reservar servicios.",
        variant: "destructive",
      });
      return;
    }
    setSelectedWalker(professional); // Establece el profesional seleccionado
    setShowBooking(true); // Abre el modal de reserva
    toast({ title: "Profesional seleccionado", description: `Has seleccionado a ${professional.name}.` });
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
    >
      <h1 className="text-4xl font-extrabold text-foreground mb-8">
        Bienvenido a tu Dashboard, {currentUser?.name || 'usuario'}
      </h1>

      {/* Grid principal del Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna izquierda: Mis Mascotas y Favoritos */}
        <div className="lg:col-span-2 space-y-8"> {/* Clase lg:col-span-2 para ocupar 2/3 del ancho */}

          {/* Sección de Mis Mascotas */}
          <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center">
                <PawPrint className="w-6 h-6 mr-2 text-primary" />
                Mis Mascotas
              </h2>
              <Button
                onClick={() => {
                  if (!currentUser) {
                    setShowLogin(true);
                    toast({
                      title: "Inicia sesión",
                      description: "Debes iniciar sesión para agregar mascotas.",
                      variant: "destructive",
                    });
                    return;
                  }
                  setShowAddPet(true);
                }}
                className="bg-primary hover:bg-primary-dark text-primary-foreground"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Agregar Mascota
              </Button>
            </div>

            {/* Renderizado condicional: Tarjetas de avatar o la lista de mascotas */}
            {userPets.length === 0 ? (
              <div className="space-y-6">
                {/* === ELIMINADO EL MENSAJE "No tienes mascotas registradas" SEGÚN TU SOLICITUD === */}
                {/* Se mantiene el div contenedor para las cards y el espaciado */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                  {/* Utilizando las URLs de RoboHash que ya te funcionaban */}
                  <PetAvatarCard imageUrl="https://robohash.org/schnauzer?set=set4&size=80x80" name="Schnauzer" />
                  <PetAvatarCard imageUrl="https://robohash.org/gato?set=set4&size=80x80" name="Gato" />
                  <PetAvatarCard imageUrl="https://robohash.org/tortuga?set=set4&size=80x80" name="Tortuga" />
                </div>
              </div>
            ) : (
              <PetsTab
                pets={userPets}
                onAddPet={() => setShowAddPet(true)}
                onDeletePet={deletePet}
                currentUser={currentUser}
                isDashboardSection={true}
              />
            )}
          </div>

          {/* Sección de Profesionales Favoritos */}
          <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center">
              <Star className="w-6 h-6 mr-2 text-yellow-500" />
              Mis Profesionales Favoritos
            </h2>
            {/* Aquí es donde se renderizarán las tarjetas de favoritos */}
            {favoriteProfessionals.length === 0 ? (
              <p className="text-foreground/70 text-center py-8 border border-dashed border-border rounded-lg">
                Aún no has marcado profesionales como favoritos.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Asegurado sm:grid-cols-2 para 2 columnas en sm+ */}
                {favoriteProfessionals.map((professional) => (
                  <ProfessionalProfileCard
                    key={professional.id}
                    person={professional}
                    onActionClick={handleSelectFavoriteProfessional}
                    currentUser={currentUser}
                    pets={userPets}
                    actionButtonText={
                        professional.services.includes("Paseos") ? "Agendar Paseo" :
                        (professional.services.includes("Cuidado en casa") || professional.services.includes("Hospedaje")) ? "Reservar Cuidador" :
                        "Reservar"
                    }
                    priceUnit={
                        professional.services.includes("Paseos") ? "/hora" :
                        (professional.services.includes("Cuidado en casa") || professional.services.includes("Hospedaje")) ? "/día" :
                        ""
                    }
                  />
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Columna derecha: Reservas y Otros */}
        <div className="lg:col-span-1 space-y-8"> {/* Clase lg:col-span-1 para ocupar 1/3 del ancho */}
          {/* Sección de Reservas */}
          <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Tus Próximas Reservas
            </h2>
            {userBookings.length === 0 ? (
              <p className="text-foreground/70 text-center py-4 border border-dashed border-border rounded-lg">
                No tienes reservas activas.
              </p>
            ) : (
              <ul className="space-y-3">
                {userBookings.slice(0, 3).map(booking => {
                  const { dismiss, ...restOfBookingProps } = booking; 

                  return (
                    <li
                      key={restOfBookingProps.id}
                      className="bg-muted/30 p-3 rounded-lg flex items-center justify-between text-sm"
                      {...(dismiss !== undefined && { 'data-dismiss': dismiss })} 
                    >
                      <span>
                        {restOfBookingProps.petName} con {restOfBookingProps.walkerName} - {new Date(restOfBookingProps.date).toLocaleDateString()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        restOfBookingProps.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        restOfBookingProps.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {restOfBookingProps.status}
                      </span>
                    </li>
                  );
                })}
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

      {/* Modales que se abren desde el Dashboard */}
      <AnimatePresence>
        {showAddPet && currentUser && (
          <AddPetModal
            onClose={() => setShowAddPet(false)}
            onAdd={addPet}
          />
        )}
        {showBooking && selectedWalker && currentUser && (
          <BookingModal
            walker={selectedWalker}
            pets={userPets}
            onClose={() => {
              setShowBooking(false);
              setSelectedWalker(null);
            }}
            onBook={createBooking}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}