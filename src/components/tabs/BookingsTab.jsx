// src/components/tabs/BookingsTab.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, PawPrint, Clock, DollarSign } from 'lucide-react';

export default function BookingsTab({ bookings, walkers, pets, onUpdateStatus, currentUser }) {
  const getWalkerById = (id) => walkers.find((w) => w.id === id);
  const getPetById = (id) => pets.find((p) => p.id === id);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
      case 'cancelled': return 'bg-red-100 text-red-800 border border-red-300';
      case 'completed': return 'bg-blue-100 text-blue-800 border border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'pending': return 'Pendiente';
      case 'cancelled': return 'Cancelada';
      case 'completed': return 'Completada';
      default: return status;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <h2 className="text-3xl font-bold text-foreground">Mis Reservas</h2>

      {!currentUser ? (
        <div className="text-center py-20 bg-card/50 rounded-2xl">
          <div className="w-32 h-32 bg-gradient-to-r from-green-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-16 h-16 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground/80 mb-4">
            Inicia sesión para ver tus reservas
          </h3>
          <p className="text-foreground/70">Una vez que inicies sesión, podrás ver el historial aquí.</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 bg-card/50 rounded-2xl">
          <div className="w-32 h-32 bg-gradient-to-r from-green-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-16 h-16 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground/80 mb-4">
            No tienes reservas
          </h3>
          <p className="text-foreground/70">Cuando hagas una reserva, aparecerá aquí.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((bookingRaw, index) => {
            const { dismiss, ...booking } = bookingRaw; // Filtrado aquí
            const walker = getWalkerById(booking.walkerId);
            const pet = getPetById(booking.petId);

            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-foreground">
                        {walker?.name || 'Cuidador no encontrado'}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(booking.status)}`}
                      >
                        {getStatusText(booking.status)}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm text-foreground/80">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <PawPrint className="w-4 h-4 mr-2 text-primary" />
                          <span>{pet?.name || 'Mascota no encontrada'}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-primary" />
                          <span>{booking.date}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-primary" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-2 text-primary" />
                          <span>${booking.totalPrice}</span>
                        </div>
                      </div>
                    </div>

                    {booking.service && (
                      <div className="mt-3">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {booking.service}
                        </span>
                      </div>
                    )}
                    {booking.notes && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-foreground/90">
                          <strong>Notas:</strong> {booking.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {booking.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50 border-red-300 hover:border-red-400 transition"
                        onClick={() => onUpdateStatus(booking.id, 'cancelled')}
                        aria-label="Cancelar reserva"
                      >
                        Cancelar
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white transition"
                        onClick={() => onUpdateStatus(booking.id, 'confirmed')}
                        aria-label="Confirmar reserva"
                      >
                        Confirmar
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
