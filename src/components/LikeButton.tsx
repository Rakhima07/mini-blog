import React from "react";
import { IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface LikeButtonProps {
  postId: string;
  currentLikes: number;
  onLike: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ currentLikes, onLike }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography>{currentLikes}</Typography>
      <IconButton onClick={onLike} color="error">
        <FavoriteIcon />
      </IconButton>
    </div>
  );
};

export default LikeButton;
