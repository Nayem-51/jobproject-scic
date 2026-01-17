import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.NEXT_MONGO_URI;
const dbName = process.env.NEXT_MONGODB_NAME;

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env file');
}

if (!dbName) {
  throw new Error('Please add your MongoDB database name to .env file');
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the client across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise
export default clientPromise;

// Helper function to get a specific collection
export const getCollection = async (collectionName) => {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    return db.collection(collectionName);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};



// Legacy export for backward compatibility
export const dbConnect = async (collectionName) => {
  return getCollection(collectionName);
};