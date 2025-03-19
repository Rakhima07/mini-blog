import axios from 'axios';
import { Post } from '../types/Post';

const API_URL = 'https://mini-blog-debf9-default-rtdb.firebaseio.com/';

// Функция для получения поста по id
export const getPostById = async (postId: string) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${postId}.json`);
    const postData = response.data;
    if (!postData) return null;

    return {
      id: postId,
      title: postData.title,
      content: postData.content,
      likes: postData.likes || 0,
      comments: postData.comments || [],
      createdAt: postData.createdAt,
    };
  } catch (error) {
    console.error('Ошибка при получении поста:', error);
    throw new Error('Ошибка при загрузке поста');
  }
};

// Функция для обновления лайков поста
export const updateLikes = async (postId: string, newLikes: number) => {
  try {
    await axios.patch(`${API_URL}/posts/${postId}.json`, {
      likes: newLikes,
    });
  } catch (error) {
    console.error('Ошибка при обновлении лайков:', error);
    throw new Error('Ошибка при обновлении лайков');
  }
};

// Функция для создания нового поста
// src/axiosApi/axiosApi.ts
;


export const createPost = async (newPost: Omit<Post, 'id'>) => {
  try {
    const response = await axios.post(`${API_URL}/posts.json`, newPost);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании поста:', error);
    throw new Error('Ошибка при создании поста');
  }
};


// Функция для получения всех постов
export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get(`${API_URL}/posts.json`);
    const postsData = response.data;
    if (!postsData) return [];

    return Object.keys(postsData).map((id) => ({
      id,
      title: postsData[id].title,
      content: postsData[id].content,
      likes: postsData[id].likes || 0,
      comments: postsData[id].comments || [],
      createdAt: postsData[id].createdAt,
    }));
  } catch (error) {
    console.error('Ошибка при получении списка постов:', error);
    throw new Error('Ошибка при загрузке постов');
  }
};

// Функция для добавления комментария к посту
export const addComment = async (postId: string, comment: { name: string; text: string }) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${postId}.json`);
    const postData = response.data;

    const newComments = postData.comments || [];
    newComments.push(comment);

    await axios.patch(`${API_URL}/posts/${postId}.json`, {
      comments: newComments,
    });
  } catch (error) {
    console.error('Ошибка при добавлении комментария:', error);
    throw new Error('Ошибка при добавлении комментария');
  }
};

// Функция для обновления поста
export const updatePost = async (postId: string, updatedPost: Omit<Post, 'id'>) => {
  try {
    await axios.patch(`${API_URL}/posts/${postId}.json`, updatedPost);
  } catch (error) {
    console.error('Ошибка при обновлении поста:', error);
    throw new Error('Ошибка при обновлении поста');
  }
};
