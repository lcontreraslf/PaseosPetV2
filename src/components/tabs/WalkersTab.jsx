import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Search, Star, MapPin, Award, DollarSign,
  Calendar, MessageCircle, CheckCircle
} from 'lucide-react';

export default function WalkersTab({ walkers, pets, onSelectWalker, currentUser }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const filteredWalkers = walkers.filter(walker => {
    const matchesSearch =
      walker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      walker.services.some(service =>
        service.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesLocation = !selectedLocation || walker.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  const locations = [...new Set(walkers.map(w => w.location))].sort();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Encabezado y filtros */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold text-foreground">Cuidadores Disponibles</h2>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Buscador */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar cuidadores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-border bg-card rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
              aria-label="Buscar cuidadores por nombre o servicio"
            />
          </div>

          {/* Filtro por zona */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-2 border border-border bg-card rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
            aria-label="Filtrar por zona"
          >
            <option value="">Todas las zonas</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tarjetas de cuidadores */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWalkers.map((walker) => (
          <motion.div
            key={walker.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg transition-all duration-300 pet-card-hover"
          >
            {/* Encabezado con foto */}
            <div className="flex items-center mb-4">
              <img
                src={walker.avatar}
                alt={`Avatar de ${walker.name}`}
                className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-primary/30"
              />
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="text-lg font-bold text-foreground">{walker.name}</h3>
                  {walker.verified && (
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" title="Verificado" />
                  )}
                </div>
                <div className="flex items-center text-sm text-foreground/70">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>{walker.rating}</span>
                  <span className="mx-1">•</span>
                  <span>{walker.reviews} reseñas</span>
                </div>
              </div>
            </div>

            {/* Datos */}
            <div className="space-y-3 mb-4 text-sm text-foreground/80">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <span>{walker.location}</span>
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-2 text-primary" />
                <span>{walker.experience} de experiencia</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-primary" />
                <span>${walker.price}/hora</span>
              </div>
            </div>

            {/* Servicios */}
            <div className="mb-4">
              <p className="text-sm font-medium text-foreground/90 mb-2">Servicios:</p>
              <div className="flex flex-wrap gap-2">
                {walker.services.map((service, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full capitalize"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Acciones */}
            <div className="flex gap-2">
              <Button
                className="flex-1 bg-gradient-to-r from-primary to-green-600 text-primary-foreground"
                onClick={() => onSelectWalker(walker)}
                disabled={!currentUser || pets.length === 0}
                aria-label="Reservar cuidador"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Reservar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-border text-foreground/70 hover:bg-gray-700/10"
                aria-label="Enviar mensaje"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>

            {/* Alertas */}
            {!currentUser && (
              <p className="text-xs text-red-500 mt-2 text-center">
                Inicia sesión para poder reservar.
              </p>
            )}
            {currentUser && pets.length === 0 && (
              <p className="text-xs text-red-500 mt-2 text-center">
                Agrega una mascota para poder reservar.
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
