const rootDir = (process.env.NODE_ENV && process.env.NODE_ENV == "production") ? 'build' : 'src'
const ext = (process.env.NODE_ENV && process.env.NODE_ENV == "production") ? 'js' : 'ts'
const DATABASE_URL = process.env.HOST_DATABASE_URL || process.env.DATABASE_URL;
export default {
   "synchronize": process.env.AUTO_SYNC || false,
   "type": "mysql",
   "host": "localhost",
   "port": process.env.DB_PORT || 3306,
   "username": process.env.BD_USER || "root",
   "password":  process.env.DB_PASSWORD || "",
   "database": process.env.DB || "database",
   "logging": false,
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
   }
}