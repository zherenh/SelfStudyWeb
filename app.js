// Import express
const express = require('express')

// Set your app up as an express app
const app = express()

// Set up to handle POST requests
app.use(express.json())     // needed if POST data is in JSON format
// app.use(express.urlencoded())  // only needed for URL-encoded input

// link to our router
const peopleRouter = require('./routes/peopleRouter')

// middleware to log a message each time a request arrives at the server - handy for debugging
app.use((req,res,next) => {
    console.log('message arrived: ' + req.method + ' ' + req.path)
    next()
})

// the demo routes are added to the end of the '/demo-management' path
app.use('/people', peopleRouter)


// Tells the app to listen on port 3000 and logs tha tinformation to the console.
app.listen(3000, () => {
    console.log('Demo app is listening on port 3000!')
})

// define where static assets live
app.use(express.static('public'))

// include Handlebars module
const exphbs = require('express-handlebars')

app.engine('hbs', exphbs.engine({
    defaultlayout: 'main',
    extname: 'hbs'
}))

// set Handlebars view engine
app.set('view engine', 'hbs')

/* 同时只能有一个responce.render的返回 */
app.get('/', (req,res) => {
    res.render('index.hbs')
})

// Tells the app to send the string: "Our demo app is working!" when you hit the '/' endpoint.
// app.get('/', (req,res) => {
//     res.send('Our demo app is working!')
// })