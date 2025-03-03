<template>
    <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl relative">
        <h2 class="text-2xl font-bold text-center mb-4">{{ post.title }}</h2>

            <div class="flex mb-4">
                <div class="text-justify overflow-y-auto max-h-96 flex-1 pr-4">
                <p class="text-lg">{{ post.content }}</p>
                </div>

                <div class="w-40 ml-6 flex flex-col items-center justify-start">
                <img 
                    v-if="post.image" 
                    :src="post.image" 
                    alt="Imagen del post" 
                    class="w-32 h-32 object-cover rounded-lg mb-2" 
                />
                <p class="text-sm text-gray-600 text-center break-words">
                    {{ post.author.first_name }} {{ post.author.last_name }}
                </p>
                </div>
            </div>

            <footer class="flex justify-end mt-4">
                <button 
                @click="closeModal"
                class="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                Cerrar
                </button>
            </footer>
        </div>
    </div>
</template>
    
<script>
    export default {
        props: {
            isVisible: {
            type: Boolean,
            default: false
            },
            post: {
            type: Object,
            default: () => ({
                title: '',
                content: '',
                author: {
                first_name: '',
                last_name: ''
                },
                image: ''
            })
            }
        },
        methods: {
            closeModal() {
            this.$emit('close');
            }
        }
    };
</script>
    
<style scoped>

.bg-white {
min-height: 300px; 
display: flex;
flex-direction: column;
}

.flex {
display: flex;
align-items: flex-start; 
}

.flex-1 {
flex: 1;
display: flex;
flex-direction: column;
justify-content: flex-start; 
}

.text-justify {
text-align: justify;
display: block;
margin-bottom: 1rem; 
}

h2 {
margin-bottom: 10px; 
}

footer {
margin-top: auto; 
}

footer .flex {
justify-content: flex-end; 
}

.fixed {
display: flex;
justify-content: center;
align-items: center;
z-index: 50;
}

.w-40 {
width: 160px;
}

</style>