import axios from 'axios';
import { BackgroundImage } from '../types';

const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export const fetchRandomBackground = async (): Promise<BackgroundImage | null> => {
  try {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: { 
        query: 'landscape', 
        client_id: UNSPLASH_ACCESS_KEY 
      }
    });
    return {
      url: response.data.urls.full,
      author: response.data.user.name
    };
  } catch (error) {
    console.error('Failed to fetch background:', error);
    return null;
  }
};