<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-[600px] relative z-50">
            <h2 class="text-xl font-bold text-center mb-4">Crear Post</h2>

            <form @submit.prevent="createPost" enctype="multipart/form-data">
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <input 
                        v-model="post.title" 
                        type="text" 
                        placeholder="Título del Post" 
                        class="border p-2 rounded-lg w-full"
                        required
                    />

                    <v-select
                        v-model="post.author_id"
                        :options="authors"
                        label="name"
                        :reduce="author => author.id" 
                        placeholder="Selecciona un autor"
                        class="border p-2 rounded-lg w-full"
                    />
                </div>

                <textarea
                    v-model="post.content" 
                    placeholder="Contenido del post..." 
                    class="border p-2 rounded-lg w-full h-32 text-gray-500"
                    required
                ></textarea>

                <div class="mt-4">
                    <label class="border p-2 rounded-lg block w-full text-center cursor-pointer">
                        Seleccionar archivo {{ imageName || "" }}
                        <input 
                            type="file" 
                            @change="handleImageUpload" 
                            class="hidden"
                        />
                    </label>
                </div>

                <div v-if="imagePreview" class="flex justify-center mt-4">
                    <img :src="imagePreview" alt="Imagen Previa" class="w-60 h-auto rounded-lg shadow" />
                </div>

                <div class="flex justify-end space-x-2 mt-4">
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
        post: {
            title: "",
            content: "",
            author_id: null,
            image: null,
        },
        imagePreview: null,
        authors: [],  
        };
    },
    methods: {
        
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.post.image = file;
                this.imagePreview = URL.createObjectURL(file); 
            }
        },

        async createPost() {
            const formData = new FormData();
            formData.append('title', this.post.title);
            formData.append('content', this.post.content);
            formData.append('author_id', this.post.author_id);

            if (this.post.image) {
            formData.append('file', this.post.image);
            }
            console.log(this.post.image);
            try {
                const response = await this.$http.post('/api/posts', formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.status === 'success') {
                    this.$emit('postCreated', response.data.data);

                    this.$swal.fire({
                    title: 'Éxito',
                    text: 'Post creado correctamente',
                    icon: 'success',
                    });

                    this.$emit('closeModal');
                    this.$emit('refreshPosts');
                } else {
                    
                    this.$swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo crear el post.',
                    });
                }
            } catch (error) {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo crear el post. Intenta nuevamente.',
                });
            }
        },

        async fetchAuthors() {
            try {
                const response = await this.$http.get('/api/authors');
                this.authors = response.data.data.map(author => ({
                    id: author.id,
                    name: `${author.first_name} ${author.last_name}`,
                }));
            } catch (error) {
                console.error('Error al obtener los autores:', error);
            }
        },
    },

    created() {
        this.fetchAuthors();  
    },
};
</script>

<style scoped>

.v-select {
width: 100%;
}

.z-50 {
z-index: 50;
}

.bg-opacity-50 {
background-color: rgba(0, 0, 0, 0.5);
}

textarea {
resize: vertical;
}

img {
object-fit: cover;
}
</style>