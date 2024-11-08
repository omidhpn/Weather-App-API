    let $ = document

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let now = new Date ()
    let date = now.getDate()
    let dateWeek = days[now.getDay()]
    let month = months[now.getMonth()]
    let year = now.getFullYear()


    let inputElem = $.querySelector ('.search-box')
    let divElem = $.querySelector ('.app-wrap')


    function showDetail (data) {
        let mainElem = divElem.querySelector('main');
            if (mainElem) {
                mainElem.remove();
            }
        divElem.insertAdjacentHTML ('beforeend', `
            <main>
                <section class="location">
                    <div class="city">${data.name},${data.sys.country}</div>
                    <div class="date">${dateWeek} ${date} ${month} ${year}</div>
                </section>
                <div class="current">
                    <div class="temp">${Math.floor(data.main.temp - 273.15)}<span>°c</span></div>
                    <div class="weather">${data.weather[0].main}</div>
                    <div class="hi-low">${Math.floor(data.main.temp_min - 273.15)}<span>°c</span> / ${Math.floor(data.main.temp_max - 273.15)}<span>°c</span></div>
                </div>
            </main>
        `)
    inputElem.value = ''
    }

    function erorr (err) {
        let errDiv = $.createElement ('div')
        errDiv.classList.add('errDiv')
        errDiv.innerHTML = 'we have a problem :('
        divElem.append (errDiv)
        setTimeout (function () {
            errDiv.remove()
        }, 3000)
    }


    inputElem.addEventListener ('keypress', function (event) {

        if (event.keyCode === 13) {
    
            fetch (`https://api.openweathermap.org/data/2.5/weather?q=${inputElem.value}&appid=${'637b7d6a497c578a519dd9de1770ab48'}`)
            .then (res => res.json())
            .then (data => {
                showDetail(data)
            })
            .catch (err => {
                erorr(err)
            })

        }

    })