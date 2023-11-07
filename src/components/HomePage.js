import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';


const HomePage = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetch('/blogdata.txt')
      .then((response) => response.text())
      .then((data) => {
        const lines = data.split('\n');
        const posts = lines.map((line, index) => {
          const [title, subhead, imageUrl, markdownContent] = line.split('|');
          return { id: index, title, subhead, imageUrl, markdownContent };
        });
        setBlogPosts(posts);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h3" sx={{ my: 3 }}>
        Welcome to Mobilon&apos;s BlogSpot
      </Typography>
      <Grid container spacing={3}>
        {blogPosts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={post.imageUrl}
                  alt={post.title}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.subhead}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
