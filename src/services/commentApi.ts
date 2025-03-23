import axios from "axios";
import { Comment } from "../types/Comment";

const API_URL = "https://mini-blog-debf9-default-rtdb.firebaseio.com/posts";


export const addComment = async (postId: string, comment: Comment): Promise<void> => {
  await axios.post(`${API_URL}/${postId}/comments.json`, comment);
};


export const getComments = async (postId: string): Promise<{ [key: string]: Comment }> => {
  const response = await axios.get(`${API_URL}/${postId}/comments.json`);
  return response.data || {};
};


export const deleteComment = async (postId: string, commentId: string): Promise<void> => {
  await axios.delete(`${API_URL}/${postId}/comments/${commentId}.json`);
};
