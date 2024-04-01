import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Box, TextField, Button, Avatar, Typography } from "@mui/material";
import API from "../../../pages/Auth/axiosConfig";
import { toast } from "react-toastify";
import TweetComponent from "../../../components/TweetComponent";

function ProfilePage() {
  let { userId } = useParams();
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState("");
  const [user, setUser] = useState(null);

  const fetchTweets = useCallback(async () => {
    const response = await API.get(`/api/tweets/user/${userId}`);
    setTweets(response.data);
  }, [userId]);

  const fetchUser = useCallback(async () => {
    try {
      const response = await API.get(`/api/user/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      toast.error("Failed to fetch user information.");
    }
  }, [userId]);

  useEffect(() => {
    fetchTweets();
    fetchUser();
  }, [fetchTweets, fetchUser]);

  const postTweet = async () => {
    try {
      await API.post("/api/tweets", { content: newTweet });
      fetchTweets();
    } catch (error) {
      console.error("Failed to create tweet:", error);
      toast.error("Failed to create tweet. Please try again later.");
    }
    setNewTweet("");
  };

  return (
    <div style={{ width: "100%", padding: "24px" }}>
      {user && (
        <Box display="flex" alignItems="center" marginBottom={4}>
          <Avatar alt={user.username} sx={{ mr: 2 }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6">{user.username}</Typography>
            <Typography variant="body2">{user.email}</Typography>
          </div>
        </Box>
      )}
      <Box my={4}>
        <TextField
          fullWidth
          variant="outlined"
          label="What’s happening?"
          value={newTweet}
          onChange={(e) => setNewTweet(e.target.value)}
        />
        <Button
          onClick={newTweet !== "" ? postTweet : null}
          variant="contained"
          color="primary"
          style={{ marginTop: 10 }}
        >
          Tweet
        </Button>
      </Box>
      {tweets.map((tweet) => (
        <TweetComponent
          key={tweet._id}
          tweet={tweet}
          fetchTweets={fetchTweets}
        />
      ))}
    </div>
  );
}

export default ProfilePage;
