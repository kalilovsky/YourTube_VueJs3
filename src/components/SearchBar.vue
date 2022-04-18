<template>
  <div class="input-group rounded">
            <div class="form-outline">
                <input name="wordSearch" v-model="textSearch" type="search" id="wordSearchInput" class="form-control" placeholder="Search" @input="$emit('searchTextChange',textSearch)"/>
            </div>
            <button type="button" class="btn" style="borderColor : #ced4da" @click.prevent="this.$router.push({name:'searchView'})">
              
                <img class="searchIcon" src="../assets/search-icon.svg"  alt="test">
            </button>
        </div>
</template>

<script>
export default {
    props:['filter'],
    data(){
        return({
            textSearch :"",
        })
    }

}
</script>

<style lang="scss">
    .searchIcon{
        width: 20px;
    }
</style>