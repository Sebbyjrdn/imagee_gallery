// src/routes/api/images.ts
import { db } from '$lib/db';  // Assuming you have already set up the db connection
import { RequestHandler } from '@sveltejs/kit';  // For typing the request handler

// Define the API handler for GET requests
export const GET: RequestHandler = async () => {
  try {
    // Fetch images from the database (assuming the table is called 'images')
    const images = await db.select().from('images');  // Adjust your query to match your schema

    if (images.length === 0) {
      return {
        status: 404,
        body: { success: false, message: 'No images found.' }
      };
    }

    return {
      status: 200,
      body: { success: true, images }
    };
  } catch (error) {
    console.error('Error fetching images from the database:', error);
    return {
      status: 500,
      body: { success: false, message: 'Failed to fetch images' }
    };
  }
};
