import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import { Post } from '../../types/Post';
import { getPostById, updatePost } from '../../axiosApi/axiosApi.ts';

const PostEditPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const postData = await getPostById(id); 
          if (!postData) {
            setError('Пост не найден');
            return;
          }
          setPost(postData);
          setTitle(postData.title);
          setContent(postData.content);
        } catch (err) {
          setError('Ошибка при загрузке поста');
          console.error('Ошибка при загрузке поста:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return; 

    const updatedPost: Post = {
      id,
      title,
      content,
      likes: post?.likes || 0,
      comments: post?.comments || [],
      createdAt: post?.createdAt || new Date().toISOString(),
    };

    try {
      await updatePost(id, updatedPost); 
      navigate(`/post/${id}`); 
    } catch (err) {
      setError('Ошибка при обновлении поста');
      console.error('Ошибка при обновлении поста:', err);
    }
  };

  if (loading) {
    return <Typography>Загрузка...</Typography>;
  }

  if (!post) {
    return <Typography>Пост не найден.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Редактировать пост
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Заголовок"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Содержание"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          margin="normal"
        />
        <Button variant="contained" type="submit" color="primary">
          Сохранить
        </Button>
      </form>
    </Container>
  );
};

export default PostEditPage;

