import React, { useState } from "react";
import { Card, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import API from "../pages/Auth/axiosConfig";

const TweetComponent = ({ tweet, fetchTweets }) => {
  const user = useSelector((state) => state.auth.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const tweetStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: "24px",
    padding: "16px 16px 0 16px ",
  };

  const cardFooterStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  };

  const iconStyle = {
    marginRight: "8px",
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(options);
  };

  const handleLike = async () => {
    try {
      await API.post(`/api/tweets/${tweet._id}/like`, {});
      fetchTweets();
    } catch (error) {
      console.error("Failed to like tweet:", error);
      toast.error("Failed to like tweet. Please try again later.");
    }
  };

  const handleRetweet = async () => {
    try {
      await API.post(`/api/tweets/${tweet._id}/retweet`, {});
      fetchTweets();
    } catch (error) {
      console.error("Failed to retweet:", error);
      toast.error("Failed to retweet. Please try again later.");
    }
  };

  const handleDelete = async () => {
    setAnchorEl(null);
    try {
      await API.delete(`/api/tweets/${tweet._id}`);
      fetchTweets();
    } catch (error) {
      console.error("Failed to delete tweet:", error);
      toast.error("Failed to delete tweet. Please try again later.");
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderOriginalTweet = (originalTweet) => (
    <Card style={{ padding: 16 }}>
      <Typography color="textSecondary" gutterBottom>
        @{originalTweet.author.username} • {formatDate(originalTweet.createdAt)}
      </Typography>
      <Typography variant="body1">{originalTweet.content}</Typography>
    </Card>
  );

  return (
    <Card style={tweetStyle} elevation={2}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="textSecondary" gutterBottom>
            @{tweet.author.username} • {formatDate(tweet.createdAt)}
          </Typography>

          {tweet.author._id === user._id && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleDelete}>
                  <DeleteIcon style={iconStyle} /> Delete
                </MenuItem>
              </Menu>
            </div>
          )}
        </div>

        {tweet.content && (
          <Typography variant="body1">{tweet.content}</Typography>
        )}

        {tweet.originalTweetId
          ? renderOriginalTweet(tweet.originalTweetId)
          : null}
      </div>

      <div style={cardFooterStyle}>
        <IconButton aria-label="like" onClick={handleLike}>
          {tweet.likes.some((like) => like === user._id) ? (
            <FavoriteIcon style={{...iconStyle, color: '#FF0000'}} />
          ) : (
            <FavoriteBorderIcon style={iconStyle} />
          )}

          <Typography>{tweet.likes.length}</Typography>
        </IconButton>
        <IconButton aria-label="comment">
          <ChatBubbleOutlineIcon style={iconStyle} />
          <Typography>{tweet.comments.length}</Typography>
        </IconButton>
        <IconButton aria-label="retweet" onClick={handleRetweet}>
          <RepeatIcon style={iconStyle} />
          <Typography>{tweet.retweets.length}</Typography>
        </IconButton>
      </div>
    </Card>
  );
};

export default TweetComponent;
