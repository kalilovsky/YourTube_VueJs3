<template>
  <header>
      <nav>
          <ul>
              <li>
                  <router-link to="/" class="gauche">
                    <span class="icon">  
                        <img src="../assets/youtube-logo.svg" alt="logo">
                    </span>
                  </router-link>
              </li>
              <li>
                  <search-bar>ss</search-bar>
              </li>
              <li>
                  <div class="droite">
                      <span class="icon">
                          <img src="../assets/caret-down-solid.svg" class="downFleche" alt="boutonmenuderoulant">
                      </span>
                      <span class="titre">test</span>
                  </div>
              </li>
          </ul>
          <div class="tagSection">
              <ul>
                  <li>tag1</li>
                  <li>tag2</li>
                  <li>tag3</li>
                  <li>tag4</li>
              </ul>
          </div>
      </nav>
          <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne" @click="handelFilterAccordion">
                        Filtres
                    </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body"> 
                                <form>
                                    <ul>
                                    <p>Trier par Type</p>
                                    <select name="fileType" value="tous">
                                        <option>Tous</option>
                                        <option>Video</option>
                                        <option>Image</option>
                                    </select>
                                    </ul>
                                    <ul>
                            <p>Par Catégories</p>
                            <select name="idCategory" value="tous">
                                <option>Tous</option>
                                <option>Tous</option>
                                <option>Tous</option>
                                
                            </select>
                        </ul>
                        <ul>
                            <p>Par Date</p>
                            <select name="creationDate" value="Ascendant">
                                <option>Ascendant</option>
                                <option>Descendant</option>
                            </select>
                        </ul>
                        <ul>
                            <p>Par Vues</p>
                            <select name="author" value="Ascendant">
                                <option>Ascendant</option>
                                <option>Descendant</option>
                            </select>
                        </ul>
                        <ul>
                            <button type="submit" class="btn btn-primary">
                            Recherche
                            </button>
                            <button type="button" class="btn btn-primary" >Reset</button>
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
import Collapse from 'bootstrap/js/dist/collapse';
export default {
   data(){
       return{
           toggleFilter : false
       }
   }, 
   components : {
       SearchBar
   },
   methods: {
      handelFilterAccordion(){
          this.toggleFilter = !this.toggleFilter;
          
      }
   },
   watch:{
       toggleFilter(){
           let myCollapse = document.getElementById("flush-collapseOne");
        let bsCollapse = new Collapse(myCollapse, { toggle: this.toggleFilter });
        this.toggleFilter ? bsCollapse.show() : bsCollapse.hide();
        console.log(bsCollapse);
       }
   }

}
</script>
<style lang="scss">
    @import "../styles/components/AppHeader.scss";
</style>
