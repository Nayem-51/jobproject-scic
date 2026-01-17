import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/dbConnect';

// Example: Get all users from MongoDB
export async function GET() {
  try {
    const usersCollection = await getCollection('users');
    const users = await usersCollection.find({}).limit(10).toArray();
    
    return NextResponse.json({ 
      success: true, 
      count: users.length,
      users 
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

// Example: Create a new user
export async function POST(request) {
  try {
    const body = await request.json();
    const usersCollection = await getCollection('users');
    
    const result = await usersCollection.insertOne({
      ...body,
      createdAt: new Date()
    });
    
    return NextResponse.json({ 
      success: true, 
      insertedId: result.insertedId 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
