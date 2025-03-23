import React, { useEffect, useState } from "react";
import { getComments, deleteComment } from "../services/commentApi";
import { Comment } from "../types/Comment";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface CommentListProps {
  postId: string;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const [comments, setComments] = useState<{ [key: string]: Comment }>({});

  useEffect(() => {
    getComments(postId).then(setComments);
  }, [postId]);

  const handleDelete = async (commentId: string) => {
    await deleteComment(postId, commentId);
    setComments((prev) => {
      const newComments = { ...prev };
      delete newComments[commentId];
      return newComments;
    });
  };

  return (
    <List>
      {Object.entries(comments).map(([id, comment]) => (
        <ListItem key={id} secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(id)}>
            <DeleteIcon />
          </IconButton>
        }>
          <ListItemText primary={comment.author} secondary={comment.text} />
        </ListItem>
      ))}
    </List>
  );
};

export default CommentList;
