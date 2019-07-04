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
<div>
    <button v-on:click="previousDay">Jour précédent</button>
    <button v-on:click="nextDay">Jour suivant</button>
    
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
    this.getweather();
    //alert('test');
},

methods: {
    
    getweather() {
        let params = new URLSearchParams();
        params.append('day', this.currentDay);

        axios.post(urlApi, params).then(response => {
            //console.log(response);
            this.loading = false;
            this.weather = response.data.weather;
            
        });
    },

    previousDay() {
        if (this.currentDay >= 2) {
            this.currentDay -= 1;

            let params = new URLSearchParams();
            params.append('day', this.currentDay);

            axios.post(urlApi, params).then(response => {
                this.loading = false;
                this.weather = response.data.weather;
            })

        }


    },

    nextDay() {
        if(this.currentDay <=6) {
            this.currentDay +=1;

            let params = new URLSearchParams();
            params.append('day',this.currentDay);

            axios.post(urlApi, params).then(response => {
                this.loading = false;
                this.weather = response.data.weather;

        })
    }
    },
},
};
