import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updateLikes } from '../../axiosApi/axiosApi.ts';
import { Button, CircularProgress, Container, Typography, Divider, Box } from '@mui/material';
import CommentForm from '../../components/Comment/CommentForm';
import { Post } from '../../types/Post';

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Пост не найден');
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostById(id);
        if (!fetchedPost) {
          setError('Пост не найден');
        } else {
          setPost(fetchedPost);
        }
      } catch (err: unknown) {
        setError('Ошибка при загрузке поста');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleLike = async () => {
    if (post) {
      const newLikes = post.likes + 1;
      await updateLikes(post.id, newLikes);
      setPost({ ...post, likes: newLikes }); 
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!post) return <Typography>Пост не найден</Typography>;

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h3" gutterBottom>{post.title}</Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Typography variant="body1" paragraph>{post.content}</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <Button
          onClick={() => navigate(`/post/${post.id}/edit`)}
          variant="outlined"
          color="primary"
          sx={{ minWidth: '150px' }}
        >
          Редактировать
        </Button>

        <Button
          onClick={handleLike}
          variant="contained"
          color="primary"
          sx={{ minWidth: '150px' }}
        >
          Лайк ({post.likes})
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>Комментарии:</Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <CommentForm postId={post.id} />

      {post.comments.length > 0 ? (
        <Box sx={{ marginTop: 2 }}>
          {post.comments.map((comment) => (
            <Box key={comment.id} sx={{ marginBottom: 2, padding: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
              <Typography variant="body2" color="textSecondary">{comment.name}:</Typography>
              <Typography variant="body1">{comment.text}</Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body2" color="textSecondary">Нет комментариев</Typography>
      )}
    </Container>
  );
};

export default PostPage;