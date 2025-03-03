<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="modal-container">
      <h2 class="modal-title">{{ post.title }}</h2>

      <div class="modal-content">
        <div class="modal-text">
          <p class="text-lg">{{ post.content }}</p>
        </div>

        <div class="modal-author">
          <img v-if="post.image" :src="post.image" alt="Imagen del post" class="author-image" />
          <p class="author-name">{{ post.author?.first_name }} {{ post.author?.last_name }}</p>
        </div>
      </div>

      <footer class="modal-footer">
        <button @click="$emit('close')" class="close-button">Cerrar</button>
      </footer>
    </div>
  </div>
</template>
  
<script setup>
  defineProps({
    isVisible: Boolean,
    post: Object
  });
</script>

<style scoped>

.modal-container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
  position: relative;
  text-align: center;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.modal-content {
  display: flex;
  justify-content: space-between;
  align-items: start;
  text-align: left;
  max-height: 400px;
  overflow-y: auto;
}

.modal-text {
  flex: 1;
  padding-right: 15px;
  text-align: justify;
}

.modal-author {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
}

.author-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 5px;
}

.author-name {
  font-size: 14px;
  color: #666;
  text-align: center;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.close-button {
  background-color: gray;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.close-button:hover {
  background-color: darkgray;
}
</style>
