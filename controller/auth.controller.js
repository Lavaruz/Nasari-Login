const {User} = require("../model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config();


async function Register(){
    let data = {
        username: "nasari",
        password: "123"
    }
    try {
        const foundUser = await User.findOne({
            where: {
                username: data.username
            }
        })

        if(!foundUser){
            console.log("user not found make a new one");
            hashPassword(data.password)
                .then(async function(hashedPassword){
                    data.password = hashedPassword
                    await User.create(data)
                })
        }else{
            console.log("nasari already exist");
        }
    } catch (error) {
        console.error("gagal membuat user", error);
    }
}

async function Login(req,res){
    const {username, password} = req.body

    if(!username || !password) return res.status(400).json({message: "all field required"})

    const foundUser = await User.findOne({where: {username}})

    if(!foundUser) return res.status(400).json({message: "User tidak ditemukan"})

    const match = await bcrypt.compare(password, foundUser.password)

    if(!match) return res.status(401).json({message: "Username atau password salah"})

    const accessToken = jwt.sign({
            username: username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15s"} 
    )

    const refreshToken = jwt.sign({
            username: username
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "1d"} 
    )

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.json({accessToken})
}

async function Refresh(req,res){
    const cookies = req.cookies

    if(!cookies?.refreshToken) return res.status(400).json({message: "Dont have refresh token"})

    const refreshToken = cookies.refreshToken

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if(err) return res.status(400).json({message: "Unauthorized, refresh token invalid"})

        const foundUser = await User.findOne({where: {username: decoded.username}})

        if(!foundUser) return res.status(400).json({message: "user not found on refresh token"})

        const accessToken = jwt.sign({
                username: decoded.username
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "15s"} 
        )

        res.json({accessToken})
    })
}

async function Logout(req,res){
    const cookies = req.cookies
    if(!cookies?.refreshToken) return res.sendStatus(204)
    res.clearCookie("refreshToken")
    res.redirect("/")
}







async function hashPassword(plainPassword) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(plainPassword, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error('Error hashing password');
    }
  };

module.exports = {
    Register,
    Login,
    Logout,
    Refresh
}