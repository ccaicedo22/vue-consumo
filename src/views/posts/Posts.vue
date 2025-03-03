<template>
  <div class="p-6 bg-white shadow-md rounded-lg">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Lista de Blogs</h1>
      <button @click="showCreateModal = true" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        + Crear Post
      </button>
    </div>

    <input 
      v-model="search" 
      type="text" 
      placeholder="Buscar post..." 
      class="border p-2 rounded-lg mb-4 w-full"
    />

    <EasyDataTable
      :headers="headers"
      :items="posts"
      :loading="loading"
      :search-value="search"
      class="border rounded-lg"
    >
      <template #item-actions="{ id, title, author }">
        <div class="flex space-x-2">
          <button 
            @click="openEditModal({ id, title, author })" 
            class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
          >
            ✏️ Editar
          </button>

          <button 
            @click="deletePost(id)" 
            class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
          >
            🗑️ Eliminar
          </button>

          <button 
            @click="viewPost(id)" 
            class="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
          >
            👀 Ver
          </button>
        </div>
      </template>
    </EasyDataTable>

    <PostDetail
      :isVisible="showPostModal"
      :post="selectedPost"
      @close="closePostModal"
    />

    <CreatePost 
      v-if="showCreateModal" 
      @closeModal="showCreateModal = false" 
      @postCreated="addPost" 
      @refreshPosts="fetchPosts" 
    />

    <EditPost 
      v-if="showEditModal" 
      :postData="selectedPost" 
      @closeModal="showEditModal = false" 
      @postUpdated="updatePostInList" 
      @refreshPosts="fetchPosts" 
    />
  </div>
</template>

<script>
import CreatePost from "./CreatePost.vue";
import EditPost from "./EditPost.vue";
import PostDetail from "./PostDetail.vue";

export default {
  components: { CreatePost, EditPost, PostDetail },
  data() {
    return {
      posts: [],
      loading: false,
      search: "",
      showCreateModal: false,
      showEditModal: false,
      selectedPost: null,
      showPostModal: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "Título", value: "title" },
        { text: "Autor", value: "author", sortable: false },
        { text: "Acciones", value: "actions", sortable: false }
      ]
    };
  },
  methods: {
    async fetchPosts() {
      this.loading = true;
      try {
        const response = await this.$http.get("/api/posts");
        
        this.posts = Array.isArray(response.data.data) ? response.data.data.map(post => ({
          ...post,
          author: this.formatAuthor(post.author),
        })) : []; 
      } catch (error) {
        this.$swal.fire("Error", "No se pudieron cargar los posts", "error");
        this.posts = []; 
      } finally {
        this.loading = false;
      }
    },

    formatAuthor(author) {
      if (!author) {
        return 'Desconocido'; 
      }
      return `${author.first_name || ""} ${author.last_name || ""} ${author.middle_name || ""}`.trim();
    },

    addPost(post) {
      post.author = this.formatAuthor(post.author); 
      this.posts.push(post);
    },

    openEditModal(post) {
      this.showEditModal = false; 

      this.$http.get(`/api/posts/${post.id}`)
        .then(response => {
          if (response.data.status === 'success') {
            this.selectedPost = response.data.data;
            this.showEditModal = true;  
          } else {
            this.$swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo obtener el post.',
            });
          }
        })
        .catch(error => {
          console.error('Error al obtener el post:', error);
          this.$swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener el post. Intenta nuevamente.',
          });
        });
    },

    updatePostInList(updatedPost) {
      const index = this.posts.findIndex(p => p.id === updatedPost.id);
      if (index !== -1) {
        this.posts[index] = updatedPost;  
      }
    },


    async deletePost(id) {
      const confirmacion = await this.$swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el post permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6"
      });

      if (confirmacion.isConfirmed) {
        try {
          await this.$http.delete(`/api/posts/${id}`);
          this.posts = this.posts.filter(post => post.id !== id);
          this.$swal.fire("Eliminado", "El post ha sido eliminado.", "success");
        } catch (error) {
          this.$swal.fire("Error", "No se pudo eliminar el post", "error");
        }
      }
    },

    viewPost(id) {
      this.$http.get(`/api/posts/${id}`)
        .then(response => {
          if (response.data.status === 'success') {
            this.selectedPost = response.data.data;
            this.showPostModal = true;
          } else {
            this.$swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo obtener el post.',
            });
          }
        })
        .catch(error => {
          console.error('Error al obtener el post:', error);
          this.$swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener el post. Intenta nuevamente.',
          });
        });
    },
    closePostModal() {
      this.showPostModal = false;
    }

  },
  created() {
    this.fetchPosts();
  }
};
</script>
