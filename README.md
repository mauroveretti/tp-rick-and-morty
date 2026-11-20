# TP Segundo Parcial - Rick and Morty

## Integrantes

- Mauro Montalbano

## Tema y API

- **Tema:** personajes de Rick and Morty
- **API:** [The Rick and Morty API](https://rickandmortyapi.com/documentation)
  - Listado: `GET /api/character/?page=N`
  - Búsqueda por nombre: `GET /api/character/?name=...` (la API tiene búsqueda propia)
  - Filtro por estado (vivo, muerto, desconocido): `GET /api/character/?status=...`
  - Detalle: `GET /api/character/:id`

## Funcionalidades

- Listado de personajes en el inicio, con paginación
- Barra de búsqueda por nombre (en el menú)
- Filtro por estado
- Detalle de cada personaje en `/detalle/:id`
- Favoritos guardados en `localStorage`, listados en `/favoritos`, donde se pueden quitar
- Estados de carga y de error con botón "Reintentar"
- Diseño mobile first con Bootstrap (`col-12 col-sm-6 col-md-4 col-lg-3`)
- Recomendador con IA

## Opción de IA elegida

**Gemini con Firebase AI Logic** (`firebase/ai`). En el inicio hay un recomendador donde se escribe un pedido
en texto libre (por ejemplo "un personaje que no sea humano") y Gemini recomienda personajes **de los que
ya cargó la página**. La API key de Gemini no está en el código: la administra Firebase.
El proyecto usa el plan Spark (gratuito); si se alcanza la cuota se muestra un mensaje avisándolo.

## Instalación

```bash
npm install
```

## Variables de entorno

Copiar `.env.example` como `.env` y completar con los datos de la app web del proyecto de Firebase
(Consola de Firebase > Configuración del proyecto > Tus apps):

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

En la consola de Firebase hay que tener habilitado **AI Logic** con la Gemini Developer API.

## Correr el proyecto

```bash
npm run dev
```

## Deploy en Firebase Hosting

```bash
npm run build
firebase deploy
```

El `firebase.json` redirige todas las rutas a `index.html`, así funciona al recargar cualquier ruta.

**URL pública:** https://tp-rick-and-morty.web.app

## Capturas

### Móvil

COMPLETAR

### Escritorio

COMPLETAR
