<template>
  <div class="scrollMenu" :class="{active:scrollVisibility}" ref="scrollMenu"  >
        <ul v-if="userInfo.isConnected" @click="toggleScrollMenu">
            <li>
                <router-link to="/">Acceuil</router-link></li>
            <li>
                <router-link to="/managearticles/">Mon Contenu</router-link>
            </li>
            <li>
                <router-link to="/search/">Page de recherche</router-link>
            </li>
            <li>
                <router-link to="/editmyprofile/">My Account</router-link>
            </li>
            <li>
                <router-link to="/addnewarticlepage/">Add post</router-link>
            </li>
            <li>
                <p @click="disconnect">Déconnecter</p>
            </li>
        </ul>
        <form action="#" method="GET" class="formLogin" @submit.prevent="handelSubmit" @click="toggleScrollMenu" v-else>
                <div class="email">
                    <label for="email">Email</label>
                    <input type="email" name="email" placeholder="Email" required />
                </div>
                <div class="pwd">
                    <label for="pwd">Mot de passe</label>
                    <input type="password" name="pwd" placeholder="Mot de passe" required />
                    <input type="hidden" name="controller" value="userscontroller" />
                </div>
                <div class="button">
                    <button name="action" value="login">Login</button>
                </div>
            <div>
                <p>
                    <router-link to='/registerpage/'>Register now!</router-link>
                </p>
            </div>
            </form>
    </div>
    
</template>

<script>
import store from '@/store';
export default {
    props:['active'],
    data(){
        return{
            userInfo:{
                isConnected : false
            },
            scrollVisibility : false

        }
    },
    methods: {
        toggleScrollMenu(){
            // store.state.scrollMenuVisibility.classList.toggle("active");
            this.scrollVisibility = !this.scrollVisibility;
        },
        handelSubmit(e){
            // this.userInfo.connected = !this.userInfo.connected
            let formData = new FormData(e.target);
            formData.append("controller", "UsersController");
            formData.append("action", "login");
            let options = {
                method: "post",
                credentials: "include",
                body: formData
            };
            fetch("http://localhost:3000/public/api/index.php", options)
                .then(data => data.json())
                .then(data => {
                    if (!data.isConnected) {
                        this.userInfo = data;
                    } else {
                        this.userInfo = data;
                    }
                    // store.commit({type : "setScroll", scroll : this.$refs.scrollMenu})
                })
                .catch((error)=>{
                    console.log(error.message);
                });
        },
        disconnect(){
            let options = {
                method: "get",
                credentials: "include",
            };
            fetch("http://localhost:3000/public/api/index.php?controller=UsersController&action=disconnect", options)
            .then(data=>data.text())
            .then(response=>{
                if(response==="disconnected"){
                    this.userInfo = {
                    isConnected : false
                }
                // store.commit({type : "setScroll", scroll : this.$refs.scrollMenu})
                }
            })
        },
        readCookie(){
            //récupération des donnés session eventuelles de l'utilisateur.
            let cookieInfo = decodeURIComponent(document.cookie).split(";");
            let userInfoTmp = { isConnected: false };
            for (let i = 0; i < cookieInfo.length; i++) {
            let c = cookieInfo[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf("userInfo=") === 0) {
                userInfoTmp = JSON.parse(c.substring("userInfo=".length, c.length));
            }
            }
            if (Object.keys(userInfoTmp).length === 0) {
            userInfoTmp = { isConnected: false }
            }
            this.userInfo = userInfoTmp;
        },
    },
    watch:{
        active(){
            this.scrollVisibility = this.active; 
        },
        userInfo(){
            store.commit({type : "updateUserInfo", userInfo : this.userInfo})
        }
    },
    beforeMount(){
        this.readCookie();
    },
    // mounted(){
    //     store.commit({type : "setScrollVisibility", scroll : this.$refs.scrollMenu})
    // }
}
</script>

<style lang="scss">
    @import "../styles/components/ScrollMenu.scss";
</style>