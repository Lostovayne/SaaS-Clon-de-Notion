# Clon de Notion

## Descripción General

Este proyecto es un clon de Notion desarrollado con tecnologías modernas. Ofrece una experiencia similar a Notion con funcionalidades de edición en tiempo real, autenticación segura y una interfaz de usuario responsive.

El desarrollo de esta aplicación tipo Notion muestra la implementación de tecnologías de vanguardia. Construida sobre Next 14, la aplicación integra perfectamente Clerk para una autenticación segura y aprovecha Convex como un robusto backend en la nube. Para mejorar la experiencia del usuario, la aplicación utiliza una combinación de componentes Shadcn y Tailwind para diseños elegantes y responsivos. Esta combinación de herramientas y frameworks poderosos asegura una experiencia fluida y visualmente atractiva para los usuarios.

![captura de pantalla-localhost-3000-2023-11-16-16_22_56](https://github.com/Lostovayne/Clon-de-Notion-con-Next14-Tailwind-Typescript/assets/92962731/9fff6f52-88ff-4798-b59e-f1a8d19e84d1)

## Características Principales

- Base de datos en tiempo real 🔗
- Editor estilo Notion 📝
- Modo claro y oscuro 🌓
- Documentos hijos infinitos 🌲
- Papelera y eliminación suave 🗑️
- Autenticación 🔐
- Carga de archivos
- Eliminación de archivos
- Reemplazo de archivos
- Iconos para cada documento (cambios en tiempo real) 🌠
- Barra lateral expandible ➡️🔀⬅️
- Completamente responsive para móviles 📱
- Publica tu nota en la web 🌐
- Barra lateral completamente plegable ↕️
- Página de inicio 🛬
- Imagen de portada para cada documento 🖼️
- Recuperación de archivos eliminados 🔄📄

## Tecnologías Principales

- **Next.js 14**: Framework de React para el frontend.
- **Clerk**: Sistema de autenticación.
- **Convex**: Backend en la nube para tiempo real.
- **Shadcn**: Componentes UI personalizables.
- **Tailwind CSS**: Framework de CSS para estilos.
- **TypeScript**: Superset de JavaScript para tipado estático.

## Configuración del Proyecto

### Prerrequisitos

**Node versión 18.x.x**

### Instalación de paquetes

```shell
npm i
```

**Copia .env.example a .env.local**

### Configuración del archivo .env.local

```js
# Despliegue usado por `npx convex dev`

# Variables de entorno de Convex se agregan automáticamente si se ejecuta el comando npx.... desde la web de Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Variables de entorno de Clerk => Tomarlas de la web de Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

### Iniciar el servidor Convex

```shell
npx convex dev
```

### Iniciar la aplicación

```shell
npm run dev
```

## Guía de Desarrollo

### Convex

- Los modelos y funciones del backend se encuentran en la carpeta `convex/`.
- Para añadir nuevas funcionalidades al backend, crea nuevos archivos en esta carpeta.

### Componentes

- Los componentes reutilizables están en `components/`.
- Utiliza Shadcn y Tailwind para estilizar los componentes.

### Rutas

- Las rutas de la aplicación se definen en `app/(main)/(routes)/`.
- Las páginas de marketing están en `app/(marketing)/`.

### Hooks Personalizados

- Los hooks reutilizables se encuentran en `hooks/`.

### Utilidades

- Las funciones y utilidades comunes están en `lib/`.

## Despliegue

1. Configura tu proyecto en Vercel o tu plataforma de hosting preferida.
2. Asegúrate de configurar las variables de entorno en tu plataforma de hosting.
3. Conecta tu repositorio y despliega.

## Contribución

1. Haz fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/CaracteristicaIncreible`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir alguna CaracteristicaIncreible'`).
4. Push a la rama (`git push origin feature/CaracteristicaIncreible`).
5. Abre un Pull Request.

## Soporte

Para soporte, por favor abre un issue en el repositorio de GitHub.

## Licencia

Este proyecto está bajo la licencia [INSERTAR TIPO DE LICENCIA]. Consulta el archivo `LICENSE` para más detalles.
