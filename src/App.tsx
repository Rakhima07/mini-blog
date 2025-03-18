
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import PostPage from './pages/post/PostPage';
import PostEditPage from './pages/post/PostEdit';
import PostCreate from './pages/post/PostCreate';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/edit" element={<PostEditPage />} />
        <Route path="/create" element={<PostCreate />} />
      </Routes>
    </Router>
  );
};

export default App;

