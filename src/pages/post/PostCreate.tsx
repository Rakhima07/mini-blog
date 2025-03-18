import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../axiosApi/axiosApi.ts';
import PostForm from '../../components/Post/PostForm';
import { Post } from '../../types/Post';


const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async () => {
      const newPost: Omit<Post, 'id'> = {
        title,
        content,
        likes: 0,
        comments: [],
        createdAt: new Date().toISOString(),
      };
  
      await createPost(newPost);
      navigate('/'); 
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