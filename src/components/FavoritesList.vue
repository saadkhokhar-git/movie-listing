<script setup lang="ts">
import { ref,watchEffect} from 'vue'

// Interface of Data Prop
interface ComponentProps {
  data: any;
}

const props = defineProps<ComponentProps>();

const fetchedList:any=ref([]);

// Function to get all items from Storage
function allStorage() {
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

watchEffect( () => {
  // this effect will run immediately and re-run when dependency change
   fetchedList.value=allStorage()
})

// Function to check is Item exist in Localstorage or not
function checkIsItemExist(id: string): boolean{
   const item=localStorage.getItem(id);
   if(!item){
    return false
   }
   return true
}


// Toggling the Icon based on Click
function handleToggleIcon(item: any){
    if(checkIsItemExist(item.imdbID)){
      localStorage.removeItem(item.imdbID)
    }
    fetchedList.value=allStorage()
}
</script>


<template>
    <v-table 
    fixed-header
    height="80vh">
    <thead>
      <tr>
        <th class="text-left">
          Title
        </th>
        <th class="text-left">
          Year
        </th>
        <th class="text-left">
          ImdbID
        </th>
        <th  class="text-center">
          Favourites
        </th>
      </tr>
    </thead>
    <tbody v-if="fetchedList?.length">
      <tr
        v-for="item in fetchedList"
        :key="item.imdbID"
      >
        <td>{{ item.Title }}</td>
        <td>{{ item.Year }}</td>
        <td>{{ item.imdbID }}</td>
        <td class="text-center clickable-icon" @click="handleToggleIcon(item)">
          <v-icon  v-if="item.isStarred==true" color="yellow" icon="mdi-heart"></v-icon>
          <v-icon v-else-if="item.isStarred==false" color="#d3d3d3" icon="mdi-heart-outline"></v-icon>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped>
.clickable-icon {
  cursor: pointer; /* Change cursor to pointer to indicate clickable element */
}
</style>
