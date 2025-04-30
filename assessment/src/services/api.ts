import { Post } from '../types/Post';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function fetchPosts(page = 1, limit = 10): Promise<Post[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/posts?_page=${page}&_limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}
