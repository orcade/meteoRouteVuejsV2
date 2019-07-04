let urlApi = 'http://files.sirius-school.be/weather-api/'
const Meteo = {
    template: `
<div>
<h1>Meteo </h1>
<div v-if="loading" class="loading">
  Loading...
</div>

<div>
<p v-if="weather">
    Tempereture Min: {{ weather.temperature.min  }}° <br/>
    Tempereture Max: {{ weather.temperature.max  }}° <br/>
    Type de temps: {{ weather.typeOfWeather}}<br/>
    Vitesse du vent: {{ weather.windSpeed }}
    
</p>
</div>


</div>
`,
data() {
    return {
        weather:null,
        currentDay:1, 
        loading:true
        
    }
},
created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getweather();
    //alert('test');
},
watch: {
    // call again the method if the route changes
    '$route': 'getweather'
},
methods: {
    
    getweather() {
        let params = new URLSearchParams();
        params.append('day', this.currentDay);

        axios.post(urlApi, params).then(response => {
            console.log(response);
            this.loading = false;
            this.weather = response.data.weather;
           
            
            
        });
    }
}
}