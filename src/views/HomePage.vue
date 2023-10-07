<template>
  <ion-page >
    <ion-header >
      <ion-toolbar>
        <ion-title class="ion-text-center">Méteo Du Jour</ion-title>
      </ion-toolbar>
    </ion-header>
   
    <ion-content class="ion-padding">

      <div class="jour">{{ formatDate(currentDate) }}</div>
      <ion-list>
        <ion-item>
          <ion-select label="Choisir Votre Ville" v-model="selectedCity" @ionChange="getWeatherData">
            <ion-select-option value="montreal,ca">Montréal</ion-select-option>
            <ion-select-option value="laval,ca">Laval</ion-select-option>
            <ion-select-option value="quebec,ca">Québec</ion-select-option>
            <ion-select-option value="geoloca">Géolocalisation</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>

      <ion-card v-if="weather">

      <div class="ville">  
        <ion-label>{{ weather.current.name}}</ion-label>
      </div>  
        <img :src="getWeatherImageUrl(weather.current.weatherData[0].icon, '4x')" style="width: 30%; height: 30%;" />
        <ion-card-header>
          
          <ion-card-subtitle>{{ weather.current.weatherData[0].description }}</ion-card-subtitle>
          <ion-card-title>{{ weather.current.temp }}&deg;</ion-card-title>
          <ion-card-title> Humidité: {{ weather.current.humidity }}&percnt;</ion-card-title>
          
          
        </ion-card-header>
      </ion-card>

    </ion-content>
    <ion-footer class="ion-no-border">
      <ion-toolbar>
        <ion-title class="ion-text-center">Hamid Boudnaoui</ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>
<script lang="ts">
import {

  IonIcon,
  IonImg,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonBackButton,
  IonButtons,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonList
} from '@ionic/vue';
import { ref } from 'vue';
import { Geolocation } from '@capacitor/geolocation';


const selectedCity = ref('');
const weather = ref<{ current: { weatherData: any[]; temp: number; humidity: number, icon: string, name: string } } | null>(null);
const currentDate = ref(new Date()); 
async function fetchWeatherData(selectedCity: string) {
  if (selectedCity == "geoloca") {
    const apiKey = '84228f1d947a34be9e3f64a5d3211a8e';
    const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const Localisation = await Geolocation.getCurrentPosition();
    const lt = Localisation.coords.latitude;
    const lg = Localisation.coords.longitude;
    
    try {
      const response = await fetch(`${weatherUrl}?lat=${lt}&lon=${lg}&APPID=${apiKey}&units=metric`);
      const data = await response.json();
      console.log("Weather data:", data);
      return data;

    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }

  } else {
    const apiKey = '84228f1d947a34be9e3f64a5d3211a8e';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&APPID=${apiKey}&units=metric`;

    try {
      const response = await fetch(weatherUrl);
      const data = await response.json();
      console.log("Weather data:", data);
      return data;

    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }
}
async function getWeatherData(event: CustomEvent) {
  try {
    const cityName = event.detail.value;
    const weatherData = await fetchWeatherData(cityName);
    weather.value = {
      current: {
        weatherData: weatherData.weather,
        temp: parseFloat(weatherData.main.temp),
        humidity: parseFloat(weatherData.main.humidity),
        icon: weatherData.weather[0].icon,
        name : weatherData.name,
                 

      },      
    };
    currentDate.value = new Date();
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function getWeatherImageUrl(iconName: string, size: '2x' | '4x') {
  return `http://openweathermap.org/img/wn/${iconName}@${size ? size : '1x'}.png`;
}

function formatDate(date: Date): string {

const options: Intl.DateTimeFormatOptions = {

  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'

};
const locale = 'fr-FR';
return date.toLocaleDateString(locale, options);
}

export default {
  components: {
    IonIcon,
    IonList,
    IonImg,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonFooter,
    IonBackButton,
    IonButtons,
    IonLabel,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol
  },
  setup() {
    return { selectedCity, weather, getWeatherData, getWeatherImageUrl, currentDate, formatDate };
  },
};
</script>

<style scoped>
ion-card {
  width: auto ;
  height: auto;
  background-color: skyblue;
}
ion-content {
  --ionbackground: url("src/images/ciel.jpg") no-repeat center center/cover;
}
ion-title {	 background: yellowgreen;
  text-anchor: white;
  padding: 30px;
width: auto;
height: auto; }

  ion-text-center{ 
    text-emphasis-color : black;
  }

#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

.ville{
  text-align: center;
  font-size: 20px ;
  color: black;
  margin-top: 15px;
}
.jour{
  text-align: center;
  font-size: 20px ;
  color: black;
 }

</style>
