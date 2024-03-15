import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Tweet = ({ tweet }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{tweet.author.username}</Typography>
        <Typography variant="body2" color="text.secondary">
          {tweet.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Tweet;
