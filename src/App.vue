<template>
    <AppHeader />
    <router-view/>
    
</template>


<script>
import AppHeader from "./components/AppHeader.vue";
export default {
  components:{
    AppHeader,
    
  },
  data(){
    return({
      filter : {
        filterByText :"",
        filterByTag :"",
        filterByView :"",
        filterByType :"",
        filterByDate :"",
        filterByCategory :"",
      }
      })
  }
}
</script>
    <style lang="scss">
    
    </style>
