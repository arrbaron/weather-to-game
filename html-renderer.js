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
        </div>
        <div class="day-forecast__results--weather col col-half">
            <h3>${day.datetime}'s weather for ${data.city_name}, ${data.country_code}</h3>
            <img src="icons/${day.weather.icon}.png">
            <ul>
                <li>${day.weather.description}</li>
                <li>${day.temp}°C</li>
            </ul>
            <p>Planning ahead? <a href="#" class="extended-forecast__link">Get the extended forecast</a></p>
            <p>°C/°F</p>
       </div>
        `);
    },

    showExtendedForecast: function(data) {
        const maxResults = 6;
        $(".extended-forecast-day").remove();

        // use a foreeach instead
        for (let i = 0; i < maxResults; i++) {
            let day = data.data[i];

            if (i < 3) {
                $(".extended-forecast__results--top").append(`
                <div class="extended-forecast-day col col-third">
                    <a class="extended-forecast-day__link" data-index="${i}">
                        <h4>${day.datetime}</h4>
                        <img src="icons/${day.weather.icon}.png" alt="">
                     <p>${day.weather.description}</p>
                        <p>${day.temp}°C</p>
                    </a>    
                </div>
            `);
            }
            else {
                $(".extended-forecast__results--bottom").append(`
                <div class="extended-forecast-day col col-third">
                    <a class="extended-forecast-day__link" data-index="${i}">
                        <h4>${day.datetime}</h4>
                        <img src="icons/${day.weather.icon}.png" alt="">
                     <p>${day.weather.description}</p>
                        <p>${day.temp}°C</p>
                    </a>    
                </div>
                `);  
            } 
        }
    },

    showGame: function(data) {
        let randomIndex = Math.floor(Math.random() * 20);
        let game = data.Similar.Results[randomIndex];

        console.log("showing recommendation");

        $(".recommendation").remove();

        $(".day-forecast__results--recommendation").append(`
        <div class="recommendation">    
            <p>How about <a href="https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dtoys-and-games&field-keywords=${game.Name}" target="_blank">${game.Name}?</a></p>
            <iframe src="${game.yUrl}"
            width="560" height="315" frameborder="0"></iframe>
            <p class="recommendation__description">${game.wTeaser}</p>
            <p><a class="recommendation__link">Get another recommendation</a></p>
        </div>
        `);
    },

    showErr: function() {
        alert("error");
        return;
    }
};