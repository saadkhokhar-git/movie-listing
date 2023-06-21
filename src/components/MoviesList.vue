<script setup lang="ts">
import { ref,watchEffect} from 'vue'

// Interface of Data Prop
interface ComponentProps {
  data: any;
}

const props = defineProps<ComponentProps>();

const API_URL = `https://jsonmock.hackerrank.com/api/movies`
const fetchedList: any = ref(null)
const searchQuery:any = ref('')
const isInputChange:any=ref(false)
const loading=ref(false)
const page: any=ref(1)
const firstPage: any=ref(1)
const totalpages: any=ref(1)


// Handling Pagination
function handleClickedPage(pg:any){
  page.value=pg;
}
function moveFirstPage(){
  page.value=1
}
function moveLastPage(){
  page.value=totalpages
}



// GEting dAta from API
async function fetchDataFromAPI(url:string){
    try {
    loading.value=true;
    const response = await fetch(`${url}`);
    const data = await response.json();
    totalpages.value=data?.total_pages
    page.value=data?.page
    let fetchedData=data?.data;
    fetchedData.forEach((object:any) => {object.isStarred = checkIsItemExist(object.imdbID)});
    fetchedList.value = fetchedData
    loading.value=false;
    console.log("DATA:",data);
    return data;
  } catch (error) {
    loading.value=false;
    console.error(error);
  }
}

const handleChangeInput = () => {
//   console.log('Text field value changed:',searchQuery.value);
//   fetchSearchData(searchQuery.value,1)
};


// Handle Search Item, Calling Search API 
async function fetchSearchData(searchItem:string,pageNumber: number=page.value) {
 if(searchItem.length>0){
    await fetchDataFromAPI(`${API_URL}/search/?Title=${searchItem}&page=${pageNumber}`)
}
}

// Fetching Data from API endpoint
async function fetchData() {
    if(searchQuery.value.length>0){
        console.log("search Query -->",searchQuery.value)
        if(page.value>totalpages.value){
            page.value=1
        }
        fetchSearchData(searchQuery.value,page.value)
    }else{
        await fetchDataFromAPI(`${API_URL}?page=${page.value}`)
    }
}


watchEffect(async () => {
  // this effect will run immediately, and re-run when any ref in this change 
    await fetchData();
})

// Finding is Item Exist in Local Storage or no
function checkIsItemExist(id: string): boolean{
   const item=localStorage.getItem(id);
   if(!item){
    return false
   }
   return true
}

// Handling Icon Toggling, and LocalStorage Mapping
function handleToggleIcon(item: any){
    if(item.isStarred){
        localStorage.removeItem(item.imdbID)
        findAndUpdateObject(item.imdbID)        
    }else{
        localStorage.setItem(item.imdbID, JSON.stringify({...item,isStarred:true}))
        findAndUpdateObject(item.imdbID)
    }
}

// Updating the object (changing starred Status)
function findAndUpdateObject(id:string) {
  for (let i = 0; i < fetchedList.value.length; i++) {
    if (fetchedList.value[i]['imdbID'] === id) {
      // Update the object properties
      console.log("Accessed Object:",fetchedList.value[i]);
      const updateStarred=!fetchedList.value[i]['isStarred']
      let updatedObject={...fetchedList.value[i],isStarred:updateStarred}
      console.log("Updated Object:",updatedObject)
      fetchedList.value[i] = { ...fetchedList.value[i], ...updatedObject };
      break; // Exit the loop once the object is updated
    }
  }
}
</script>


<template>
    <v-text-field v-model="searchQuery" 
    label="Search Movies"  
    variant="solo"
    @input="handleChangeInput"
    ></v-text-field>
  
    <v-table 
    fixed-header
    height="70vh">
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
        <th class="text-center">
          Favourites
        </th>
      </tr>
    </thead>
    <div v-if="loading" class="loading-class">Loading ....</div>
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
  <v-pagination
        :length="totalpages" 
        @first="moveFirstPage"
        @last="moveLastPage"
        @update:model-value="handleClickedPage"
     ></v-pagination>
</template>

<style scoped>
.clickable-icon {
  cursor: pointer; /* Change cursor to pointer to indicate clickable element */
}
.loading-class{
    display: flex;
    width: 100%;
    justify-content: center;
    font-size: large;
    margin-top: 2rem;
}
</style>



