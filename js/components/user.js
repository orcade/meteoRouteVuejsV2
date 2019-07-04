const User = {
        template: `
<div>
    
    
    
    <h1>Utilisateur n° {{ $route.params.id }}</h1>
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>
    <p v-if="user">
        Nom: {{ user.name }} <br />
        Pseudo: {{ user.username }} <br />
        Email: {{ user.email }} <br />
        Téléphone: {{ user.phone }} <br />
        Site: <a :href="'http://' + user.website">{{ user.website }}</a>
    </p>
</div>
`,
    data() {
        return {
            loading: true,
            user: null,
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
            axios.get('https://jsonplaceholder.typicode.com/users/' + this.$route.params.id).then(response => {
                // console.log(response);
                this.loading = false;
                this.user = response.data;
                // console.log(this.user);
            });
        }
    }
}