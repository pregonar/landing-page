
import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Mail, 
  User, 
  Lock, 
  ChevronLeft, 
  CheckCircle, 
  AlertCircle
} from 'lucide-react';
import { loginWithEmail, registerWithEmail, recoverPassword, loginWithGoogle, UserProfile } from './auth';

interface AuthPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onNavigate: (view: 'landing' | 'events') => void;
}

type AuthMode = 'login' | 'register' | 'recover';

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [mode, setMode] = useState<AuthMode>('register');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
        if (mode === 'login') {
            const user = await loginWithEmail(email, password);
            onLoginSuccess(user);
        } else if (mode === 'register') {
            const user = await registerWithEmail(name, email, password);
            onLoginSuccess(user);
        } else if (mode === 'recover') {
            await recoverPassword(email);
            setSuccessMsg('Hemos enviado un enlace de recuperación a tu correo.');
            setIsLoading(false); // Stop loading to show success
            return; 
        }
    } catch (err) {
        setError('Ocurrió un error. Por favor verifica tus datos.');
    } finally {
        if (mode !== 'recover') setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
      setIsLoading(true);
      try {
          const user = await loginWithGoogle();
          onLoginSuccess(user);
      } catch (err) {
          setError('Error al conectar con Google');
          setIsLoading(false);
      }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
        
        {/* Left Side - Visual Branding */}
        <div className="hidden lg:flex w-1/2 bg-brand-navy relative overflow-hidden items-end">
            <img 
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                alt="Event Crowd" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent"></div>
            
            <div className="relative z-10 p-16 w-full">
                <div className="flex items-center gap-3 mb-8">
                    <img src="./logo.png" alt="Logo" className="w-10 h-10 rounded-full object-cover border-2 border-white/20" />
                    <span className="text-white font-display font-bold text-2xl tracking-tight">Pregonar</span>
                </div>
                
                <h1 className="text-5xl font-display font-bold text-white mb-4 leading-tight">
                    Tu voz es el eco de la <br/>
                    <span className="text-brand-red italic">cultura</span> y el <span className="text-yellow-400 italic">deporte</span>.
                </h1>
                <p className="text-gray-300 text-lg max-w-md">
                    ¡Únete a la comunidad más vibrante! Descubre eventos, conecta con instructores y vive tu pasión.
                </p>
            </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 relative">
            
            <button 
                onClick={() => onNavigate('landing')}
                className="absolute top-8 left-8 lg:left-12 flex items-center gap-2 text-gray-400 hover:text-brand-navy transition-colors text-sm font-medium"
            >
                <ChevronLeft size={16} /> Volver al inicio
            </button>

            <div className="max-w-md w-full mx-auto">
                <div className="mb-10">
                    <h2 className="text-3xl font-display font-bold text-brand-navy mb-2">
                        {mode === 'register' && 'Bienvenido a Pregonar'}
                        {mode === 'login' && '¡Hola de nuevo!'}
                        {mode === 'recover' && 'Recuperar contraseña'}
                    </h2>
                    <p className="text-gray-500">
                        {mode === 'register' && 'Crea tu cuenta para comenzar la experiencia.'}
                        {mode === 'login' && 'Ingresa tus datos para continuar.'}
                        {mode === 'recover' && 'Ingresa tu email y te enviaremos un enlace para restablecerla.'}
                    </p>
                </div>

                {/* Social Login (Only for Register/Login) */}
                {mode !== 'recover' && (
                    <>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <button 
                                onClick={handleGoogleLogin}
                                className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-brand-navy/30 transition-colors font-medium text-sm text-brand-navy"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google
                            </button>
                            <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-brand-navy/30 transition-colors font-medium text-sm text-brand-navy">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.56-2.09-.48-3.08.35-1.04.86-2.17.73-3.08-.35-2.58-2.9-3.23-7.53-.08-10.5 1.5-1.41 3.94-1.53 5.48-.19.64.56 1.48.56 2.13.02 1.9-1.57 4.92-1.32 6.6.93 1.22 1.63 1.76 2.97 1.25 4.97-2.67 1.47-3.66 2.82-6.14 4.42zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                                Apple
                            </button>
                        </div>

                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-xs text-gray-400 uppercase tracking-widest">
                                <span className="px-4 bg-white">O regístrate con tu email</span>
                            </div>
                        </div>
                    </>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm">
                        <AlertCircle size={18} /> {error}
                    </div>
                )}

                {successMsg && (
                    <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-3 text-sm">
                        <CheckCircle size={18} /> {successMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {mode === 'register' && (
                        <div>
                            <label className="block text-sm font-bold text-brand-navy mb-2">Nombre completo</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/50" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Ej. Maria Garcia" 
                                    className="w-full bg-gray-50 border border-gray-200 text-brand-navy placeholder-gray-400 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-brand-navy focus:bg-white focus:ring-4 focus:ring-brand-navy/10 transition-all text-sm font-medium"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-bold text-brand-navy mb-2">Correo electrónico</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/50" size={18} />
                            <input 
                                type="email" 
                                placeholder="nombre@ejemplo.com" 
                                className="w-full bg-gray-50 border border-gray-200 text-brand-navy placeholder-gray-400 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-brand-navy focus:bg-white focus:ring-4 focus:ring-brand-navy/10 transition-all text-sm font-medium"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {mode !== 'recover' && (
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-brand-navy">Contraseña</label>
                                {mode === 'login' && (
                                    <button 
                                        type="button"
                                        onClick={() => { setMode('recover'); setError(null); setSuccessMsg(null); }}
                                        className="text-xs text-brand-red font-medium hover:underline"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </button>
                                )}
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/50" size={18} />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Crear contraseña" 
                                    className="w-full bg-gray-50 border border-gray-200 text-brand-navy placeholder-gray-400 rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:border-brand-navy focus:bg-white focus:ring-4 focus:ring-brand-navy/10 transition-all text-sm font-medium"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-navy/50 hover:text-brand-navy"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    )}

                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-brand-red hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-red/20 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                {mode === 'register' && 'Comenzar a Pregonar'}
                                {mode === 'login' && 'Iniciar Sesión'}
                                {mode === 'recover' && 'Enviar enlace'}
                                {mode !== 'recover' && <ArrowRight size={18} />}
                            </>
                        )}
                    </button>

                    {mode === 'recover' && (
                        <button 
                            type="button"
                            onClick={() => { setMode('login'); setError(null); setSuccessMsg(null); }}
                            className="w-full text-brand-navy font-bold text-sm hover:underline mt-4 text-center block"
                        >
                            Volver a Iniciar Sesión
                        </button>
                    )}
                </form>

                {mode !== 'recover' && (
                    <div className="mt-8 text-center text-sm">
                        {mode === 'register' ? (
                            <p className="text-gray-500">
                                ¿Ya tienes cuenta? <button onClick={() => { setMode('login'); setError(null); }} className="text-brand-navy font-bold hover:underline">Inicia sesión</button>
                            </p>
                        ) : (
                            <p className="text-gray-500">
                                ¿No tienes cuenta? <button onClick={() => { setMode('register'); setError(null); }} className="text-brand-navy font-bold hover:underline">Regístrate</button>
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
