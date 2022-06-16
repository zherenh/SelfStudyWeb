// Import express
const express = require('express')

// Set your app up as an express app
const app = express()

require('./models')

const port = process.env.PORT || 3000

// Set up to handle POST requests
app.use(express.json())     // needed if POST data is in JSON format

app.use(express.urlencoded({ extended: true }))  // only needed for URL-encoded input

// link to our router
const peopleRouter = require('./routes/peopleRouter')

// middleware to log a message each time a request arrives at the server - handy for debugging
// app.use((req,res,next) => {
//     console.log('message arrived: ' + req.method + ' ' + req.path)
//     next()
// })

// the demo routes are added to the end of the '/demo-management' path
app.use('/people', peopleRouter)


// Tells the app to listen on port 3000 and logs tha tinformation to the console.
/* 
app.listen(3000, () => {
     console.log('Demo app is listening on port 3000!')
}) 
*/
app.listen(port, () => {
    console.log('The library app is running!')
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
app.get('/', (req, res) => {
    res.render('index.hbs')
})

// Tells the app to send the string: "Our demo app is working!" when you hit the '/' endpoint.
// app.get('/', (req,res) => {
//     res.send('Our demo app is working!')
// })







const flash = require('express-flash')
const session = require('express-session')

// Flash messages for failed logins, and (possibly) other success/error messages
app.use(flash())

// Track authenticated users through login sessions
app.use(
    session({
        // The secret used to sign session cookies (ADD ENV VAR)
        secret: process.env.SESSION_SECRET || 'keyboard cat',
        name: 'demo', // The cookie name (CHANGE THIS)
        saveUninitialized: false,
        resave: false,
        cookie: {
            sameSite: 'strict',
            httpOnly: true,
            secure: app.get('env') === 'production'
        },
    })
)

if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // Trust first proxy
}

// Initialise Passport.js
const passport = require('./passport')

app.use(passport.authenticate('session'))

// Load authentication router
const authRouter = require('./routes/auth')
app.use(authRouter)




// JS single thread