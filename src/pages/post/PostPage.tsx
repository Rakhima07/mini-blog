import { useEffect, useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import { Post } from '../../types/Post.ts';
import { getPostById  } from '../../axiosApi/axiosApi.ts';
import { Button , CircularProgress, Container, Typography} from '@mui/material';

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
        if (err instanceof Error) {
          console.error("Ошибка:", err.message);
        } else {
          console.error("Неизвестная ошибка", err);
        }
      }
       finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!post) return <Typography>Пост не найден</Typography>;

  return (
    <Container>
      <Typography variant="h4">{post.title}</Typography>
      <Typography>{post.content}</Typography>
      <Button onClick={() => navigate(`/post/${post.id}/edit`)} variant="outlined">
        Редактировать
      </Button>
    </Container>
  );
};

export default PostPage;