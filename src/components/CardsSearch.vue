<template>
  <div class="cardsManager" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
        <router-link :to="'/article/' + this.article.idArticle" ></router-link>
            <div class="imgArticle">
                <span>{{ article.fileType}}</span>
               <video v-if="article.fileType==='video'" ref="videoElement" :src="'http://localhost:3000/public/articlefile/'+article.filePath" loop muted /> 
               <img v-else :src="'http://localhost:3000/public/articlefile/'+article.filePath" alt="l'article">
            </div>
            <div class="imgUser">
                <div class="resume">
                    <p class="title">{{ DecodeEntityLoc(article.title)}}</p>
                    <p class="viewed">{{article.viewCount +" Vues"}}</p>
                </div>
                <div class="otherDetail">
                    <img :src="'http://localhost:3000/public/userprofile/'+article.profilPhoto" alt="test">
                    <p class="submitter">{{article.pseudo}}</p>
                    <p>&#8226;</p>
                    <p>{{article.categorieName}}</p>
                    <p>&#8226;</p>
                </div>
                <div class="description">
                    <p class="smallDesc">{{ DecodeEntityLoc(article.smallDesc)}} </p>
                    <p>{{"Tag : "+ DecodeEntityLoc(article.tag)}}</p>
                </div>
            </div>
            
        </div>
</template>

<script>
import DecodeEntity from "../utils/decodeHtml"
export default {
    props:["article"],
    methods:{
        DecodeEntityLoc(text) {
            return DecodeEntity(text)
        },
        handleMouseOver() {
            if (this.$refs.videoElement !== undefined) {
                let play = this.$refs.videoElement.play();
                if (play !== undefined) {
                    play.then(() => {

                    }).catch((e) => {
                        console.log(e);
                    })
                }
            }
        },
        handleMouseLeave() {
            if (this.$refs.videoElement !== undefined) {

                this.$refs.videoElement.pause();
            }
        },
    },
}
</script>

<style lang="scss">
@import "../styles/components/CardsSearch.scss";
</style>