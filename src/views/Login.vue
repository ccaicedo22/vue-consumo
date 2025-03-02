<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Iniciar Sesión</h2>
        
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              placeholder="Ingresa tu email"
              class="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 text-gray-900"
              required
            />
          </div>
  
          <div>
            <label for="password" class="block text-sm font-medium text-gray-600">Contraseña</label>
            <input
              v-model="password"
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              class="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 text-gray-900"
              required
            />
          </div>
  
          <button type="submit" class="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import api from "../plugins/axios"; 
  
  export default {
    setup() {
      const email = ref("");
      const password = ref("");
  
      const handleLogin = async () => {
        try {
          const response = await api.post("/api/auth/login", {
            email: email.value,
            password: password.value,
          });
  
          const token = response.data.access_token; 
          localStorage.setItem("token", token);
  
          alert("¡Inicio de sesión exitoso!"); 
          window.location.href = "/dashboard"; 
  
        } catch (error) {
          console.error("Error en el login:", error);
          alert("Credenciales incorrectas"); 
        }
      };
  
      return { email, password, handleLogin };
    }
  };
  </script>
  