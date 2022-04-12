<template>
    <div class="body" v-if="allArticles.length>0">

    <CardsVue v-for="article in allArticles" :key="article.idArticle" :article="article"></CardsVue>
    
    </div>
    <div class="body" v-else>

    <p>En cours de chargement....</p>
    
    </div>
</template>

<script>
import CardsVue from '@/components/CardsVue.vue'


export default {
    data(){
        return{
            allArticles : []
        }
    },
    components:{
        CardsVue
    },
    created() {
        this.getAllArticles();  
    },
    methods:{
        getAllArticles : async function () {
        const request = await fetch("http://localhost:3000/index.php?controller=ArticlesController&action=getallarticles")
        if (request.status !== 500) {
        const response = await request.json();
        this.allArticles= response;
        }
        }
    }
}
</script>
