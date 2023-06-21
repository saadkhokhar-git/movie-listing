<!-- Script Tag  -->
<script setup lang="ts">
import { ref,watchEffect,computed,watch } from 'vue'
import MoviesList from './components/MoviesList.vue';
import FavoritesList from './components/FavoritesList.vue';
const localStorageData = ref(getDataFromLocalStorage());
const selectedTab: any = ref('all')
const tabs: any=[
        { id: 'all', title: 'ALL MOVIES' },
        { id: 'favourites', title: 'FAVOURITES' }
      ]

function changeTab(tabId: string){
  selectedTab.value=tabId;
}

// Watcher to check which tab is selected
watch(selectedTab, (newValue) => {
  // If the selectedTab is not a valid tab ID, default to the first tab
  if (!tabs.some((tab:any) => tab.id === newValue)) {
    selectedTab.value = tabs[0].id;
  }
});


// Watcher for getting Data from Local
watchEffect(() => {
  // Update the localStorageData whenever localStorage changes
  localStorageData.value = getDataFromLocalStorage();
});


// Retrieve the data from localStorage
function getDataFromLocalStorage() {
  var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
  while ( i-- ) {
      let item=localStorage.getItem(keys[i])
      if(item)
      values.push(JSON.parse(item));
  }
  return values;
}
</script>

<!-- Template View -->
<template>
  <v-app>
    <v-tabs
    fixed-tabs
    bg-color="indigo-darken-2"
    v-model="selectedTab"
    class="elevation-12"
  >
    <v-tab v-for="tab in tabs" :key="tab.id"  @click="changeTab(tab.id)" :class="{ 'selected-tab': selectedTab === tab.id }">{{ tab.title }}</v-tab>
  </v-tabs>
    <div v-show="selectedTab === 'all'"><MoviesList :data="localStorageData"/></div>
    <div v-show="selectedTab === 'favourites'"> <FavoritesList :data="localStorageData"/></div>
  </v-app>
</template>

<style scoped>
.selected-tab {
  color: white;
  border-bottom: 2px solid #5879ed;
  background-color: #5879ed;
}
</style>
