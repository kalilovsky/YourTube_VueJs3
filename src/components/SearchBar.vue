<template>
  <div className="input-group rounded">
            <div className="form-outline">
                <input name="wordSearch" value="" type="search" id="wordSearchInput" className="form-control" placeholder="Search"/>
            </div>
            <button type="button" className="btn" style="borderColor : #ced4da" onClick={handelWordSearch}>
              
                <img class="searchIcon" src="../assets/search-icon.svg"  alt="test">
            </button>
        </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    .searchIcon{
        width: 20px;
    }
</style>