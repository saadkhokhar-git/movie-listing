# Movie Listing App
This is a movie listing app developed using Vue.js with TypeScript and the Composition API. It retrieves a list of movies from a mock API and renders them according to the provided user stories. The app is written in Vue 3, utilizing the Composition API.
## User Stories
* User can see a list of movies from the provided API.
* User can browse the movie list using pagination, with 10 items per page.
* User can search movies by title.
* User can star/unstar a movie from the list and can keep starred movies in a "Favorites" section.

## Usage
* Upon loading the app, the MovieList component will fetch the list of movies from the API and display them.
* You can navigate through the list using the pagination at the bottom.
* To search for movies, enter a title in the search input. The movie list will update dynamically based on the search query.
* To star/unstar a movie, click on the star icon next to the movie item. The starred movies will be added to the "Favorites" section.
* You can also navigate to the "Favorites" section to view and manage your starred movies.


Feel free to explore and enjoy the movie listing app!

## Main Components

The app consists of the following components:

* MovieList: Renders the list of movies retrieved from the API, allows searching by title, and provides pagination functionality.
* Favorites: Displays the user's favorite movies.


## API Integration
The JSON Mock API provided by HackerRank has been used here. It is a public API that allows you to retrieve movie-related data. It provides a variety of endpoints to query and retrieve movie information in JSON format.

The base URL for the API is https://jsonmock.hackerrank.com/api/movies, and it offers several endpoints for different operations and filters. 

## Technologies Used
* Vue3 (Composition API & SFC)
* Vuetify
* TypeScript

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

Install Dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

Run the project

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

Build the project

```sh
npm run build
```
