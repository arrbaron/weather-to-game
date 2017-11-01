const HTMLRenderer = {
    displayUnit: "F",

    showSection: function(sectionToShow) {
        const sections = [".intro, .day-forecast"];
        sections.forEach(function(item, index) {
            $(item).addClass("hidden");
        });
        $(sectionToShow).removeClass("hidden");
        $("footer").removeClass("hidden");
    },

    showDayForecast: function(data, isWeatherGood, weatherEvaluation) {
        let day = data.data[App.dayIndex];
        let date = new Date(day.datetime).toDateString();

        $(".day-forecast__results--recommendation").remove();
        $(".day-forecast__results--weather").remove();
        $(".extended-forecast-day").remove();
        $(".day-forecast__results").prepend(`
        <div class="day-forecast__results--recommendation col col-half">
            <div class="is-weather-good">${isWeatherGood}</div> 
            <div class="weather-evaluation">${weatherEvaluation} outside in ${data.city_name}, ${data.country_code}.</div>
        </div>
        <div class="day-forecast__results--weather col col-half">
            <h3>${date} weather for ${data.city_name}, ${data.country_code}</h3>
            <img src="icons/${day.weather.icon}.png">
            <p class="day-forecast__description">${day.weather.description} | 
                <span class="day-forecast__temp">${Math.round(day.temp)}</span><span class="day-forecast__unit">°${HTMLRenderer.displayUnit}</span>
            <p>
            <p class="day-forecast__units"><a class="day-forecast__celsius">°C</a>/<a class="day-forecast__fahrenheit">°F</a></p>
            <div class="extended-forecast__results--top row col col-full"></div>
            <div class="extended-forecast__results--bottom row col col-full"></div>
       </div>
        `);
        data.data.forEach((item, index) => {
            let day = data.data[index];
            let date = new Date(day.datetime).toDateString();

            if (index < 3) {
                $(".extended-forecast__results--top").append(`
                <div class="extended-forecast-day col col-third">
                    <a class="extended-forecast-day__link" data-index="${index}">
                        <h4>${date}</h4>
                        <img src="icons/${day.weather.icon}.png" alt="">
                     <p>${day.weather.description}</p>
                        <p>${Math.round(day.temp)}°${HTMLRenderer.displayUnit}</p>
                    </a>    
                </div>
            `);
            }
            else {
                $(".extended-forecast__results--bottom").append(`
                <div class="extended-forecast-day col col-third">
                    <a class="extended-forecast-day__link" data-index="${index}">
                        <h4>${date}</h4>
                        <img src="icons/${day.weather.icon}.png" alt="">
                     <p>${day.weather.description}</p>
                        <p>${Math.round(day.temp)}°${HTMLRenderer.displayUnit}</p>
                    </a>    
                </div>
                `);
            } 
        });
    },

    showGame: function(data) {
        
        let randomIndex = Math.floor(Math.random() * 21);
        let game = data.Similar.Results[randomIndex];

        console.log("showing game recommendation");

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
    },

    displayNewUnits: function(units) {
        let oldTemp = $(".day-forecast__temp").html();
        let newTemp = 0;

        if (units === "I") {
            // celsius to fahrenheit
            newTemp = Math.round((oldTemp * 9/5) + 32);
            HTMLRenderer.displayUnit = "F";
        }
        else if (units === "M") {
            // fahrenheit to celsius
            newTemp = Math.round((oldTemp - 32) * 5/9);
            HTMLRenderer.displayUnit = "C";
        }

        $(".day-forecast__temp").html(`${newTemp}`);
        $(".day-forecast__unit").html(`°${HTMLRenderer.displayUnit}`);
    },


};