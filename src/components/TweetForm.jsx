import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

const TweetForm = ({ onTweetAdded }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${apiUrl}/api/tweets`, { content }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setContent('');
      if (onTweetAdded) onTweetAdded(data);
    } catch (error) {
      console.error('Error posting tweet:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="content"
        label="Co się dzieje?"
        name="content"
        autoComplete="content"
        autoFocus
        value={content}
        onChange={(e) => setContent(e.target.value)}
        multiline
        rows={3}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Tweetnij
      </Button>
    </Box>
  );
};

export default TweetForm;
