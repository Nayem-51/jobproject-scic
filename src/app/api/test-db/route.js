import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/dbConnect';

export async function GET() {
  try {
    // Test connection by getting a collection
    const collection = await getCollection('test');
    
    // Try to ping the database
    await collection.findOne({});
    
    return NextResponse.json({ 
      success: true, 
      message: 'MongoDB connected successfully!',
      database: process.env.NEXT_MONGODB_NAME 
    });
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'MongoDB connection failed',
      error: error.message 
    }, { status: 500 });
  }
}
