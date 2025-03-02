<template>
  <div class="p-6 bg-white shadow-md rounded-lg">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Lista de Autores</h1>
      <button @click="showCreateModal = true" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        + Crear Autor
      </button>
    </div>

    <input 
      v-model="search" 
      type="text" 
      placeholder="Buscar autor..." 
      class="border p-2 rounded-lg mb-4 w-full"
    />

    <EasyDataTable
      :headers="headers"
      :items="authors"
      :loading="loading"
      :search-value="search"
      class="border rounded-lg"
    >
      <template #item-actions="{ id, first_name, last_name }">
        <div class="flex space-x-2">
          <button 
            @click="openEditModal({ id, first_name, last_name })" 
            class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
          >
            ✏️ Editar
          </button>

          <button 
            @click="deleteAuthor(id)" 
            class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
          >
            🗑️ Eliminar
          </button>
        </div>
      </template>
    </EasyDataTable>

    <CreateAuthor 
      v-if="showCreateModal" 
      @closeModal="showCreateModal = false" 
      @authorCreated="addAuthor" 
      @refreshAuthors="fetchAuthors" 
    />

    <EditAuthor 
      v-if="showEditModal" 
      :authorData="selectedAuthor" 
      @closeModal="showEditModal = false" 
      @authorUpdated="updateAuthorInList" 
    />
  </div>
</template>

<script>
import CreateAuthor from "./CreateAuthor.vue";
import EditAuthor from "./EditAuthor.vue";

export default {
  components: { CreateAuthor, EditAuthor },
  data() {
    return {
      authors: [],
      loading: false,
      search: "",
      showCreateModal: false,
      showEditModal: false,
      selectedAuthor: null,
      headers: [
        { text: "ID", value: "id" },
        { text: "Nombres", value: "first_name" },
        { text: "Apellidos", value: "last_name" },
        { text: "Acciones", value: "actions", sortable: false }
      ]
    };
  },
  methods: {
    async fetchAuthors() {
      this.loading = true;
      try {
        const response = await this.$http.get("/api/authors");
        this.authors = Array.isArray(response.data.data) ? response.data.data : []; 
      } catch (error) {
        this.$swal.fire("Error", "No se pudieron cargar los autores", "error");
        this.authors = []; 
      } finally {
        this.loading = false;
      }
    },

    addAuthor(author) {
      this.authors.push(author);
    },

    openEditModal(author) {
      this.selectedAuthor = { ...author };
      this.showEditModal = true;
    },

    updateAuthorInList(updatedAuthor) {
      const index = this.authors.findIndex(a => a.id === updatedAuthor.id);
      if (index !== -1) {
        this.authors[index] = updatedAuthor;
      }
    },

    async deleteAuthor(id) {
      const confirmacion = await this.$swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el autor permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6"
      });

      if (confirmacion.isConfirmed) {
        try {
          await this.$http.delete(`/api/authors/${id}`);
          this.authors = this.authors.filter(author => author.id !== id);
          this.$swal.fire("Eliminado", "El autor ha sido eliminado.", "success");
        } catch (error) {
          this.$swal.fire("Error", "No se pudo eliminar el autor", "error");
        }
      }
    }
  },
  created() {
    this.fetchAuthors();
  }
};
</script>
