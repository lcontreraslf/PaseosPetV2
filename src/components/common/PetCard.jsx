// src/components/common/PetCard.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react'; // Iconos para editar y eliminar

// Este componente renderiza una tarjeta para una mascota del usuario.
// Se enfoca en datos de la mascota y acciones de gestión.
export default function PetCard({ pet, onDelete, onEdit, currentUser }) {
  // Las 'props' que espera 'pet' serían:
  // { id, name, type, breed, imageUrl, userId, ...otros datos de mascota }

  const isUserPet = currentUser && pet.userId === currentUser.id; // Asegura que solo el dueño pueda gestionar la mascota

  return (
    <motion.div
      key={pet.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-muted/30 rounded-lg p-4 shadow-sm flex flex-col items-center text-center"
    >
      <img
        src={pet.imageUrl || "https://via.placeholder.com/80"} // Fallback si no hay imagen
        alt={pet.name}
        className="w-20 h-20 rounded-full object-cover border-2 border-primary/50 mb-3"
      />
      <h3 className="text-lg font-semibold text-foreground">{pet.name}</h3>
      <p className="text-sm text-foreground/70">{pet.type} ({pet.breed})</p>
      {pet.age && <p className="text-xs text-foreground/60">{pet.age} años</p>} {/* Opcional: mostrar edad si existe */}
      {pet.notes && <p className="text-xs text-foreground/60 mt-1 line-clamp-2">{pet.notes}</p>} {/* Opcional: mostrar notas */}

      {isUserPet && ( // Solo muestra botones si es la mascota del usuario conectado
        <div className="flex gap-2 mt-3">
          {onEdit && ( // Botón de editar, si la prop onEdit se proporciona
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(pet.id)}
              className="border-border text-foreground/70 hover:bg-accent"
              aria-label={`Editar mascota ${pet.name}`}
            >
              <Edit className="w-4 h-4" />
            </Button>
          )}
          {onDelete && ( // Botón de eliminar, si la prop onDelete se proporciona
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(pet.id)}
              className="bg-red-500 hover:bg-red-600 text-white"
              aria-label={`Eliminar mascota ${pet.name}`}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
}