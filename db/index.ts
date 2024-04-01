// import all modules from mongodb
import * as mongoDB from 'mongodb';

// export collections as an object, each collection is a property as type mongoDB.Collection
export const collections: { confessions?: mongoDB.Collection } = {};

// const uri = process.env.MONGODB_URI;

// export the function to connect to the database
export async function connectToDB() {
  // create a new client
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGODB_URI);
  // connect to the client
  await client.connect();
  // get the database
  const db: mongoDB.Db = client.db(process.env.MONGODB_DB_NAME);
  // add the collections to the collections object
  collections.confessions = db.collection(process.env.MONGODB_COLLECTION_NAME);
  // Log successful connection to the database collection
  console.log(`Successfully connected to database: ${db.databaseName} and collections: ${collections}`);
}


/* Don't know if this is needed:

// export the function to close the connection to the database
export async function close() {
  // close the connection to the database
  await collections.confessions?.client.close();
  // Log successful closing of the database connection
  console.log(`Successfully closed connection to database: ${collections.confessions?.client}`);
}
*/