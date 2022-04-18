<template>
  <div class="cardsMain" v-if="Object.keys(currentArticle).length>0" >
        
        <div class="imgArticle">
            <video v-if="currentArticle.fileType==='video'" :src="'http://localhost:3000/public/articlefile/'+currentArticle.filePath" controls /> 
            <img v-else :src="'http://localhost:3000/public/articlefile/'+currentArticle.filePath" alt="l'article">
        </div>
        <div class="imgUser">
        <img :src="'http://localhost:3000/public/userprofile/'+currentArticle.profilPhoto" alt="user">
            
            <div class="resume">
                <p class="title">{{DecodeEntityLoc(currentArticle.title)}}</p>
                <p class="submitter">{{currentArticle.pseudo +" | Catégorie : "+ currentArticle.categorieName}}</p>
                <p class="viewed">{{currentArticle.viewCount +" Vues  | Tag :" +currentArticle.tag }}</p>
                <p class="viewed">Description :</p>
                <p class="viewed">{{ DecodeEntityLoc(currentArticle.smallDesc)}}</p>
            </div>
            
        </div>
    </div>
    <div class="cardsMain" v-else>
        <p>Erreur article non chargé</p>
    </div>
</template>

<script>
import DecodeEntity from "../utils/decodeHtml"
export default {
    props:['id'],
    data(){
        return{
            currentArticle : {},
            idArticle : null
        }
    },
    methods:{
        DecodeEntityLoc(text){
            return DecodeEntity(text)
        },
        getArticleById : async function (idArticle) {
            const request = await fetch("http://localhost:3000/index.php?controller=ArticlesController&action=getarticlebyid&id="+idArticle)
            if (request.status !== 500) {
                const response = await request.json();
                this.currentArticle= {...response[0]};
                }
            },
    },
    created() {
        this.getArticleById(this.id);
        this.idArticle =this.id;
    },

}
</script>

<style lang="scss">
    @import "../styles/views/ArticleView.scss"
</style>