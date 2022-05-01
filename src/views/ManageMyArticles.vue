<template>
    <div class="manageArticles" v-if="idUser !== 'Disconnected'">
        <cards-search v-for="article in myArticles" :key="article.idArticle" :article="article">
            <div class="editBtn">
                <button type="button" :name="article.idArticle" class="btn btn-danger"
                    @click="deleteArticle">Delete</button>
            </div>
        </cards-search>
    </div>
    <div class="manageArticles" v-else>
        <p>Page restreinte au membres connectés, veuillez vous connectez SVP!</p>
    </div>

</template>

<script>
import CardsSearch from "@/components/CardsSearch.vue"
import store from '@/store'
export default {
    data() {
        return ({
            idUser: undefined,
            myArticles: {},
        })
    },
    components: {
        CardsSearch,
    },
    created() {
        if (store.state.userInfo.isConnected) {
            this.idUser = store.state.userInfo.idUser;
            this.getArticleByUserId();
        } else {
            this.idUser = "Disconnected";
        }
        this.unsubscribe = store.subscribe((mutation) => {
            if (mutation.type === "updateUserInfo") {
                store.state.userInfo.isConnected ? this.idUser = store.state.userInfo.idUser : this.idUser = "Disconnected";
            }
        })
    },
    methods: {
        getArticleByUserId() {
            let options = {
                method: "post",
                credentials: "include",
            };
            fetch("http://localhost:3000/index.php?controller=ArticlesController&action=getArticleByUserId&idUser=" + this.idUser, options)
                .then(request => request.json())
                .then(response => {
                    if (response !== "Not Authorised.") {
                        this.myArticles = response;
                    } else {
                        store.commit({ type: "updateUserInfo", userInfo: { isConnected: false } })
                    }

                })

        },
        deleteArticle: async function (e) {
            let options = {
                method: "post",
                credentials: "include",
            };
            let idArticle = e.target.name;
            const request = await fetch("http://localhost:3000/index.php?controller=ArticlesController&action=deleteArticle&idArticle=" + idArticle, options)
            if (request.status !== 500) {
                const response = await request.json();
                if (response !== "Not Authorised." || response !== "problem detected") {
                    this.getArticleByUserId();
                } else {
                    store.commit({ type: "updateUserInfo", userInfo: { isConnected: false } })
                }
            }
        },

    },
    beforeUnmount() {
        this.unsubscribe();
    },
    watch: {
        idUser() {
            if (this.idUser !== 'Disconnected') {
                this.getArticleByUserId();
            }
        }
    }
}
</script>

<style lang="scss">
.manageArticles {
    top: 150px;
}
</style>