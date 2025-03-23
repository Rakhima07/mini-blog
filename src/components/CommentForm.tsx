import React, { useState } from "react";
import { addComment } from "../services/commentApi";
import { TextField, Button, Box } from "@mui/material";

interface CommentFormProps {
  postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (author.trim() && text.trim()) {
      await addComment(postId, { id: Date.now().toString(), author, text });
      setAuthor("");
      setText("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField label="Имя" fullWidth value={author} onChange={(e) => setAuthor(e.target.value)} required />
      <TextField label="Комментарий" fullWidth multiline rows={3} value={text} onChange={(e) => setText(e.target.value)} required />
      <Button type="submit" variant="contained" color="primary">
        Добавить комментарий
      </Button>
    </Box>
  );
};

export default CommentForm;
