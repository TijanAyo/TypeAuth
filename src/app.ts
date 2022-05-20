require('dotenv').config()
import express from "express"
import config from "config"
import connectDB from "./utils/connectdb.utils"
import logger from "./utils/logger.utils"
import router from "./routes"

const app = express()

app.use(router)

const port = config.get('port')

app.listen(port, ()=> {
    logger.info(`Server running on Port: ${port}`)

    connectDB()
})
