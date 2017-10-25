const WEATHERBIT_CURRENT_URL = "https://api.weatherbit.io/v2.0/current";
const WEATHERBIT_EXTENDED_URL = "https://api.weatherbit.io/v2.0/forecast/daily";

const App = {
    units: "I",
    
    reset: function() {
        EventListeners.startListeners();
        HTMLRenderer.showIntro();
    },

    search: function(query) {
        this.getDataFromAPI(query, HTMLRenderer.showDayForecast);
    },

    getDataFromAPI: function(searchTerm, callback) {
        let location = searchTerm;
        const query = {
            key: "62362ac75c5948fc9871e28bb51d0d19",
            units: "I",
            city: location
        };
        $.getJSON(WEATHERBIT_CURRENT_URL, query, callback).fail(HTMLRenderer.showErr);
    }
};

const EventListeners = {
    listenersStarted: false,
    searchQuery: "",

    startListeners: function() {
        if (!this.listenersStarted) {
            this.handleSubmit();
            this.handleHeaderLinkClicked();
            this.handleDayForecastLinkClicked();
            
            this.listenersStarted = true;
        }
    },

    handleHeaderLinkClicked: function() {
        $(".header__link").click(function(event) {
            App.reset();
        });
    },

    handleSubmit: function() {
        $(".intro__form").submit(function(event) {
            event.preventDefault();
            const queryTarget = $(this).find(".intro__query");
            this.searchQuery = queryTarget.val();

            App.search(this.searchQuery);
            queryTarget.val("");
        });
    },

    handleDayForecastLinkClicked: function() {
        $(".day-forecast__link").click(function(event) {
            HTMLRenderer.showExtendedForecast();
        });
    }
};

const HTMLRenderer = {
    showIntro: function() {
        $(".intro").removeClass("hidden");
        $(".day-forecast").addClass("hidden");
        $(".extended-forecast").addClass("hidden");
    },

    showDayForecast: function(data) {
        $(".intro").addClass("hidden");
        $(".day-forecast").removeClass("hidden");
        $(".extended-forecast").addClass("hidden");

        data ? console.log(data) : this.showErr();
        let result = data.data[0];

        $(".day-forecast__results__result").remove();
        $(".day-forecast__results").prepend(`
        <div class="day-forecast__results__result">
            <p>YES</p>    
            <p>Today is a good day to game in ${result.city_name}, ${result.country_code}.</p>
            <p>How about <a href="#">Cosmic Encounter?</a></p>
            <p><a href="#">Get another recommendation</a></p>
            <h3>Today's weather for ${result.city_name}, ${result.country_code}</h3>
            <img src="icons/${result.weather.icon}.png">
            <ul>
                <li>${result.weather.description}</li>
                <li>${result.temp}°F</li>
            </ul>
        `);
    },

    showExtendedForecast: function() {
        $(".intro").addClass("hidden");
        $(".day-forecast").addClass("hidden");
        $(".extended-forecast").removeClass("hidden");
    },

    showErr: function() {
        alert("error");
    }
};

$(App.reset());
