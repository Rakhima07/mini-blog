import { useEffect, useState } from 'react';
import {  getPosts } from '../axiosApi/axiosApi.ts';
import PostCard from '../components/Post/PostCard';
import { Post } from '../types/Post';
import { Container, Typography, Grid } from '@mui/material';



const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Ошибка при загрузке постов: ${err.message}`);
        } else {
          setError('Неизвестная ошибка');
        }
      }finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Все посты
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;