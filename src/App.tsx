import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./components/Header";
import Home from "./pages/home";
import PostDetail from "./pages/post/PostDetail";
import PostCreate from "./pages/post/PostCreate";
import PostEdit from "./pages/post/PostEdit";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/create" element={<PostCreate />} />
          <Route path="/edit/:id" element={<PostEdit />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;


