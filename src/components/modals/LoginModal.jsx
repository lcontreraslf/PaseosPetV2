import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l0.001-0.001l6.19,5.238C39.904,36.336,44,30.601,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
  </svg>
);


export default function LoginModal({ onClose, onLogin, onGoogleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error de Validación",
        description: "Por favor, ingresa tu correo y contraseña.",
        variant: "destructive",
      });
      return;
    }
    onLogin({ email, password });
  };

  const handleGoogleSignInClick = () => {
    onGoogleLogin();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: -20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-card rounded-2xl p-8 w-full max-w-md shadow-2xl border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold text-center text-foreground mb-2">
          ¡Bienvenido de Nuevo!
        </h2>
        <p className="text-center text-foreground/70 mb-8">
          Ingresa tus datos para acceder a tu cuenta.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground/90 mb-1"
            >
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full pl-10 pr-3 py-2.5 border border-input bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow text-foreground"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground/90 mb-1"
            >
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 border border-input bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow text-foreground"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/50 hover:text-primary"
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

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-green-700 text-primary-foreground py-3 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Iniciar Sesión
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-foreground/60">O continúa con</span>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleGoogleSignInClick}
          className="w-full py-3 border-border text-foreground/80 hover:bg-muted/50 transition-colors duration-200 flex items-center justify-center gap-2 rounded-lg shadow-sm hover:shadow-md"
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

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground/40 hover:text-foreground/70"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}