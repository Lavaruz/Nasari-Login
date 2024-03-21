const express = require("express")
const router = express.Router()

router.get("/", function(req, res){
    res.render("LoginPage")
})
router.get("/welcome", function(req, res){
    res.render("Welcome")
})


module.exports = router