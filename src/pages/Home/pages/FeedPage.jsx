import React, { useState, useEffect } from "react";
import {  Box, TextField, Button } from "@mui/material";
import TweetComponent from "../../../components/TweetComponent";
import API from "../../../pages/Auth/axiosConfig";
import { toast } from "react-toastify";

const FeedPage = () => {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState("");

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    const response = await API.get("/api/tweets");
    setTweets(response.data);
  };

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
    <div style={{width:"100%", padding: "24px"}}>
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
};

export default FeedPage;
