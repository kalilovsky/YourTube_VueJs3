<template>
    <div class="body" v-if="allArticles.length>0">

    <CardsVue v-for="article in visibleArticles" :key="article.idArticle" :article="article"></CardsVue>
    
    </div>
    <div class="body" v-else>

    <p>En cours de chargement....</p>
    
    </div>
</template>

<script>
import CardsVue from '@/components/CardsVue.vue'
import DecodeEntity from "../utils/decodeHtml"
import store from "@/store/"

export default {
    props:["filter"],
    data(){
        return{
            allArticles : [],
            visibleArticles : [],
            numberVisibleArticles: 0
        }
    },
    components:{
        CardsVue
    },
    created() {
        this.getAllArticles();  
    },
    mounted(){
        window.addEventListener("scroll", this.handelScroll);
        
    },
    unmounted(){
        window.removeEventListener("scroll",this.handelScroll)
    },
    methods:{
        getAllArticles : async function () {
            const request = await fetch("http://localhost:3000/public/api/index.php?controller=ArticlesController&action=getallarticles")
            if (request.status !== 500) {
                const response = await request.json();
                this.allArticles= response;
                }
            },
        handelScroll(){
            if ((window.innerHeight + window.scrollY) > (document.body.offsetHeight) ){
                this.showArticles(this.numberVisibleArticles,this.numberVisibleArticles+9);
            }
        },
        showArticles(initial,max){
            let tempTable = [];
            
            if (max<=this.allArticles.length) {
                
                for(let i = initial; i< max ; i++){
                    
                    tempTable.push(this.allArticles[i]);
    
                }
                this.visibleArticles = [...this.visibleArticles,...tempTable];
                this.numberVisibleArticles = this.visibleArticles.length;
            }else if (max > this.allArticles.length) {
                
                if (initial<this.allArticles.length){
                    for(let i = initial; i< this.allArticles.length ; i++){
                    
                    tempTable.push(this.allArticles[i]);
    
                }
                this.visibleArticles = [...this.visibleArticles,...tempTable];
                this.numberVisibleArticles = this.visibleArticles.length;
                console.log("limite atteinte");
                }
                
            }
        },
        fixTags(){
            let tmpObj =""
            let test = []
            let test3 =[]
            tmpObj += this.allArticles.map(x=> x.tag.length>0?x.tag:"noTag")
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
    watch:{
        allArticles(){
            this.showArticles(0,18);
            this.fixTags();
        }
    }
}
</script>
