import axios from "axios";
import { Post } from "../types/Post";
import { db, storage } from "./firebase";
import { ref, update, push, remove } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const API_URL = "https://mini-blog-debf9-default-rtdb.firebaseio.com/posts";


export const getPosts = async (): Promise<{ [key: string]: Post }> => {
  const response = await axios.get(`${API_URL}.json`);
  return response.data || {};
};


export const getPostById = async (id: string): Promise<Post | null> => {
  const response = await axios.get(`${API_URL}/${id}.json`);
  return response.data || null;
};


export const createPost = async (post: Omit<Post, "id">, file?: File): Promise<string> => {
  let imageUrl = "";

  if (file) {
    const imageRef = storageRef(storage, `posts/${file.name}`);
    await uploadBytes(imageRef, file);
    imageUrl = await getDownloadURL(imageRef);
  }

  const response = await axios.post(`${API_URL}.json`, { ...post, imageUrl });
  return response.data.name;
};


export const updatePost = async (id: string, post: Partial<Post>, file?: File): Promise<void> => {
  let imageUrl = post.imageUrl || "";

  if (file) {
    const imageRef = storageRef(storage, `posts/${file.name}`);
    await uploadBytes(imageRef, file);
    imageUrl = await getDownloadURL(imageRef);
  }

  await axios.patch(`${API_URL}/${id}.json`, { ...post, imageUrl });
};


export const deletePost = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}.json`);
};


export const addComment = async (postId: string, comment: { name: string; text: string }) => {
  const commentRef = ref(db, `posts/${postId}/comments`);
  await push(commentRef, comment);
};


export const deleteComment = async (postId: string, commentId: string) => {
  const commentRef = ref(db, `posts/${postId}/comments/${commentId}`);
  await remove(commentRef);
};


export const updateLikes = async (postId: string, newLikes: number) => {
  try {
    await update(ref(db, `posts/${postId}`), { likes: newLikes });
  } catch (error) {
    console.error("Ошибка при обновлении лайков:", error);
  }
};
