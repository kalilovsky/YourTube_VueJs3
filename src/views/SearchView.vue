<template>
    <div class="manageArticles">
        <div class="body" v-if="filtredArticles.length > 0">
            <CardsSearch v-for="article in filtredArticles" :key="article.idArticle" :article="article"></CardsSearch>
        </div>
        <div class="body" v-else>
            <p>en cours de chargement</p>
        </div>
    </div>
</template>

<script>
import CardsSearch from "@/components/CardsSearch.vue"
import store from "@/store/"
import DecodeEntity from "../utils/decodeHtml"
export default {
    data() {
        return ({
            filtredArticles: {},
            filter :{}
        })
    },
    components: {
        CardsSearch
    },
    created() {
        this.getFiltredArticles();
        this.unsubscribe = store.subscribe((mutation)=>{
            console.log("updateFilterCritera");
            if(mutation.type === "updateFilterCritera"){
                this.getFiltredArticles();
            }
        })
    },
    methods: {
        getFiltredArticles: async function () {
            const url = new URL("./api/index.php?controller=ArticlesController&action=searchArticles")
            if(store.state.filterCriteria.filterByText!==""){
                url.searchParams.append('text',store.state.filterCriteria.filterByText )
            }
            if(store.state.filterCriteria.filterByTag!==""){
                url.searchParams.append('tags',store.state.filterCriteria.filterByTag)
            }
            if(store.state.filterCriteria.fileType!=="Tous"){
                url.searchParams.append('fileType',store.state.filterCriteria.fileType)
            }
            if(store.state.filterCriteria.idCategory!=="0"){
                url.searchParams.append('idCategory',store.state.filterCriteria.idCategory)
            }
            if(store.state.filterCriteria.creationDate!=="0"){
                url.searchParams.append('creationDate',store.state.filterCriteria.creationDate)
            }
             if(store.state.filterCriteria.viewCount!=="0"){
                url.searchParams.append('viewCount',store.state.filterCriteria.viewCount)
            }
            const request = await fetch(url)
            if (request.status !== 500) {
                const response = await request.json();
                this.filtredArticles = response;
            }
        },
        fixTags(){
            let tmpObj =""
            let test = []
            let test3 =[]
            tmpObj += this.filtredArticles.map(x=> x.tag.length>0?x.tag:"noTag")
            tmpObj = this.DecodeEntityLoc(tmpObj)
            tmpObj = tmpObj.replaceAll(";"," ")
            tmpObj = tmpObj.replaceAll(","," ")
            tmpObj = tmpObj.replaceAll("  "," ")
            let tmp = tmpObj.split(' ')
            const countOccurrences = (arr, val) =>{
            return arr.reduce((a, v) =>{
                    if (v===val){
                        return test[val] = a+1
                    } else {
                        return test[val] = a
                    }
                }, 0);
            }
            let tagCount = [...tmp.map(x=>{
                return countOccurrences(tmp,x);
            })]
            tagCount = null;
            console.log(tagCount);
            let keys = Object.keys(test);
            let test2 = keys.sort((a,b)=>-test[a]+test[b]);
            
            for (let i = 0; i<18;i++){
                test3[test2[i]] = test[test2[i]]
            }
            store.commit({type : "updateMyTags", myTags : test3});
        },
        DecodeEntityLoc(text) {
            return DecodeEntity(text)
        },
    },
    beforeUnmount() {
        this.unsubscribe();
    },
    watch:{
        filtredArticles(){
            this.fixTags();
        }
    }
}
</script>

<style>
</style>