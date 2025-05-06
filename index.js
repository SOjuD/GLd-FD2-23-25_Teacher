const weatherForm = document.forms[0];

const DICTIONARY = {
    ru: {
        temp: "Температура",
        feelsLike: "Ощущается как",
        day: 'День',
        night: 'Ночь'
    },
    en: {
        temp: "Temperature",
        feelsLike: "Feels like",
        day: 'Day',
        night: 'Night'
    }
}


const apiTypes = {
    weather: 'weather',
    geo: "geo",
    forecast: 'forecast',
}

const getRequestUrl = (params, apiType = "geo") => {
    const API_HOST = "http://api.openweathermap.org";
    const API_KEY = "a5fc8be9dcd685b1f8c7d30b239a69c1";
    const url = new URL(API_HOST);
    const APIS = {
        weather: '/data/2.5/weather',
        geo: "/geo/1.0/direct",
        forecast: '/data/2.5/forecast',
    }

    url.pathname = APIS[apiType];
    url.searchParams.set('appid', API_KEY);

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value)
    })

    return url;
}

const getGeoProps = (form) => {
    const q = form.elements.q.value;

    return {
        q
    }
}

const getWeatherProps = (form) => {
    const lon = form.elements.lon.value;
    const lat = form.elements.lat.value;
    const units = form.elements.units.value;
    const lang = form.elements.lang.value;

    return {
        lon,
        lat,
        units,
        lang
    }
}

const getGeolocation = async (form) => {
    const props = getGeoProps(form);
    const url = getRequestUrl(props, apiTypes.geo);
    const res = await fetch(url);
    return await res.json();
}

const setGeolocation = (form, cityGeo) => {
    form.elements.lat.value = cityGeo[0].lat;
    form.elements.lon.value = cityGeo[0].lon;
}

const blockUI = (elem) => {
    elem.classList.add('loader');
}

const unBlockUI = (elem) => {
    elem.classList.remove('loader');
}

const startApp = async (form) => {
    const props = getWeatherProps(form);
    const apiType = form.elements.apiType.value
    const url = getRequestUrl(props, apiType);
    let data;

    blockUI(form)
    try {
        const res = await fetch(url);
        data = await res.json();
    } catch (e) {
        console.error(e);
        data = [];
    }
    unBlockUI(form);

    apiType === apiTypes.weather ? renderWeather(data) : renderForecast(data);
}

const renderWeather = (weather) => {
    const weatherContainer = document.querySelector('#weatherContainer');
    const currentLang = weatherForm.elements.lang.value;
    const template = document.querySelector('#templateCard').content.cloneNode(true);
    const date = new Date(weather.dt * 1000).toLocaleDateString(currentLang, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
    const sunrise = new Date((weather.sys.sunrise + weather.timezone) * 1000).toLocaleTimeString(currentLang, {
        hour: 'numeric',
        minute: 'numeric',
    })
    const sunset = new Date((weather.sys.sunset + weather.timezone) * 1000).toLocaleTimeString(currentLang, {
        hour: 'numeric',
        minute: 'numeric',
    })

    template.querySelector('img').src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    template.querySelector("#time").innerText = date
    template.querySelector('#desc').innerText = weather.weather[0].description;
    template.querySelector('#temp').innerText = `${DICTIONARY[currentLang].temp} ${weather.main.temp}`;
    template.querySelector('#feelsLike').innerText = `${DICTIONARY[currentLang].feelsLike} ${weather.main.feels_like}`;
    template.querySelector('#sun').innerText = `${sunrise} - ${sunset}`;

    weatherContainer.innerHTML = '';
    weatherContainer.append(template);
}

const buildForecastGroup = (data) => {
    const currentLang = weatherForm.elements.lang.value;
    const containerDiv = document.createElement('div');
    const divDay = document.createElement('div');
    const divNight = document.createElement('div');
    const dateContainerD = document.createElement('h3');
    const dateContainerN = document.createElement('h3');
    let groupDT = Object.values(data).flat()[0].dt;

    const groupDate = new Date(groupDT * 1000).toLocaleDateString(currentLang, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    containerDiv.append(divDay, divNight);
    containerDiv.classList.add('p-3', 'border', 'm-b-3')

    if (data.d) {
        dateContainerD.innerText = `${groupDate} - ${DICTIONARY[currentLang].day}`

        divDay.append(dateContainerD, ...data.d.map(buildForecastItem));
    }
    if (data.n) {
        dateContainerN.innerText = `${groupDate} - ${DICTIONARY[currentLang].night}`

        divNight.append(dateContainerN, ...data.n.map(buildForecastItem))
    }

    return containerDiv
}

const buildForecastItem = (data) => {
    const currentLang = weatherForm.elements.lang.value;
    const template = document.querySelector('#templateCard').content.cloneNode(true);
    const time = new Date(data.dt * 1000).toLocaleTimeString(currentLang, {
        hour: 'numeric',
        minute: 'numeric',
    })

    template.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    template.querySelector("#time").innerText = time
    template.querySelector('#desc').innerText = data.weather[0].description;
    template.querySelector('#temp').innerText = `${DICTIONARY[currentLang].temp} ${data.main.temp}`;
    template.querySelector('#feelsLike').innerText = `${DICTIONARY[currentLang].feelsLike} ${data.main.feels_like}`;

    return template;
}

const transformForecast = (items) => {
    return items.reduce((acc, item) => {
        const day = item.dt_txt.split(' ')[0]
        const partOfDay = item.sys.pod;
        if (acc[day]) {
            if (acc[day][partOfDay]) {
                acc[day][partOfDay].push(item)
            } else {
                acc[day] = {
                    ...acc[day],
                    [partOfDay]: [item],
                }
            }
        } else {
            acc[day] = {
                [partOfDay]: [item],
            }
        }
        return acc;
    }, {})
}

const renderForecast = (data) => {
    const weatherContainer = document.querySelector('#weatherContainer');
    const transformedList = transformForecast(data.list);
    const items = Object.values(transformedList).map(buildForecastGroup);

    weatherContainer.innerHTML = '';
    weatherContainer.append(...items);

}

weatherForm.addEventListener("change", async (event) => {
    if (event.target.name === 'q') {
        const form = event.currentTarget
        const cityGeo = await getGeolocation(form)
        setGeolocation(form, cityGeo);
    }
})

weatherForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    startApp(event.target);
})

weatherForm.elements.q.dispatchEvent(new Event('change', {bubbles: true}));