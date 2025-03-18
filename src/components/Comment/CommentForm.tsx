
import React, { useState } from 'react';
import { addComment } from '../../axiosApi/axiosApi';

interface CommentFormProps {
    postId: string;
  }
  
  const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (author && text) {
        // Заменил name на author
        await addComment(postId, {  author, text }); 
        setAuthor('');
        setText('');
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Имя"
          required
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Комментарий"
          required
        />
        <button type="submit">Добавить</button>
      </form>
    );
  };
  
  export default CommentForm;