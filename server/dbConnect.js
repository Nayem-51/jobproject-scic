const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI || process.env.NEXT_MONGO_URI;
const dbName = process.env.MONGODB_NAME || process.env.NEXT_MONGODB_NAME || 'nextjs_db';

if (!uri) {
  console.warn('⚠️  MongoDB URI not found. Please add MONGODB_URI to .env file');
}

// Create a MongoClient with a MongoClientOptions object
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
};

let client;
let clientPromise;

if (!uri) {
  clientPromise = null;
} else {
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
}

// Helper function to get a specific collection
const getCollection = async (collectionName) => {
  if (!clientPromise) {
    throw new Error('MongoDB URI not configured. Please add MONGODB_URI to .env file');
  }
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    return db.collection(collectionName);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Test connection
const testConnection = async () => {
  if (!clientPromise) {
    return false;
  }
  try {
    const client = await clientPromise;
    await client.db(dbName).admin().ping();
    return true;
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    return false;
  }
};

module.exports = {
  getCollection,
  testConnection,
  clientPromise
};
