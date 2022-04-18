<template>
    <header>
        <nav>
            <ul class="list">
                <li>
                    <router-link to="/" class="gauche">
                        <span class="icon">
                            <img src="../assets/youtube-logo.svg" alt="logo">
                        </span>
                    </router-link>
                </li>
                <li>
                    <search-bar :filter="filter" @searchTextChange="searchTextChange">ss</search-bar>
                </li>
                <li>
                    <div class="droite" @click="toggleScrollMenu">
                        <span class="icon">
                            <img src="../assets/caret-down-solid.svg" class="downFleche" alt="boutonmenuderoulant">
                        </span>
                        <span class="titre">My Account</span>
                    </div>
                </li>
            </ul>
            <div class="tagSection">
                <ul class="list">
                    <li v-for="(tag ,index) in myTags" :key="index" @click="updateTagFilter">{{tag}}</li>
                </ul>
            </div>
        </nav>
        <ScrollMenu :active="toggleScrollMenu" ref="testtest"></ScrollMenu>
        <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne"
                        @click="handelFilterAccordion">
                        Filtres
                    </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <form @submit.prevent="updateSearchParams" >
                            <ul>
                                <p>Trier par Type</p>
                                <select name="fileType" v-model="filter.fileType" @change="updateSearchParams">
                                    <option>Tous</option>
                                    <option>Video</option>
                                    <option>Image</option>
                                </select>
                            </ul>
                            <ul>
                                <p>Par Catégories</p>
                                <select name="idCategory" v-model="filter.idCategory"
                                    v-if="categories.length > 0" @change="updateSearchParams">
                                    <option value="0">Tous</option>
                                    <option v-for="category in categories" :key="category.idCategorie"
                                        :value="category.idCategorie">
                                        {{ category.categorieName }}
                                    </option>
                                </select>
                                <select name="idCategory" value="En cours de chargement..." v-else>
                                    <option>En cours de chargement...</option>
                                </select>

                            </ul>
                            <ul>
                                <p>Par Date</p>
                                <select name="creationDate" v-model="filter.creationDate" @change="updateSearchParams">
                                    <option value="0">Pas de tri</option>
                                    <option value="ASC">Ascendant</option>
                                    <option value="DESC">Descendant</option>
                                </select>
                            </ul>
                            <ul>
                                <p>Par Vues</p>
                                <select name="views" v-model="filter.viewCount" @change="updateSearchParams">
                                    <option value="0">Pas de tri</option>
                                    <option value="ASC">Ascendant</option>
                                    <option value="DESC">Descendant</option>
                                </select>
                            </ul>
                            <ul>
                                <button type="submit" class="btn btn-primary">
                                    Recherche
                                </button>
                                <button type="button" class="btn btn-primary" @click="resetForm">Reset</button>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </header>
</template>

<script>
import SearchBar from './SearchBar.vue';
import ScrollMenu from './ScrollMenu.vue'
import Collapse from 'bootstrap/js/dist/collapse';
import store from "@/store/"
export default {
    data() {
        return {
            toggleFilter: false,
            categories: {},
            filter: {
                filterByText: "",
                filterByTag: "",
                viewCount: "0",
                fileType: "Tous",
                creationDate: "0",
                idCategory: "0",
            }
        }
    },
    components: {
        SearchBar,
        ScrollMenu
    },
    methods: {
        toggleScrollMenu(){
            store.state.scrollMenuVisibility.classList.toggle("active");
        },
        handelFilterAccordion() {
            this.toggleFilter = !this.toggleFilter;
        },
        getAllCategories: async function () {
            const request = await fetch("http://localhost:3000/index.php?controller=ArticlesController&action=getallcategories")
            if (request.status !== 500) {
                const response = await request.json();
                this.categories = response;
            }
        },
        updateSearchParams(){
            this.$router.push({name:'searchView'});
        },
        searchTextChange(value){
            this.filter.filterByText = value ;
            this.$router.push({name:'searchView'});
        },
        updateTagFilter(e){
            this.filter.filterByTag = e.target.innerHTML;
            this.$router.push({name:'searchView'});
        },
        resetForm(){
            this.filter = {
                filterByText: "",
                filterByTag: "",
                viewCount: "0",
                fileType: "Tous",
                creationDate: "0",
                idCategory: "0",
            }
        },
        inputChange(){

        },

    },
    watch: {
        toggleFilter() {
            let myCollapse = document.getElementById("flush-collapseOne");
            let bsCollapse = new Collapse(myCollapse, { toggle: this.toggleFilter });
            this.toggleFilter ? bsCollapse.show() : bsCollapse.hide();
        },
        filter:{
            handler(){
                store.commit({type :'updateFilterCritera', filter : this.filter});
            },
            deep : true,
        },
    },
    created() {
        this.getAllCategories();
    },
    mounted(){
        store.commit({type :'updateFilterCritera', filter : this.filter});
    },
    computed:{
        myTags(){
            return store.state.myTags;
        },
    },
}
</script>
<style lang="scss">
@import "../styles/components/AppHeader.scss";
</style>
