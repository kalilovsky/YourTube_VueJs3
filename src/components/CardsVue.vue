<template>
    <!-- onMouseOver={handleMouseIn} onMouseLeave={handleMouseOut} -->
    <div class="cardsMain" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
        <router-link :to="'/article/' + this.article.idArticle"></router-link>
        <div class="imgArticle">
            <span>{{ article.fileType }}</span>
            <video v-if="article.fileType === 'video'" ref="videoElement"
                :src="'http://localhost:3000/public/articlefile/' + article.filePath" loop muted />
            <img v-else :src="'http://localhost:3000/public/articlefile/' + article.filePath" alt="l'article">
        </div>
        <div class="imgUser">
            <img :src="'http://localhost:3000/public/userprofile/' + article.profilPhoto" alt="user">
            <div class="resume">
                <p class="title">{{ DecodeEntityLoc(article.title) }}</p>
                <p class="submitter">{{ article.pseudo + " | Catégorie : " + article.categorieName }}</p>
                <p class="viewed">{{ article.viewCount + " Vues | Tag :" + DecodeEntityLoc(article.tag) }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import DecodeEntity from "../utils/decodeHtml"
export default {
    data() {
        return {
            showedCards: 9
        }
    },
    props: ['article'],
    methods: {
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
        }

    }
}
</script>

<style lang="scss">
@import "../styles/components/CardsVue.scss";
</style>