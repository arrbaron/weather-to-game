const WEATHERBIT_CURRENT_URL = "https://api.weatherbit.io/v2.0/current";
const WEATHERBIT_EXTENDED_URL = "https://api.weatherbit.io/v2.0/forecast/daily";

const App = {
    units: "I",
    
    reset: function() {
        EventListeners.startListeners();
        HTMLRenderer.showSection(".intro");
    },

    search: function(query) {
        this.getDataFromAPI(query, HTMLRenderer.showDayForecast);
    },

    getDataFromAPI: function(searchTerm, callback) {
        let location = searchTerm;
        const query = {
            key: "62362ac75c5948fc9871e28bb51d0d19",
            units: "I"
        };
        isNaN(location) ? query.city = location : query.postal_code = location;

        $.getJSON(WEATHERBIT_CURRENT_URL, query, callback).fail(HTMLRenderer.showErr);
        HTMLRenderer.showSection(".day-forecast");
    }
};
$(App.reset());
