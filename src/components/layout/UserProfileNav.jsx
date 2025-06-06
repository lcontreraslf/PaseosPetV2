// src/components/layout/UserProfileNav.jsx

import React from 'react';
import { User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'; // Asegúrate de tener shadcn/ui dropdown-menu configurado

// Componente para el botón de perfil y su menú desplegable
export default function UserProfileNav({ currentUser, handleLogout, onNavigateToDashboard }) {
  if (!currentUser) {
    return null; // No renderizar si no hay usuario conectado
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
          {/* Aquí puedes usar el avatar del usuario si lo tienes en currentUser */}
          {/* Por ahora, un icono de User o las iniciales del usuario */}
          {currentUser.avatar ? (
            <img src={currentUser.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
          ) : (
            <User className="w-5 h-5 text-foreground/70" />
          )}
          <span className="sr-only">Menú de usuario</span> {/* Accesibilidad */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-card border-border shadow-lg">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-semibold text-foreground">{currentUser.name || currentUser.email}</span>
            {currentUser.email && <span className="text-xs text-muted-foreground">{currentUser.email}</span>}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem className="cursor-pointer" onClick={() => onNavigateToDashboard()}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span>Mi Dashboard</span>
        </DropdownMenuItem>
        {/* Aquí podrías añadir más ítems como "Configuración", "Mis Reservas", etc. */}
        <DropdownMenuItem className="cursor-pointer text-red-500" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}