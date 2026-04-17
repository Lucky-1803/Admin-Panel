const   express = require ('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
dotenv.config()
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

connectDB()

app.use("/api/auth" , require("./Controllers/auth.controller"))
app.use("/api/users", require("./Controllers/user.controller"))

app.get('/', (req,res)=>{
    res.send('API is running...')
})

const PORT = process.env.PORT || 8000

app.listen(PORT , ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})