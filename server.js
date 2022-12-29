// import express for server
const express = require("express");
// app is now the name of our express server
const app = express();
// use URL encoded milddleware, allows us to use req.body in POST routes and get data from forms
app.use(express.urlencoded({ extended: true }))
// allows us to parse json data from the body of a request
app.use(express.json());


// setting up express to render static files in /public
app.use(express.static("public"))

// setting up a view engine to render html files ... can be 'handlebars', 'ejs', 'pug', etc.
app.set("view engine", "ejs")

// setting up a get route to send a response to the client ... "/" is the root URL
app.get ("/", logger, (req, res) => {
    console.log("Here")
    // send a json response to the client - this response returns in console as json { "message": "Hello World" }
    // res.json({ message: "Hello World"})
    // OR send a response for internal error to the user
    // res.sendStatus(500)
    // OR (most commonly) send a response to user at root URL "/" with index.html file as homepage of website
    res.render("index", { text: "Hello World" })
})


//import router from users.js
const userRouter = require("./routes/users");
// setting up a port to listen for requests and responses

app.use("/users", userRouter)

// logger middleware
function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}


app.listen(3005) 

