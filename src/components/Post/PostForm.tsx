import React from 'react';
import { TextField, Button } from '@mui/material';


interface PostFormProps {
    title: string;
    setTitle: (value: string) => void;
    content: string;
    setContent: (value: string) => void;
    onSubmit: () => void;
  }
  
  const PostForm: React.FC<PostFormProps> = ({ title, setTitle, content, setContent, onSubmit }) => {
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}>
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
          Создать пост
        </Button>
      </form>
    );
  };
  
  export default PostForm;