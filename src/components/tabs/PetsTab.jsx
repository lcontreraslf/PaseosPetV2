import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, PawPrint } from 'lucide-react';

export default function PetsTab({ pets, onAddPet, onDeletePet, currentUser }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-foreground">Mis Mascotas</h2>
        <Button 
          onClick={onAddPet} 
          className="bg-gradient-to-r from-primary to-green-600 text-primary-foreground"
          disabled={!currentUser}
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Mascota
        </Button>
      </div>

      {!currentUser ? (
         <div className="text-center py-20 bg-card/50 rounded-2xl">
          <div className="w-32 h-32 bg-gradient-to-r from-green-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <PawPrint className="w-16 h-16 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground/80 mb-4">Inicia sesión para ver tus mascotas</h3>
          <p className="text-foreground/70">Una vez que inicies sesión, podrás agregar y administrar tus mascotas aquí.</p>
        </div>
      ) : pets.length === 0 ? (
        <div className="text-center py-20 bg-card/50 rounded-2xl">
          <div className="w-32 h-32 bg-gradient-to-r from-green-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <PawPrint className="w-16 h-16 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground/80 mb-4">No tienes mascotas registradas</h3>
          <p className="text-foreground/70 mb-8">Agrega tu primera mascota para comenzar a usar nuestros servicios</p>
          <Button onClick={onAddPet} size="lg" className="bg-gradient-to-r from-primary to-green-600 text-primary-foreground">
            <Plus className="w-5 h-5 mr-2" />
            Agregar Primera Mascota
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg pet-card-hover"
            >
              <div className="relative mb-4">
                <img
                  className="w-full h-48 object-cover rounded-xl"
                  alt={`${pet.name} - ${pet.breed}`}
                  src="https://images.unsplash.com/photo-1568937473534-5e6e27531ac9" />
                <div className="absolute top-3 right-3 flex space-x-2">
                  <Button size="sm" variant="outline" className="bg-white/80 border-border hover:bg-gray-100">
                    <Edit className="w-4 h-4 text-foreground/70" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/80 text-red-500 hover:bg-red-50 border-border"
                    onClick={() => onDeletePet(pet.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2">{pet.name}</h3>
              <div className="space-y-2 text-sm text-foreground/80">
                <div className="flex items-center">
                  <span className="font-medium w-16 text-foreground/90">Raza:</span>
                  <span>{pet.breed}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-16 text-foreground/90">Edad:</span>
                  <span>{pet.age}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-16 text-foreground/90">Peso:</span>
                  <span>{pet.weight}</span>
                </div>
              </div>

              {pet.specialNeeds && (
                <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Necesidades especiales:</strong> {pet.specialNeeds}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}