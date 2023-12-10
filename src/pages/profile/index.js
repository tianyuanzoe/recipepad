import React from "react";
import { Tab, Tabs, Container } from "react-bootstrap";
import * as client from "./client";
import UserListTab from "./userlist";
import UserInfoTab from "./userinfo";
import CommentsTab from "./comments";
import FavoritesTab from "./favorites";
import userData from "./userData.json";
import commentsData from "./commentsData.json";
import favoritesData from "./favoritesData.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import FollowingsTab from "./followings";
import FollowersTab from "./followers";

const Profile = () => {
  const params = useParams();
  const userId = params.userId; // Assuming the URL contains the user ID
  // const user = userData.find(u => u.id === userId);
  const comments = commentsData;
  const favorites = favoritesData;

  const [account, setAccount] = useState(null);
  const [user, setUser] = useState(null);
  const [type, setType] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const findUserById = async (userId) => {
    const user = await client.findUserById(userId);
    setUser(user);
    setType('guest');
  };

  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
    setType('account');
    console.log(account);
  };

  useEffect(() => {
    console.log("useEffect executed");
    if (userId) {
      console.log(userId);
      findUserById(userId);
    } else {
      console.log("here");
      fetchAccount();
    }
  }, []);

  if (!account && !user) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container>
      <h1>Profile</h1>
      <Tabs defaultActiveKey="userInfo" id="profile-tabs">
        <Tab eventKey="userList" title="User List">
          <UserListTab />
        </Tab>
        <Tab eventKey="userInfo" title="User Information">
          <UserInfoTab user={account || user} type={type} />
        </Tab>
        <Tab eventKey="followings" title="Followings">
          <FollowingsTab userId={userId} />
        </Tab>
        <Tab eventKey="followers" title="Follower">
          <FollowersTab userId={userId} />
        </Tab>
        <Tab eventKey="favorites" title="Favorites">
          <FavoritesTab userId={userId} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Profile;