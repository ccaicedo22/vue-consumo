# <img src="https://vuejs.org//images/logo.png" alt="vue Logo" width="50" height="50"/> Vue - Consumo API

## Carlos Andres Balaguera Caicedo - API- Vue-JWT

## Prueba realizada del 28/02/2025 al 02/03/2025

Bienvenido. Esta es la prueba técnica para validar mis conocimientos y fortalezas en el mundo del Fronted utilizando Vue, demostrando así mi capacidad de generar consumo api, estructuracion del procto, clean code, y demás para el mundo de Vue.

### Implementaciones:

## 📌 Estructura del Proyecto

📂 src  
 ├── 📂 assets  
 ├── 📂 components  
 ├── 📂 layouts  
 │    ├── AdminLayout.vue  # Layout con Sidebar para la parte administrativa  
 ├── 📂 plugins  
 │    ├── axios.js  # Configuración de Axios  
 ├── 📂 router  
 │    ├── index.js  # Definición de rutas  
 ├── 📂 store  
 │    ├── counter.js  # Estado global con Pinia o Vuex  
 ├── 📂 views  
 │    ├── 📂 authors  
 │    │    ├── Authors.vue  # Vista general del CRUD de autores  
 │    │    ├── CreateAuthor.vue  # Crear autor  
 │    │    ├── EditAuthor.vue  # Editar autor  
 │    ├── 📂 posts  
 │    │    ├── CreatePost.vue  # Crear post  
 │    │    ├── EditPost.vue  # Editar post  
 │    │    ├── PostDetail.vue  # Detalle del post  
 │    │    ├── Posts.vue  # Vista general del CRUD de posts  
 │    │    ├── PostDetailModal.vue  # Modal de detalles del post  
 │    ├── Home.vue  # Página principal  
 │    ├── Login.vue  # Página de login  
 ├── App.vue  
 ├── main.js  
 ├── style.css  # Estilos globales con TailwindCSS  
 ├── .env  # Variables de entorno  
 ├── .gitignore  # Archivos a ignorar en Git  
 ├── index.html  # Archivo principal HTML  
 ├── package.json  # Dependencias y scripts  
 ├── package-lock.json  # Archivo de bloqueo de versiones  
 ├── README.md  # Documentación del proyecto  
 ├── vite.config.js  # Configuración de Vite  


- **Diseño y Funcionalidades:**
  - **Diseño Mejorado**: Actualización en el diseño de las tarjetas de los blogs para una mejor presentación visual.
  - **Paginación**: Modificado para mostrar elementos por página.
  - **Modales**: Implementación de modales para crear, editar y ver detalles de autores y blogs.

## INSTRUCCIONES
Se consume la api creada en Laravel 10 ( https://github.com/ccaicedo22/Crud_Api_Blog_Test.git )


## Instalación:
## Instalación:
1. **Descarga e instala la API de laravel, las instrucciones están dentro del archivo README.md del repositorio.**

2. **Clonar o descargar el proyecto**:
    - Clona el repositorio utilizando Git:
      ```bash
      git clone <URL-del-repositorio>
      ```
    - O descarga el proyecto como un archivo ZIP y extráelo en el directorio de tu servidor web.

3. **Acceder mediante terminal a la carpeta del proyecto**:
    - Navega hasta la carpeta raíz del proyecto:
      ```bash
      cd <nombre-del-proyecto>
      ```

4. **Instalar dependencias**:
    - Ejecuta el siguiente comando para instalar las dependencias del proyecto:
      ```bash
      npm install
      ```
5. **Crear archivo .env**:
    - En la raiz del proyecto crear el archivo .env y poner lo siguiente:
      ```bash
      VITE_API_URL=http://127.0.0.1:8000

      ```
6. **Levantar el Servidor**:
- Ejecuta el siguiente comando:
```bash
npm run dev
```
7. **Ver en el navegador el proyecto**:
    - por lo general la url es:
      ```bash
      http://localhost:5173/
      ```



## 🛠️ Tecnologías Utilizadas
1. Vue 3: Framework progresivo para la construcción de interfaces de usuario.
2. Vue Router: Sistema de enrutamiento para Vue 3, utilizado para la navegación entre vistas.
3. Axios: Cliente HTTP que facilita la comunicación con APIs.
4. Vue Select: Componente de selección personalizable para mejorar la experiencia de selección de opciones.
5. SweetAlert2: Librería para mostrar alertas y notificaciones personalizadas en la aplicación.
6. Vue3 Easy Data Table: Componente ligero y estilizado para mostrar tablas de datos de forma dinámica.
7. Tailwind CSS: Framework de utilidades CSS para un diseño rápido y responsivo sin necesidad de escribir estilos personalizados. 
