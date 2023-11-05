import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

function App() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetch('/blogdata.txt')
      .then((response) => response.text())
      .then((data) => {
        const lines = data.split('\n');
        const posts = lines.map((line, index) => {
          const [title, content, imageUrl] = line.split('|');
          return { id: index, title, content, imageUrl };
        });
        setBlogPosts(posts);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h3" sx={{ my: 3 }}>
        Mobilon BlogSpot
      </Typography>
      <Typography variant="h4" sx={{ my: 3 }}>
        Welcome to our Club's Blogs!
      </Typography>
      <Grid container spacing={2}>
        {blogPosts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image={post.imageUrl} 
                alt={post.title} 
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
