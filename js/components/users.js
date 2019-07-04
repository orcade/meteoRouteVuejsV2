const Users = {
    template: `
<div class="post">
    <h1>Liste des utilisateurs</h1>
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>
    
    <!-- on vérifie que users n'est pas vide, et puis on boucle avec v-for sur un tableau d'objet "user" -->
    <ul v-if="users" id="example-1">
        <li v-for="user in users">
            <router-link :to="{ name: 'user', params: { id: user.id }}">{{ user.name }}</router-link>
        </li>
    </ul>
  </div>
`,
    data() {
        return {
            loading: true,
            users: null,
            error: null
        }
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.fetchData();
    },
    watch: {
        // call again the method if the route changes
        '$route': 'fetchData'
    },
    methods: {
        
        fetchData() {
            axios.get('https://jsonplaceholder.typicode.com/users/').then(response => {
                console.log(response);
                this.loading = false;
                this.users = response.data;
            });
        }
    }
};