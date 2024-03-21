const express = require("express")
const { Register, Login, Logout, Refresh } = require("../controller/auth.controller")
const router = express.Router()

router.get("/refresh", Refresh)
router.post("/register", Register)
router.post("/login", Login)
router.post("/logout", Logout)

module.exports = router