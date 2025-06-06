// src/components/tabs/PetsTab.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PawPrint, PlusCircle } from 'lucide-react';
import PetCard from '@/components/common/PetCard';

// Aceptar el nuevo prop isDashboardSection y las funciones directamente
export default function PetsTab({ pets, onAddPet, onDeletePet, currentUser, isDashboardSection = false }) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      // Cuando PetsTab es una sección del Dashboard, no necesita su propio padding o título.
      // Las clases de padding se manejarán en el DashboardUser.jsx
      className={isDashboardSection ? "" : "space-y-6"} // Si es dashboard, no aplica este padding principal
    >
      <div className={isDashboardSection ? "hidden" : "flex justify-between items-center mb-4"}>
        {/* Ocultar el título principal y el botón de añadir si es parte del Dashboard */}
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
              onDelete={onDeletePet} // Pasamos onDelete recibido del Dashboard
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}