import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24" role="img" aria-label="Google Icon">
    <path fill="#FFC107" d="..."/>
    <path fill="#FF3D00" d="..."/>
    <path fill="#4CAF50" d="..."/>
    <path fill="#1976D2" d="..."/>
  </svg>
);

export default function LoginModal({ onClose, onLogin, onGoogleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid = email && password;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast({
        title: 'Error de Validación',
        description: 'Por favor, ingresa tu correo y contraseña.',
        variant: 'destructive',
      });
      return;
    }
    onLogin({ email, password });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >
      <motion.div
        initial={{ scale: 0.9, y: -20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative bg-card rounded-2xl p-8 w-full max-w-md shadow-2xl border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="login-title" className="text-3xl font-bold text-center text-foreground mb-2">
          ¡Bienvenido de Nuevo!
        </h2>
        <p className="text-center text-foreground/70 mb-8">
          Ingresa tus datos para acceder a tu cuenta.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground/90 mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50 w-5 h-5" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full pl-10 pr-3 py-2.5 border border-input bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                aria-invalid={!email}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground/90 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50 w-5 h-5" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-2.5 border border-input bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                aria-invalid={!password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-primary"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className="text-right mt-1">
              <a href="#" className="text-sm text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 text-base font-semibold rounded-lg shadow-md transition-transform hover:-translate-y-0.5"
          >
            Iniciar Sesión
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-foreground/60">O continúa con</span>
          </div>
        </div>

        {/* Google Login */}
        <Button
          type="button"
          variant="outline"
          onClick={onGoogleLogin}
          className="w-full py-3 border-border text-foreground/80 hover:bg-muted/50 flex items-center justify-center gap-2 rounded-lg shadow-sm hover:shadow-md"
          aria-label="Iniciar sesión con Google"
        >
          <GoogleIcon />
          Iniciar Sesión con Google
        </Button>

        <p className="mt-8 text-center text-sm text-foreground/70">
          ¿No tienes una cuenta?{' '}
          <a href="#" className="font-medium text-primary hover:underline">
            Regístrate aquí
          </a>
        </p>

        {/* Close button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Cerrar modal de inicio de sesión"
          className="absolute top-4 right-4 text-foreground/40 hover:text-foreground/70"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth={1.5} className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}
