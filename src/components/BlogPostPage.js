import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CircularProgress } from '@mui/material';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const containerStyle = {
  padding: '16px',
};

const loadingContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const BlogPostPage = () => {
  const { postId } = useParams(); // Get the postId from the URL parameters

  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const markdownFilePath = `/articles/${postId}.md`; // Construct the path based on the postId

    const fetchMarkdownContent = async () => {
      try {
        const response = await fetch(markdownFilePath);
        if (response.ok) {
          const data = await response.text();
          setMarkdownContent(data);
        } else {
          console.error('Post not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Markdown content:', error);
        setLoading(false);
      }
    };

    fetchMarkdownContent();
  }, [postId]);
  return (
    <div style={containerStyle}>
      {loading ? (
        <div style={loadingContainerStyle}>
          <CircularProgress />
        </div>
      ) : (
        <Card elevation={3}>
          <Markdown remarkPlugins={[remarkGfm]}>{markdownContent}</Markdown>
        </Card>
      )}
    </div>
  );
};

export default BlogPostPage;
