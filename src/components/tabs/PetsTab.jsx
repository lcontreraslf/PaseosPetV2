// src/components/tabs/PetsTab.jsx (VERSIÓN ACTUALIZADA)

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PawPrint, PlusCircle } from 'lucide-react'; // Asegúrate de importar PlusCircle para el botón si lo usas aquí
import PetCard from '@/components/common/PetCard';

// Aceptar el nuevo prop isDashboardSection y las funciones directamente
export default function PetsTab({ pets, onAddPet, onDeletePet, currentUser, isDashboardSection = false }) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={isDashboardSection ? "" : "space-y-6"} // Si es dashboard, no aplica este padding principal
    >
      {/* El título y el botón de "Agregar Mascota" se ocultan si es una sección del dashboard,
          porque el DashboardUser.jsx ya tiene su propio título y botón principal. */}
      {!isDashboardSection && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-foreground flex items-center">
            <PawPrint className="w-7 h-7 mr-2 text-primary" />
            Mis Mascotas
          </h2>
          <Button
            onClick={onAddPet}
            className="bg-primary hover:bg-primary-dark text-primary-foreground"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Agregar Mascota
          </Button>
        </div>
      )}

      {pets.length === 0 ? (
        <p className="text-foreground/70 text-center py-8 border border-dashed border-border rounded-lg">
          No tienes mascotas registradas. ¡Agrega la primera!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              onDelete={onDeletePet}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}