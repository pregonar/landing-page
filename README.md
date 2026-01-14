# Pregonar - Descubre Tu Próxima Pasión

Pregonar es la plataforma líder para descubrir, crear y participar en eventos deportivos, artísticos y culturales. Conectamos a las personas con instructores profesionales y les ayudamos a encontrar su tribu.

![Pregonar Banner](https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200)

## 🚀 Características Principales

*   **Descubrimiento de Eventos**: Explora eventos por categorías como Deportes, Arte, Cultura, Talleres y Bienestar.
*   **Vitrina de Instructores**: Una galería premium para conocer a los mejores profesionales y mentores.
*   **Gestión de Tickets y Reservas**: Sistema simplificado para reservar tu lugar en eventos y clases.
*   **Comunidad**: Conecta con grupos afines a tus intereses.
*   **Dashboards Especializados**:
    *   **Organizadores**: Herramientas para crear y gestionar eventos.
    *   **Instructores**: Gestión de clases y perfil profesional.
    *   **Admins**: Paneles de administración para la gestión de la plataforma.

## 🛠️ Stack Tecnológico

Este proyecto está construido con las mejores prácticas web modernas de 2026:

*   **Frontend Framework**: [React 19](https://react.dev/)
*   **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
*   **Iconos**: [Lucide React](https://lucide.dev/)
*   **IA**: Integración con Google Gemini para funcionalidades inteligentes.

## 📋 Requisitos Previos

Asegúrate de tener instalado lo siguiente:

*   [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
*   npm (incluido con Node.js)

## 🔧 Instalación y Configuración

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/pregonar-landing-page.git
    cd pregonar-landing-page
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno**:
    Copia el archivo de ejemplo y configura tus claves (como la API Key de Gemini):
    ```bash
    cp .env.example .env
    ```
    Edita el archivo `.env` con tus credenciales.

4.  **Iniciar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:3000` (o el puerto que indique la consola).

## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura modular y organizada:

```
src/
├── components/      # Componentes UI reutilizables (Botones, Footers, Cards)
├── pages/           # Vistas principales de la aplicación (Home, Eventos, Perfil)
├── lib/             # Utilidades, hooks y configuración de servicios (Auth)
├── styles/          # Estilos globales y configuración de Tailwind
└── assets/          # Imágenes y recursos estáticos
```

## 🏗️ Comandos Disponibles

*   `npm run dev`: Inicia el servidor de desarrollo.
*   `npm run build`: Compila la aplicación para producción.
*   `npm run preview`: Previsualiza la build de producción localmente.

## 🔒 Seguridad

El proyecto implementa prácticas de seguridad modernas:
*   Gestión de secretos mediante variables de entorno (`.env`).
*   Configuración adecuada de `.gitignore` para evitar fugas de información.

## 📄 Licencia

Este proyecto es propiedad privada de Pregonar. Todos los derechos reservados.
