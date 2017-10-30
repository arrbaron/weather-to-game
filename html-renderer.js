const HTMLRenderer = {
    
    showSection: function(sectionToShow) {
        const sections = [".intro", ".day-forecast", ".extended-forecast"];
        sections.forEach(function(item, index) {
            $(item).addClass("hidden");
        });
        $(sectionToShow).removeClass("hidden");
        $("footer").removeClass("hidden");
    },

    showDayForecast: function(data, isWeatherGood, weatherEvaluation) {
        data ? console.log("") : HTMLRenderer.showErr();
        let day = data.data[App.dayIndex];

        $(".day-forecast__results--recommendation").remove();
        $(".day-forecast__results--weather").remove();
        $(".day-forecast__results").prepend(`
        <div class="day-forecast__results--recommendation col col-half">
            <div class="is-weather-good">${isWeatherGood}</div> 
            <div>${weatherEvaluation} outside in ${data.city_name}, ${data.country_code}.</div>
            <p>How about <a href="https://www.amazon.com/Fantasy-Flight-Games-CE01-Encounter/dp/1589944968" target="_blank">Cosmic Encounter?</a></p>
            <p><a href="#">Get another recommendation</a></p>
        </div>
        <div class="day-forecast__results--weather col col-half">
            <h3>${day.datetime}'s weather for ${data.city_name}, ${data.country_code}</h3>
            <img src="icons/${day.weather.icon}.png">
            <ul>
                <li>${day.weather.description}</li>
                <li>${day.temp}°C</li>
            </ul>
       </div>
        `);
    },

    showExtendedForecast: function(data) {
        const maxResults = 6;
        $(".extended-forecast-day").remove();

        // use a foreeach instead
        for (let i = 0; i < maxResults; i++) {
            let day = data.data[i];

            $(".extended-forecast__results").append(`
            <div class="extended-forecast-day">
                <a class="extended-forecast-day__link" data-index="${i}">
                    <h4>${day.datetime}</h4>
                    <img src="icons/${day.weather.icon}.png" alt="">
                    <p>${day.weather.description}</p>
                    <p>${day.temp}°C</p>
                </a>    
            </div>
            `);
        }
    },

    showErr: function() {
        alert("error");
        return;
    }
};