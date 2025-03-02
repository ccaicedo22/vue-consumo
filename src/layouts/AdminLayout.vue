<template>
    <div class="flex h-screen">
      <!-- Sidebar fijo -->
      <aside class="w-64 bg-gray-900 text-white p-6 flex-shrink-0">
        <h2 class="text-xl font-bold">Panel de Control</h2>
        <nav class="mt-6">
          <ul>
            <li>
              <router-link to="/dashboard/authors" class="block py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600">
                Autores
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/posts" class="block py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600">
                Blogs
              </router-link>
            </li>
          </ul>
        </nav>
      </aside>
  
      <!-- Contenido principal -->
      <div class="flex flex-col flex-1 bg-gray-100 min-w-0">
        <!-- Header -->
        <header class="bg-white p-4 shadow-md flex justify-between">
          <button @click="toggleSidebar" class="md:hidden">
            <font-awesome-icon :icon="['fas', 'bars']" class="text-2xl text-gray-700" />
          </button>
          <h1 class="text-2xl font-bold">Dashboard</h1>
        </header>
  
        <!-- Aquí se cargan las páginas -->
        <main class="flex-1 p-6">
          <router-view />
        </main>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sidebarOpen: false,
      };
    },
    methods: {
      toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
      },
    },
  };
  </script>
  