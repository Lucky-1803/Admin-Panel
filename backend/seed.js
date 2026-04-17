const mongoose = require('mongoose')
const {faker} = require("@faker-js/faker")
require("dotenv").config()
const User = require("./Models/User")



const seedUsers = async()=>{
    try {
        await User.deleteMany({role:"user"})

        const users = []

        for (let i = 0; i < 10000; i++) {
            users.push({
                name : faker.person.fullName(),
                email : faker.internet.email()+i,
                password: "123456",
                status : Math.random() >0.5 ? "active" : "inactive",
                role : "user"
            })            
        }
        await User.insertMany(users)
        console.log("10000 users added successfully")
        process.exit()

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

mongoose.connect(process.env.MONGO_URL).then(()=>{ console.log("MongoDB connected for seeding"); seedUsers()}).catch(err => console.log(err))

