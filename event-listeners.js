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
        $(".extended-forecast__day__link").click((event) => {
            HTMLRenderer.showSection(".day-forecast");
            console.log("ooh that tickles");
        });
    }
};