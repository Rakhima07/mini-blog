import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, deletePost } from "../../services/postApi";
import { Post } from "../../types/Post";
import { Typography, Container, Button, Box } from "@mui/material";
import CommentList from "../../components/CommentList";
import CommentForm from "../../components/CommentForm";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    if (id) getPostById(id).then(setPost);
  }, [id]);

  const handleDeletePost = async () => {
    if (id) {
      await deletePost(id);
      navigate("/");
    }
  };

  if (!post) return <Typography>Пост не найден или был удален.</Typography>;

  return (
    <Container>
      <Typography variant="h3">{post.title}</Typography>
      <img src={post.imageUrl} alt={post.title} style={{ width: "100%", marginTop: "20px", borderRadius: 8 }} />
      <Typography sx={{ marginTop: 2 }}>{post.text}</Typography>

      <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleDeletePost}>
        Удалить пост
      </Button>

     
      <Typography variant="h5" sx={{ marginTop: 4 }}>Комментарии</Typography>
      <CommentList postId={id!} />

   
      {!showCommentForm && (
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => setShowCommentForm(true)}>
          Оставить комментарий
        </Button>
      )}

{showCommentForm && (
  <Box sx={{ mt: 2 }}>

    <Button variant="outlined" color="secondary" sx={{ mb: 1 }} onClick={() => setShowCommentForm(false)}>
      Отмена
    </Button>
    
 
    <CommentForm postId={id!} />
  </Box>
)}

    </Container>
  );
};

export default PostDetail;
