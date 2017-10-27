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
        let day = data.data[0];
        console.log(data);

        $(".day-forecast__results__result").remove();
        $(".day-forecast__results").prepend(`
        <div class="day-forecast__results__result">
            <p>${isWeatherGood}</p>    
            <p>${weatherEvaluation} outside in ${data.city_name}, ${data.country_code}.</p>
            <p>How about <a href="#">Cosmic Encounter?</a></p>
            <p><a href="#">Get another recommendation</a></p>
            <h3>Today's weather for ${data.city_name}, ${data.country_code}</h3>
            <img src="icons/${day.weather.icon}.png">
            <ul>
                <li>${day.weather.description}</li>
                <li>${day.temp}°C</li>
            </ul>
        `);
    },

    showExtendedForecast: function(data) {
        let maxResults = 6;
        
        for (let i = 0; i < maxResults; i++) {
            let day = data.data[i];

            $(".extended-forecast__results").append(`
            <div class="extended-forecast__day">
                <a class="extended-forecast__day__link">    
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