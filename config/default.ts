require('dotenv').config()

export default {
    port: 3030,
    dbURI: `mongodb+srv://Tijan:${process.env.db_pass}@getting-started-with-no.sdrkl.mongodb.net/${process.env.db_name}?retryWrites=true&w=majority`,
    loglevel: 'info'
}