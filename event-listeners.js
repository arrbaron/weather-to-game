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
            App.search(this.searchQuery);
            EventListeners.handleExtendedForecastLinkClicked(this.searchQuery);
            EventListeners.handleExtendedForecastDayClicked(this.searchQuery);
            queryTarget.val("");
        });
    },

    handleExtendedForecastLinkClicked: function(query) {
        $(".extended-forecast__link").click((event) => {
            HTMLRenderer.showSection(".extended-forecast");
            console.log(query);
            App.searchExtended(query);
        });
    },

    handleExtendedForecastDayClicked: function(query) {
        console.log("listener started");
        $(".extended-forecast").on("click", ".extended-forecast-day__link", function(event) {
            console.log("day clicked");
            App.dayIndex = $(this).attr("data-index");
            App.search(query);
        });
    }
};