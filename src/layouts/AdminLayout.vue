<template>
  <div class="flex h-screen">
    <aside class="w-64 bg-gradient text-white p-6 flex-shrink-0">
      <div class="flex justify-center mb-4">
        <router-link to="/dashboard">
          <img src="/logo.png" alt="Logo" class="w-20 h-20 cursor-pointer hover:scale-105 transition-transform duration-200" />
        </router-link>
      </div>

      <h2 class="text-xl font-bold text-center">Panel de Control</h2>

      <nav class="mt-6">
        <ul>
          <li>
            <router-link to="/dashboard/authors" class="nav-link">
              ✍️ Autores
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/posts" class="nav-link">
              📝 Blogs
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <div class="flex flex-col flex-1 bg-gray-100 min-w-0">
      <header class="bg-white p-4 shadow-md flex justify-between">
        <button @click="toggleSidebar" class="md:hidden">
          ☰
        </button>
        <h1 class="text-2xl font-bold">Dashboard</h1>
      </header>

      <main class="flex-1 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #2EA1DB, #2B8CCA, #2F77A6, #F2F1F6);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background: border-box;
  transition: background 0.3s ease-in-out, transform 0.2s;
  font-size: 1rem;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}
</style>
