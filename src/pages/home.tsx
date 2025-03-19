import { useEffect, useState } from 'react';
import { getPosts } from '../axiosApi/axiosApi.ts';
import PostCard from '../components/Post/PostCard';
import { Post } from '../types/Post';
import { Container, Typography, Grid, Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

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
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <CircularProgress style={{ display: 'block', margin: 'auto' }} />;
  if (error) return <Typography color="error" align="center">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h3" gutterBottom align="center">
        Все посты
      </Typography>
      
      <Button 
        component={Link} 
        to="/create" 
        variant="contained" 
        color="primary" 
        style={{ marginBottom: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
      >
        Создать новый пост
      </Button>

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
