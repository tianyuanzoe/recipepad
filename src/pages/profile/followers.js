import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as client from "./client";

function Followers({ userId }) {
  const [followers, setFollowers] = useState(null);

  const fetchFollowers = async (userId) => {
    try {
      const fetchedFollowers = await client.findFollowers(userId);
      setFollowers(fetchedFollowers);
    } catch (error) {
      console.error("Error fetching followings:", error);
    }
  };

  useEffect(() => {
    fetchFollowers(userId);
  }, []);

  if (!followers || followers.length === 0) {
    return <div>No followers found.</div>;
  }

  return (
    <ListGroup>
      {followers.map((follower, index) => (
        <ListGroup.Item key={index} action href={`/user/${follower._id}`}>
          {follower.followerId.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Followers;