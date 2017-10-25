// weatherbit API key: 62362ac75c5948fc9871e28bb51d0d19

const WEATHERBIT_CURRENT_URL = "https://api.weatherbit.io/v2.0/current";
const WEATHERBIT_EXTENDED_URL = "https://api.weatherbit.io/v2.0/forecast/daily";

const App = {
    reset: function() {
        EventListeners.startListeners();
        HTMLRenderer.showIntro();
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
            
            listenersStarted = true;
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

            // App.search(searchQuery);
            HTMLRenderer.showDayForecast();
            queryTarget.val("");
        });
    },

    handleDayForecastLinkClicked() {
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

    showDayForecast: function() {
        $(".intro").addClass("hidden");
        $(".day-forecast").removeClass("hidden");
        $(".extended-forecast").addClass("hidden");
    },

    showExtendedForecast: function() {
        $(".intro").addClass("hidden");
        $(".day-forecast").addClass("hidden");
        $(".extended-forecast").removeClass("hidden");
    }
};

$(App.reset());
// App.reset();
