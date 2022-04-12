<template>
<!-- onMouseOver={handleMouseIn} onMouseLeave={handleMouseOut} -->
          <div class="cardsMain"  >
            <router-link to="/"></router-link>
            <div class="imgArticle">
            <span>{{article.fileType}}</span>
            <video v-if="article.fileType==='video'" :src="'http://localhost:3000/public/articlefile/'+article.filePath" loop muted /> 
            <img v-else :src="'http://localhost:3000/public/articlefile/'+article.filePath" alt="l'article">
            </div>
            <div class="imgUser">
            <img :src="'http://localhost:3000/public/userprofile/'+article.profilPhoto" alt="user">
                
                <div class="resume">
                    <p class="title">{{ DecodeEntityLoc(article.title)}}</p>
                    <p class="submitter">{{article.pseudo +" | Catégorie : "+ article.categorieName}}</p>
                    <p class="viewed">{{article.viewCount +" Vues  | Tag :" +DecodeEntityLoc(article.tag) }}</p>
                </div>
                
            </div>
        </div>
</template>

<script>
import DecodeEntity from "../utils/decodeHtml"
export default {
    data(){
        return{
            fileType : "video"
        }
    },
    props : ['article'],
    methods:{
        DecodeEntityLoc(text){
            return DecodeEntity(text)
        }
    }
}
</script>

<style lang="scss">
    @import "../styles/components/CardsVue.scss";
</style>