import { Container, Box, TextField, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../../services/postApi"; // Убедись, что эти функции есть в postApi.ts

const EditPost = () => {
  const { id } = useParams<{ id: string }>(); // Получаем ID поста из URL
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  
  useEffect(() => {
    if (id) {
      getPostById(id).then((post) => {
        if (post) {
          setTitle(post.title);
          setContent(post.text); 
        }
      });
    }
  }, [id]);


  const handleSave = async () => {
    if (id) {
      await updatePost(id, { title, text: content }); 
      console.log("Сохранено:", { title, content });
      navigate(`/post/${id}`);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: "center" }}>
        Редактирование поста
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        <TextField
          label="Заголовок"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Содержание"
          variant="outlined"
          fullWidth
          multiline
          minRows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Сохранить
        </Button>
      </Box>
    </Container>
  );
};

export default EditPost;
