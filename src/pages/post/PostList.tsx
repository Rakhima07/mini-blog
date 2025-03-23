import React, { useEffect, useState } from "react";
import { getPosts, updateLikes } from "../../services/postApi";
import { Post } from "../../types/Post";
import PostCard from "../../components/PostCard";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then((data) =>
      setPosts(Object.entries(data).map(([id, postData]) => ({ id, ...(postData as Post) })))
    );
  }, []);

  const handleLike = async (id: string, likes: number) => {
    const newLikes = likes + 1;
    await updateLikes(id, newLikes);
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, likes: newLikes } : post))
    );
  };

  return (
    <div>
      <h1>Список постов</h1>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onLike={() => handleLike(post.id, post.likes)} />
      ))}
    </div>
  );
};

export default PostList;
