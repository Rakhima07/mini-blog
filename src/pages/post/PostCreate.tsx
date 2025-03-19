// src/pages/post/PostCreate.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../axiosApi/axiosApi'; // Убедитесь, что импорт корректен
import PostForm from '../../components/Post/PostForm';

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const newPost = { 
      title, 
      content, 
      likes: 0, 
      comments: [], 
      createdAt: new Date().toISOString() 
    };

    try {
      await createPost(newPost);  // Убедитесь, что функция createPost работает корректно
      navigate('/'); // Перенаправление на главную страницу после создания поста
    } catch (error) {
      console.error('Ошибка при создании поста:', error);
    }
  };

  return (
    <div>
      <h1>Создать новый пост</h1>
      <PostForm 
        title={title} 
        setTitle={setTitle} 
        content={content} 
        setContent={setContent} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
};

export default CreatePostPage;
