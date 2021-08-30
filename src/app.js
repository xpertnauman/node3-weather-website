const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weatherforecast = require('./utils/weatherforecast')


const app = express()
const port = process.env.PORT || 3000
const hostName = '127.0.0.1'

// setting directories path
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

// setting up handle bar and views directory
app.set('view engine', 'hbs')
app.set('views', viewsDir)

// setting up partial views directory
hbs.registerPartials(partialsDir)

app.use(express.static(publicDir))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nauman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Nauman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'This is the help page article!',
        name: 'Nauman'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
        return res.send({error: 'Address must be provided.'})

    const address = req.query.address;

    geocode.getLatLong(address, (error, latLongObject) => {

        if(error){
            return res.send({error})
        }else {
            weatherforecast.checkWeather(latLongObject, (error, weatherCondition) => {
                if(error) {
                    return res.send({error})
                }else {
                    return res.send({
                        location: address,
                        weatherCondition:weatherCondition
                    })
                }

            })
        }

    })
})

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({error: 'you must provide a search term'})
    }

    res.send( {
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Nauman',
        message: 'Help article not found'})
})

/*app.get('/!*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Nauman',
        message: 'Page Not Found'
    })
})*/


app.listen(port, () => {
    console.log('listening to port ' + port)

})