import React, { useEffect, useState } from "react";
import { getPosts, updateLikes } from "../services/postApi";
import { Post } from "../types/Post";
import { Container, Grid, Typography, Button } from "@mui/material";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<{ [key: string]: Post }>({});

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  const handleLike = async (id: string, likes: number) => {
    const newLikes = likes + 1;
    await updateLikes(id, newLikes);
    setPosts((prev) => ({
      ...prev,
      [id]: { ...prev[id], likes: newLikes },
    }));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Мини-Блог
      </Typography>
      {Object.keys(posts).length === 0 ? (
        <Typography>Здесь пока нет постов. Создайте первый!</Typography>
      ) : (
        <Grid container spacing={3}>
          {Object.entries(posts).map(([id, post]) => (
            <PostCard key={id} post={{ ...post, id }} onLike={() => handleLike(id, post.likes)} />
          ))}
        </Grid>
      )}
      <Button variant="contained" color="primary" component={Link} to="/create">
        Создать пост
      </Button>
    </Container>
  );
};

export default Home;
