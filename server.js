const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser")
const multer = require("multer");
const app = express()
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/files/uploads");
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, Date.now() + Math.floor(Math.random() * 99) + 1 + "." + extension);
    },
});

app.use(cors())
app.use(multer({ storage: storage, limits: { fileSize: 200000 } }).any());
app.use(cookieParser())
app.use(express.json())

app.use("/", express.static(path.join(__dirname, "./public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

const viewRouter = require('./router/views.router')
const authRouter = require('./router/auth.router')
const db = require('./model')
const { Register } = require('./controller/auth.controller')

app.use("/", viewRouter)
app.use("/api/v1/auth", authRouter)

db.sequelize.sync({ alter: true }).then(() => {
    Register()
    app.listen(3000, () => {
        console.log("http://localhost:3000/")
    })
});