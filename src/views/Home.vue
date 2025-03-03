<template>
    <div class="container">
    <h2 class="title">Blogs</h2>
        <div class="grid">
            <div v-for="post in posts" :key="post.id" class="card" @click="viewPost(post.id)">
                <img :src="post.image || 'default_image.jpg'" alt="Imagen del post" class="card-image" />
                <div class="card-content">
                    <h4 class="card-title">{{ post.title }}</h4>
                </div>
            </div>
        </div>

        <PostDetailModal 
        v-if="showPostModal" 
        :post="selectedPost" 
        :isVisible="showPostModal" 
        @close="showPostModal = false"
        />
    </div>
</template>
    
<script setup>
import { ref, onMounted } from 'vue';
import api from '../plugins/axios';
import PostDetailModal from './PostDetailModal.vue';

const posts = ref([]);
const selectedPost = ref(null);
const showPostModal = ref(false);

const fetchPosts = async () => {
try {
    const response = await api.get("/api/public");
    posts.value = response.data.data || [];
} catch (error) {
    console.error("Error al cargar los posts:", error);
    alert("Error: No se pudieron cargar los posts.");
}
};

const viewPost = async (id) => {
try {
    const response = await api.get(`/api/public/${id}`);
    if (response.data.status === 'success') {
    selectedPost.value = response.data.data;
    showPostModal.value = true;
    } else {
    alert("Error: No se pudo obtener el post.");
    }
} catch (error) {
    console.error("Error al obtener el post:", error);
    alert("Error: No se pudo obtener el post. Intenta nuevamente.");
}
};

onMounted(fetchPosts);
</script>
    
<style scoped>

html, body {
height: 100%;
margin: 0;
padding: 0;
background-color: gainsboro;
}

.container {
display: flex;
flex-direction: column;
align-items: center;
min-height: 100vh;
width: 100%;    
padding: 20px;
}

.title {
text-align: center;
font-size: 24px;
font-weight: bold;
margin-bottom: 20px;
color: #333;
}

.grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 20px;
width: 100%;
max-width: 1200px;
justify-content: center;
}

.card {
background-color: gainsboro;
border-radius: 10px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
padding: 16px;
text-align: center;
transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
cursor: pointer;
}

.card:hover {
transform: scale(1.05);
box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}

.card-image {
width: 100%;
height: 180px;
object-fit: cover;
border-radius: 8px;
transition: filter 0.3s ease-in-out;
}

.card:hover .card-image {
filter: brightness(0.9);
}

.card-content {
padding: 10px 0;
}

.card-title {
font-size: 18px;
font-weight: bold;
color: #333;
margin-top: 10px;
}
</style>
