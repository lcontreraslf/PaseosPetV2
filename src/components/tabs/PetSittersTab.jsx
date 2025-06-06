// src/components/tabs/PetSittersTab.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import ProfessionalProfileCard from '@/components/common/ProfessionalProfileCard'; // ¡IMPORTACIÓN ACTUALIZADA!

export default function PetSittersTab({ pets, onSelectPetSitter, currentUser }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [petSitters, setPetSitters] = useState([]);

  useEffect(() => {
    const localStorageKey = "petcare_petsitters_data";
    const savedPetSitters = localStorage.getItem(localStorageKey);
    let initialPetSittersData = [];

    if (savedPetSitters) {
      initialPetSittersData = JSON.parse(savedPetSitters);
    } else {
      initialPetSittersData = [
        { id: 201, name: "Ana López", rating: 5.0, experience: "2 años", price: 12, location: "Sur", services: ["Cuidado en casa", "Hospedaje nocturno"], avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", reviews: 156, verified: true },
        { id: 202, name: "Sofía Pérez", rating: 4.9, experience: "6 años", price: 20, location: "Oriente", services: ["Hospedaje", "Cuidado en casa", "Medicación"], avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734b584?w=150&h=150&fit=crop&crop=face", reviews: 210, verified: true },
        { id: 203, name: "Diego Castro", rating: 4.6, experience: "1 año", price: 10, location: "Poniente", services: ["Cuidado en casa", "Alimentación a domicilio"], avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", reviews: 45, verified: false },
      ];
      localStorage.setItem(localStorageKey, JSON.stringify(initialPetSittersData));
    }
    setPetSitters(initialPetSittersData);
  }, []);

  const filteredPetSitters = petSitters.filter(sitter => {
    const matchesSearch =
      sitter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sitter.services.some(service =>
        service.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesLocation = !selectedLocation || sitter.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  const locations = [...new Set(petSitters.map(w => w.location))].sort();
  const tabTitle = "Cuidadores Disponibles";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Encabezado y filtros */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold text-foreground">{tabTitle}</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
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

      {/* Tarjetas de cuidadores usando ProfessionalProfileCard */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPetSitters.map((sitter) => (
          <ProfessionalProfileCard // ¡COMPONENTE DE TARJETA ACTUALIZADO!
            key={sitter.id}
            person={sitter}
            onActionClick={onSelectPetSitter}
            currentUser={currentUser}
            pets={pets}
            actionButtonText="Reservar"
            priceUnit="/día"
          />
        ))}
      </div>
    </motion.div>
  );
}