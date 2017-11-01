const EventListeners = {
    listenersStarted: false,
    searchQuery: "",

    startListeners: function() {
        if (!this.listenersStarted) {
            this.handleSubmit();
            this.handleHeaderLinkClicked();
            
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

            App.dayIndex = 0;
            App.searchWeather(this.searchQuery);
            EventListeners.handleExtendedForecastDayClicked(this.searchQuery);
            EventListeners.handleRecommendationLinkClicked();
            EventListeners.handleCelsiusClicked();
            EventListeners.handleFahrenheitClicked();
            EventListeners.handleSearchClicked();
            queryTarget.val("");
            HTMLRenderer.showSection(".extended-forecast");
        });
    },

    handleExtendedForecastDayClicked: function(query) {
        
        $(".day-forecast").on("click", ".extended-forecast-day__link", function() {
            App.dayIndex = $(this).attr("data-index");
            App.searchWeather(query);
            console.log("getting new forecast");
        });
    },

    handleRecommendationLinkClicked: function() {
        $(".day-forecast").on("click", ".recommendation__link", function() {
            App.getGameDataFromAPI(App.baseGame, HTMLRenderer.showGame);
        });
    },

    handleCelsiusClicked: function() {
        $(".day-forecast").on("click", ".day-forecast__celsius", function() {
            App.changeUnits("M");
        });
    },

    handleFahrenheitClicked: function () {
        $(".day-forecast").on("click", ".day-forecast__fahrenheit", function () {
            App.changeUnits("I");
        });
    },

    handleSearchClicked: function() {
        $(".day-forecast").on("click", ".day-forecast__search", function() {
            App.reset();
        });
    }
};