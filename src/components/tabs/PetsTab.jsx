import React from 'react';
import { motion } from 'framer-motion';
import { PawPrint, PlusCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PetsTab = ({ pets, onAddPet, onDeletePet, currentUser }) => {
  return (
    <motion.div
      key="pets"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
          <PawPrint className="w-6 h-6 text-green-600" />
          Mis Mascotas
        </h2>
        <Button
          onClick={onAddPet}
          className="bg-green-600 text-white hover:bg-green-700 transition"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Agregar Mascota
        </Button>
      </div>

      {/* Lista de Mascotas */}
      {pets.length === 0 ? (
        <p className="text-muted-foreground">No tienes mascotas registradas aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pets.map((pet, index) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-card/70 backdrop-blur-sm border border-border rounded-2xl p-5 shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-primary">
                  {pet.name}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    // if (confirm('¿Estás seguro de eliminar esta mascota?')) {
                    onDeletePet(pet.id);
                    // }
                  }}
                  className="text-red-500 hover:text-red-700"
                  aria-label={`Eliminar ${pet.name}`}
                >
                  <XCircle className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {pet.type} - {pet.breed} <br />
                Edad: {pet.age} años
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default PetsTab;
