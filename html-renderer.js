const HTMLRenderer = {
    
    showSection: function(sectionToShow) {
        const sections = [".intro", ".day-forecast", ".extended-forecast"];
        sections.forEach(function(item, index) {
            $(item).addClass("hidden");
        });
        $(sectionToShow).removeClass("hidden");
    },

    showDayForecast: function(data, isWeatherGood, weatherEvaluation) {
        data ? console.log(data) : HTMLRenderer.showErr();
        let result = data.data[0];

        $(".day-forecast__results__result").remove();
        $(".day-forecast__results").prepend(`
        <div class="day-forecast__results__result">
            <p>${isWeatherGood}</p>    
            <p>${weatherEvaluation} outside in ${result.city_name}, ${result.country_code}.</p>
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

    showExtendedForecast: function(weatherEvaluation) {
        $(".intro").addClass("hidden");
        $(".day-forecast").addClass("hidden");
        $(".extended-forecast").removeClass("hidden");
    },

    showErr: function() {
        alert("error");
        return;
    }
};