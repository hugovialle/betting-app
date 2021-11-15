/**
 * Connection to Mongo Database
 * @author Hugo Vialle
 * @date 11/11/2021
 */
const mongoose = require("mongoose")

mongoose
    .connect(`${process.env.MONGO_DB_URI}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then( () => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));