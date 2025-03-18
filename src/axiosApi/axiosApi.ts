
import axios from 'axios';
import {  Comment } from '../types/Comment';
import {  Post } from '../types/Comment';

const BASE_URL = 'https://mini-blog-debf9-default-rtdb.firebaseio.com/';


export const getPosts = async (): Promise<Post[]> => {
  const response = await axios.get<{ [key: string]: Post }>(`${BASE_URL}/posts.json`);
  if (!response.data) return [];
  return Object.keys(response.data).map(id => ({ id, ...response.data[id] }));
};

export const createPost = async (post: Omit<Post, 'id'>): Promise<void> => {
    await axios.post(`${BASE_URL}/posts.json`, post);
  };

export const getPostById = async (id: string): Promise<Post | null> => {
    const response = await axios.get<Post>(`${BASE_URL}/posts/${id}.json`);
    return response.data ? { id, ...response.data } : null;
  };
  

  export const updatePost = async (id: string, updatedPost: Post): Promise<void> => {
    await axios.put(`${BASE_URL}/posts/${id}.json`, updatedPost);
  };

export const deletePost = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/posts/${id}.json`);
};


export const addComment = async (postId: string, comment: Omit<Comment, 'id'>): Promise<Comment> => {
  const response = await axios.post<{ name: string }>(`${BASE_URL}/posts/${postId}/comments.json`, comment);
  return { id: response.data.name, ...comment };
};


export const deleteComment = async (postId: string, commentId: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/posts/${postId}/comments/${commentId}.json`);
};


export const likePost = async (postId: string, newLikes: number): Promise<void> => {
  await axios.patch(`${BASE_URL}/posts/${postId}.json`, { likes: newLikes });
};
