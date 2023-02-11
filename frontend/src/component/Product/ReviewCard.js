import React from "react";
import { Rating } from "@material-ui/lab";
import profilePng from "../../images/Profile.png";

function ReviewCard({ review }) {
  const options = {
    size: "large",
    // stars
    value: review.rating,
    // meaning we can't edit it
    readOnly: true,
    // for half star
    precision: 0.5
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
}

export default ReviewCard;
