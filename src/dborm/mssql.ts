const rootDir = (process.env.NODE_ENV && process.env.NODE_ENV == "production") ? 'build' : 'src'
const ext = (process.env.NODE_ENV && process.env.NODE_ENV == "production") ? 'js' : 'ts'
const DATABASE_URL = process.env.HOST_DATABASE_URL || process.env.DATABASE_URL;
export default {
   "synchronize": process.env.AUTO_SYNC || false,
   "type": "mssql",
   "host": "localhost",
   "port": parseInt((process.env.DB_PORT || 1433).toString()),
   "username": process.env.DB_USER || "sa",
   "password":  process.env.DB_PASSWORD || "super_duper_password",
   "database": process.env.DB || "database",
   "logging": true,
   "entities": [
      rootDir + "/entity/**/*."+ext
   ],
   "migrations": [
      rootDir + "/migration/**/*."+ext
   ],
   "subscribers": [
      rootDir + "/subscriber/**/*."+ext
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   },
   "options": {
      "encrypt": true,
      "enableArithAbort": true
   }
}