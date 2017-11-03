const WEATHERBIT_URL = "https://api.weatherbit.io/v2.0/forecast/daily";
const TASTEDIVE_URL = "https://tastedive.com/api/similar";

// shut up
// tastedive key = 289089-Weathert-XWI5W03O

const App = {
    data: [],
    units: "I",
    dayIndex: 0,
    baseGame: "cosmic encounter",
    maxTemp: 82,
    minTemp: 60,
    inAmerica: false,
    
    reset: function() {
        EventListeners.startListeners();
        HTMLRenderer.showSection(".intro");
    },

    searchWeather: function(query) {
        this.getWeatherDataFromAPI(query, this.evaluateWeather);
    },

    getWeatherDataFromAPI: (searchTerm, callback) => {
        const query = {
            key: "62362ac75c5948fc9871e28bb51d0d19",
            units: App.units,
            days: 6,
        };

        if (isNaN(searchTerm)) {
            query.city = searchTerm;
        }
        else {
            query.postal_code = searchTerm;
            query.country = "US";
        }

        $.getJSON(WEATHERBIT_URL, query, callback).fail(HTMLRenderer.showErr);
        // look into using $.ajax
    },

    evaluateWeather: function(data) {
        
        if (!data) {
            App.reset();
            HTMLRenderer.showErr();
        }

        data.country_code === "US" ? App.inAmerica = true : App.inAmerica = false;
  
        this.data = data;
        let result = data.data[App.dayIndex];
        let maxCloud = 25;
        let weatherEvaluation = " because it's ";
        let isWeatherGoodForGaming = "NOPE :(";

        if (result.temp > App.maxTemp) {
            weatherEvaluation += "too hot ";
            isWeatherGoodForGaming = "YUP :)";
        } if (result.temp < App.minTemp) {
            weatherEvaluation += "too cold ";
            isWeatherGoodForGaming = "YUP :)";
        } if (result.precip !== 0 && result.precip !== null) {
            weatherEvaluation += "too rainy ";
            isWeatherGoodForGaming = "YUP :)";
        } if (result.clouds > maxCloud) {
            weatherEvaluation += "too cloudy";
            isWeatherGoodForGaming = "YUP :)";
        }

        isWeatherGoodForGaming === "YUP :)" ? weatherEvaluation = "is a good day to game".concat(weatherEvaluation) 
        : weatherEvaluation = "is NOT a good day to game because the weather is too nice";
        HTMLRenderer.showSection(".day-forecast");
        HTMLRenderer.showDayForecast(data, isWeatherGoodForGaming, weatherEvaluation);

        App.getGameDataFromAPI(App.baseGame, HTMLRenderer.showGame);
    },

    getGameDataFromAPI: function(searchTerm, callback) {
        console.log("getgamedatafromAPI");
        
        const query = {
            q: searchTerm,
            type: "games",
            info: 1,
            limit: 21,
            k: "289089-Weathert-XWI5W03O",
            // callback: HTMLRenderer.showGame
        };

        $.getJSON(TASTEDIVE_URL, query, callback).fail(HTMLRenderer.showErr);
    },

    changeUnits: function(units) {
        if (App.units !== units) {
            App.units = units;
            HTMLRenderer.displayNewUnits(units);
            
            if (App.units === "I") {
                App.maxTemp = 82;
                App.minTemp = 60;
                
            }
            else {
                App.maxTemp = 27.7;
                App.minTemp = 15.5;
            }
        }
    }
};

$(App.reset());
