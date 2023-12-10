import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as client from "./client";

function Followings({ userId }) {
  const [followings, setFollowings] = useState(null);

  const fetchFollowings = async (userId) => {
    try {
      const fetchedFollowings = await client.findFollowings(userId);
      setFollowings(fetchedFollowings);
    } catch (error) {
      console.error("Error fetching followings:", error);
    }
  };

  useEffect(() => {
    fetchFollowings(userId);
  }, []);

  if (!followings || followings.length === 0) {
    return <div>No followings found.</div>;
  }

  return (
    <ListGroup>
      {followings.map((following, index) => (
        <ListGroup.Item key={index} action href={`/user/${following._id}`}>
          {following.followingId.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Followings;