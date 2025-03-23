import React, { useState } from "react";
import { createPost } from "../../services/postApi";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";

const PostCreate: React.FC = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await createPost({ title, text, imageUrl, likes: 0 });
    navigate("/");
  };

  return (
    <Container>
      <TextField label="Заголовок" fullWidth onChange={(e) => setTitle(e.target.value)} />
      <TextField label="Текст" fullWidth multiline rows={4} onChange={(e) => setText(e.target.value)} />
      <TextField label="Ссылка на изображение" fullWidth onChange={(e) => setImageUrl(e.target.value)} />
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Опубликовать
      </Button>
    </Container>
  );
};

export default PostCreate;
