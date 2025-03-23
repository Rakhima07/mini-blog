import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from "@mui/material";
import { Post } from "../types/Post";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";

interface PostCardProps {
  post: Post;
  onLike: () => void; 
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: "16px" }}>
      {post.imageUrl && (
        <CardMedia component="img" height="140" image={post.imageUrl} alt={post.title} />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.text ? (post.text.length > 100 ? `${post.text.substring(0, 100)}...` : post.text) : "Нет описания"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/post/${post.id}`}>
          Читать далее
        </Button>
        <Button size="small" color="error" component={Link} to={`/edit/${post.id}`}>
          Редактировать
        </Button>
      
        <LikeButton postId={post.id} currentLikes={post.likes} onLike={onLike} />
      </CardActions>
    </Card>
  );
};

export default PostCard;
