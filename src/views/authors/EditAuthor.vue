<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h2 class="text-xl font-bold mb-4">Editar Autor</h2>
  
        <input 
          v-model="author.first_name" 
          type="text" 
          placeholder="Nombres" 
          class="border p-2 rounded-lg mb-2 w-full"
        />
  
        <input 
          v-model="author.last_name" 
          type="text" 
          placeholder="Apellidos" 
          class="border p-2 rounded-lg mb-4 w-full"
        />
  
        <div class="flex justify-end space-x-2">
          <button @click="$emit('closeModal')" class="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">
            Cancelar
          </button>
          <button @click="updateAuthor" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Actualizar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      authorData: Object, 
    },
    data() {
      return {
        author: { ...this.authorData }, 
      };
    },
    methods: {
      async updateAuthor() {
        if (!this.author.first_name || !this.author.last_name) {
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Todos los campos son obligatorios",
          });
          return;
        }
  
        try {
          await this.$http.put(`/api/authors/${this.author.id}`, this.author);
          this.$swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Autor actualizado correctamente",
          });
          this.$emit("authorUpdated", this.author);
          this.$emit("closeModal");
        } catch (error) {
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo actualizar el autor",
          });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .z-50 {
    z-index: 50;
  }
  .bg-opacity-50 {
    background-color: rgba(0, 0, 0, 0.5);
  }
  </style>
  