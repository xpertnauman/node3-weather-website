console.log('client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

search.textContent = ''

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    getLocation(location)

})

const getLocation = (location) => {

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const url = 'http://localhost:3000/weather?address=' + location

    fetch(url)
        .then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    messageOne.textContent = data.error
                }else {
                    messageOne.textContent = 'Location is: ' + data.location
                    messageTwo.textContent = 'Weather Condition: ' + data.weatherCondition
                }
            })
        })

}