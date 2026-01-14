
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

interface LegalPageProps {
  title: string;
  content: React.ReactNode;
  onNavigate: (view: any) => void;
}

const LegalPageLayout: React.FC<LegalPageProps> = ({ title, content, onNavigate }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy flex flex-col">
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onNavigate('landing')}>
              <img src="/logo.png" alt="Pregonar Logo" className="h-10 w-10 mr-2 rounded-full object-cover" />
              <span className="font-display font-extrabold text-2xl tracking-tight text-brand-navy">PREGONAR</span>
            </div>
            <button onClick={() => onNavigate('landing')} className="text-sm font-bold text-gray-500 hover:text-brand-navy flex items-center gap-2">
                <ArrowLeft size={16} /> Volver
            </button>
          </div>
        </div>
      </nav>

      <div className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          <h1 className="text-4xl font-display font-bold text-brand-navy mb-8">{title}</h1>
          <div className="prose prose-blue max-w-none text-gray-600">
              {content}
          </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export const PrivacyPage: React.FC<{onNavigate: (view: any) => void}> = ({ onNavigate }) => (
    <LegalPageLayout 
        title="Política de Privacidad" 
        onNavigate={onNavigate}
        content={
            <>
                <p>Última actualización: Enero 2026</p>
                <h3>1. Información que recopilamos</h3>
                <p>En Pregonar, recopilamos información personal que usted nos proporciona directamente, como su nombre, dirección de correo electrónico y detalles de pago cuando se registra para un evento.</p>
                <h3>2. Uso de la información</h3>
                <p>Utilizamos su información para procesar inscripciones, facilitar la comunicación entre organizadores y asistentes, y mejorar nuestros servicios.</p>
                <h3>3. Compartir información</h3>
                <p>No vendemos su información personal. Solo compartimos datos con los organizadores de los eventos a los que se inscribe para fines de gestión.</p>
            </>
        }
    />
);

export const TermsPage: React.FC<{onNavigate: (view: any) => void}> = ({ onNavigate }) => (
    <LegalPageLayout 
        title="Términos y Condiciones" 
        onNavigate={onNavigate}
        content={
            <>
                <p>Última actualización: Enero 2026</p>
                <h3>1. Aceptación de los términos</h3>
                <p>Al acceder y utilizar Pregonar, usted acepta estar legalmente vinculado por estos términos.</p>
                <h3>2. Registro de eventos</h3>
                <p>Pregonar actúa como intermediario. La responsabilidad final del evento recae en el Organizador.</p>
                <h3>3. Reembolsos</h3>
                <p>Las políticas de reembolso son establecidas por cada organizador. Pregonar facilitará el proceso según las reglas definidas en cada evento.</p>
            </>
        }
    />
);

export const CookiesPage: React.FC<{onNavigate: (view: any) => void}> = ({ onNavigate }) => (
    <LegalPageLayout 
        title="Política de Cookies" 
        onNavigate={onNavigate}
        content={
            <>
                <p>Última actualización: Enero 2026</p>
                <h3>1. ¿Qué son las cookies?</h3>
                <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo para mejorar la experiencia de navegación.</p>
                <h3>2. Tipos de cookies que usamos</h3>
                <ul>
                    <li><strong>Esenciales:</strong> Necesarias para el funcionamiento del sitio (ej. mantener sesión).</li>
                    <li><strong>Analíticas:</strong> Nos ayudan a entender cómo los usuarios interactúan con la plataforma.</li>
                </ul>
                <h3>3. Gestión de cookies</h3>
                <p>Puede configurar su navegador para rechazar todas las cookies o indicar cuándo se envía una cookie.</p>
            </>
        }
    />
);
