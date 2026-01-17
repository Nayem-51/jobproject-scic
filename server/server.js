require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { getCollection, testConnection } = require('./dbConnect');
const { ObjectId } = require('mongodb');

const app = express();
// Default to 3001 if not specified
const PORT = process.env.PORT || 3001; 
const DATA_FILE = path.join(__dirname, 'data', 'items.json');
const USE_MONGODB = !!process.env.MONGODB_URI || !!process.env.NEXT_MONGO_URI;

// Professional CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

// Helper to read data with error handling
const readData = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
             // Initialize with empty array if file doesn't exist
             return [];
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Data access error:", err.message);
        return [];
    }
};

// Helper to write data
const writeData = (data) => {
    try {
        // Ensure directory exists
        const dir = path.dirname(DATA_FILE);
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (err) {
        console.error("Data persistence error:", err.message);
        return false;
    }
};

// API Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', version: '1.0.0' });
});

// GET /api/items
app.get('/api/items', async (req, res) => {
    try {
        if (USE_MONGODB) {
            try {
                const collection = await getCollection('items');
                const items = await collection.find({}).sort({ createdAt: -1 }).toArray();
                console.log(`📦 Fetched ${items.length} items from MongoDB`);
                
                // Convert ObjectId to string for JSON response
                const formattedItems = items.map(item => ({
                    id: item._id ? item._id.toString() : item.id,
                    name: item.name,
                    description: item.description || '',
                    price: item.price,
                    image: item.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
                    category: item.category || "General",
                    createdAt: item.createdAt
                }));
                return res.json(formattedItems);
            } catch (dbError) {
                console.error('❌ MongoDB error fetching items:', dbError);
                // Fallback to empty array instead of error
                return res.json([]);
            }
        } else {
            const items = readData();
            console.log(`📄 Fetched ${items.length} items from JSON file`);
            res.json(items);
        }
    } catch (error) {
        console.error('❌ Error fetching items:', error);
        // Return empty array instead of error status
        res.json([]);
    }
});

// GET /api/items/:id
app.get('/api/items/:id', async (req, res) => {
    try {
        if (USE_MONGODB) {
            const collection = await getCollection('items');
            let item;
            
            // Try to find by ObjectId first, then by string id
            if (ObjectId.isValid(req.params.id)) {
                item = await collection.findOne({ _id: new ObjectId(req.params.id) });
            }
            
            if (!item) {
                item = await collection.findOne({ id: req.params.id });
            }
            
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }
            
            // Convert ObjectId to string
            const formattedItem = {
                ...item,
                id: item._id ? item._id.toString() : item.id,
                _id: undefined
            };
            return res.json(formattedItem);
        } else {
            const items = readData();
            const item = items.find(i => i.id === req.params.id);
            if (!item) return res.status(404).json({ message: 'Item not found' });
            res.json(item);
        }
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST /api/items
app.post('/api/items', async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;
        
        // Basic Validation
        if (!name || !price) {
            return res.status(400).json({ message: 'Invalid data: Name and Price are required.' });
        }

        const newItem = {
            name: name.trim(),
            description: description ? description.trim() : '',
            price: parseFloat(price),
            image: image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
            category: category || "General",
            createdAt: new Date().toISOString()
        };

        if (USE_MONGODB) {
            try {
                const collection = await getCollection('items');
                const result = await collection.insertOne(newItem);
                console.log('✅ Item saved to MongoDB with ID:', result.insertedId);
                
                // Fetch the inserted document to return it
                const insertedItem = await collection.findOne({ _id: result.insertedId });
                if (!insertedItem) {
                    throw new Error('Item was inserted but could not be retrieved');
                }
                
                const formattedItem = {
                    id: insertedItem._id.toString(),
                    name: insertedItem.name,
                    description: insertedItem.description || '',
                    price: insertedItem.price,
                    image: insertedItem.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
                    category: insertedItem.category || "General",
                    createdAt: insertedItem.createdAt
                };
                console.log('📤 Returning formatted item:', formattedItem);
                return res.status(201).json(formattedItem);
            } catch (dbError) {
                console.error('❌ MongoDB error saving item:', dbError);
                return res.status(500).json({ message: 'Failed to save item to database.' });
            }
        } else {
            // Fallback to JSON file storage
            const items = readData();
            newItem.id = String(items.length + 1 + Date.now());
            items.push(newItem);
            
            if (writeData(items)) {
                res.status(201).json(newItem);
            } else {
                res.status(500).json({ message: 'Failed to save item.' });
            }
        }
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST /api/login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    // Secure comparison using environment variables
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@luxedecor.com';
    const adminPass = process.env.ADMIN_PASSWORD || 'securepassword123';

    if (email === adminEmail && password === adminPass) {
        return res.json({ 
            success: true, 
            user: { 
                name: 'Administrator', 
                email: adminEmail,
                role: 'admin',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            } 
        });
    }
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
});

// Initialize MongoDB connection on startup
if (USE_MONGODB) {
    testConnection().then(connected => {
        if (connected) {
            console.log('✅ MongoDB connected successfully');
        } else {
            console.log('⚠️  MongoDB connection failed. Using fallback JSON storage.');
        }
    }).catch(err => {
        console.log('⚠️  MongoDB not configured. Using JSON file storage.');
    });
} else {
    console.log('📄 Using JSON file storage (MongoDB not configured)');
}

app.listen(PORT, () => {
    console.log(`🚀 API Server running on port ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});
