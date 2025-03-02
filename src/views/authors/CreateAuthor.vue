<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96 relative z-50">
      <h2 class="text-xl font-bold mb-4">Crear Autor</h2>

      <form @submit.prevent="createAuthor">
        <input 
          v-model="author.first_name" 
          type="text" 
          placeholder="Nombres" 
          class="border p-2 rounded-lg mb-2 w-full"
          required
        />

        <input 
          v-model="author.last_name" 
          type="text" 
          placeholder="Apellidos" 
          class="border p-2 rounded-lg mb-4 w-full"
          required
        />

        <div class="flex justify-end space-x-2">
          <button type="button" @click="$emit('closeModal')" class="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">
            Cancelar
          </button>
          <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Crear
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      author: { first_name: "", last_name: "" },
    };
  },
  methods: {
    async createAuthor() {
      try {
        const response = await this.$http.post("/api/authors", this.author);
        this.$emit("authorCreated", response.data);

        this.$swal.fire({
          title: "Éxito",
          text: "Autor creado correctamente",
          icon: "success",
        });

        this.$emit("closeModal");
        this.$emit("refreshAuthors");
      } catch (error) {
        this.$swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo crear el autor",
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
