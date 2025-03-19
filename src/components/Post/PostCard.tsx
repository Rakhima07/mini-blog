import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../types/Post';
import { Card, CardContent, Typography, Button } from '@mui/material';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{post.title}</Typography>
        <Typography variant="body2">{post.content.slice(0, 100)}...</Typography>
        <Typography variant="caption">Лайков: {post.likes}</Typography>
        <Button component={Link} to={`/post/${post.id}`} size="small">
          Читать
        </Button>
      </CardContent>
    </Card>
  );
};

export default PostCard;
