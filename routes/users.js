const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    // building query string in url parameters to get info by paams (in this case, name)
   console.log( req.query.name )
    res.send(req.query.name)
})

// static routes must always go ABOVE dynamic routes (/:id)
router.get("/new", (req, res) => {
    res.render("users/new", { firstName: "Rod" })
})

// POST route
router.post("/", (req, res) => {
    // tests if form data is valid
    const isValid = true;
    if (isValid) {
        // if valid, new user information is pushed to users array
        users.push({ firstName: req.body.firstName })
        // redirect to new user's page ... (users.length - 1) is the index of the last user in the array
        res.redirect(`/users/${users.length - 1}`)
        console.log(req.body.firstName)

    } else {
        // if not valid, redirect to new user form again pre-populated with data from req.body
        console.log("Error on post route")
        // we add this line so that when it goes back to form it will still have body so user can make correction
        res.render("users/new", { firstName: req.body.firstName })
    }

    res.send("POST request to /users")
})

// dynamic routes BELOW static routes (/new)
// can write separate routes for each method (get, put, delete, post) for dynamic routes:

// router.get("/:id", (req, res) => {
//     res.send(`Here is user ${req.params.id}`)
// })

// router.put("/:id", (req, res) => {
//     res.send(`Update user with ID ${req.params.id}`)
// });

// router.delete("/:id", (req, res) => {
//     res.send(`Delete user with ID ${req.params.id}`)
// });



// OR consolidate dynamic routes into one route ("/:id") for get, put, delete:
router
    .route("/:id")
    .get((req, res) => {
        console.log(req.user)
        res.send(`Here is user ${req.params.id}`)
    })
    .put((req, res) => {
        res.send(`Update user with ID ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`Delete user with ID ${req.params.id}`)
    });


const users = [{ name: "Rod", }, { name: "Wendy" }]
// param method middleware from express router for even more consolidation of dynamic routes...
router.param("id", (req, res, next, id) => {
    req.user = users[id]
    next()
})


module.exports = router