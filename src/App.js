import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage';
import BlogPostPage from './components/BlogPostPage';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/post/:postId" element= {<BlogPostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
