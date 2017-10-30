const WEATHERBIT_URL = "https://api.weatherbit.io/v2.0/forecast/daily";
const TASTEDIVE_URL = "https://tastedive.com/api/similar";
// shut up
// tastedive key = 289089-Weathert-XWI5W03O

const App = {
    data: [],
    units: "M",
    dayIndex: 0,
    
    reset: function() {
        EventListeners.startListeners();
        HTMLRenderer.showSection(".intro");
    },

    searchWeather: function(query) {
        this.getWeatherDataFromAPI(query, this.evaluateWeather);
    },

    searchWeatherExtended: function(query) {
        this.getWeatherDataFromAPI(query, HTMLRenderer.showExtendedForecast);
    },

    getWeatherDataFromAPI: (searchTerm, callback) => {
        const query = {
            key: "62362ac75c5948fc9871e28bb51d0d19",
            units: App.units,
            days: 6
        };
        isNaN(searchTerm) ? query.city = searchTerm : query.postal_code = searchTerm;

        $.getJSON(WEATHERBIT_URL, query, callback).fail(HTMLRenderer.showErr);
    },

    evaluateWeather: function(data) {
        this.data = data;
        // let result = data.data[0];
        let result = data.data[App.dayIndex];
        let maxTemp = 28;
        let minTemp = 18;
        let maxCloud = 25;
        let weatherEvaluation = " because it's ";
        let isWeatherGoodForGaming = "NO";

        if (result.temp > maxTemp) {
            weatherEvaluation += "too hot ";
            isWeatherGoodForGaming = "YES ";
        } if (result.temp < minTemp) {
            weatherEvaluation += "too cold ";
            isWeatherGoodForGaming = "YES ";
        } if (result.precip !== 0 && result.precip !== null) {
            weatherEvaluation += "too rainy ";
            isWeatherGoodForGaming = "YES ";
        } if (result.clouds > maxCloud) {
            weatherEvaluation += "too cloudy";
            isWeatherGoodForGaming = "YES ";
        }

        isWeatherGoodForGaming === "YES " ? weatherEvaluation = "Today is a good day to game".concat(weatherEvaluation) 
        : weatherEvaluation = "Today is NOT a good day to game because the weather is too nice";
        HTMLRenderer.showSection(".day-forecast");
        HTMLRenderer.showDayForecast(data, isWeatherGoodForGaming, weatherEvaluation);

        App.getGameDataFromAPI("cosmic encounter", HTMLRenderer.showGame);
    },

    getGameDataFromAPI: function(searchTerm, callback) {
        const query = {
            q: searchTerm,
            type: "games",
            info: 1,
            limit: 1,
            k: "289089-Weathert-XWI5W03O"
        };

        $.getJSON(TASTEDIVE_URL, query, callback).fail(HTMLRenderer.showErr);
    }
};

$(App.reset());
