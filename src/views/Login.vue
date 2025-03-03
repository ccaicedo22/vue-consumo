<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
      
      <img src="/logo.png" alt="Logo" class="w-24 h-24 mx-auto mb-4" />

      <h2 class="text-2xl font-semibold text-gray-700 mb-6">Iniciar Sesión</h2>
      
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

        <div v-if="loading" class="text-center text-blue-600 font-semibold">
          Validando datos...
        </div>

        <button 
          type="submit"
          :disabled="loading" 
          class="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          <span v-if="loading">Validando...</span>
          <span v-else>Iniciar Sesión</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import api from "../plugins/axios"; 
import Swal from 'sweetalert2';

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const loading = ref(false); 

    const handleLogin = async () => {
      loading.value = true; 
      try {
        const response = await api.post("/api/auth/login", {
          email: email.value,
          password: password.value,
        });

        const token = response.data.access_token; 
        localStorage.setItem("token", token);

        Swal.fire({
          title: 'Éxito',
          text: '¡Inicio de sesión exitoso!',
          icon: 'success',
        });

        window.location.href = "/dashboard"; 
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: '¡Credenciales incorrectas!',
          icon: 'error',
        });
      } finally {
        loading.value = false; 
      }
    };

    return { email, password, loading, handleLogin };
  }
};
</script>
<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #2EA1DB, #2B8CCA, #2F77A6, #F2F1F6);
  min-height: 100vh; 
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>