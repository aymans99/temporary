import React from "react";

const Quote = ({ quote }) => {
  const defaultImage =
    "https://unsplash.com/photos/a-red-and-black-photo-of-a-chain-on-a-black-background-fNnPjQ9_dCE";

  // Check if mediaUrl is null or undefined, or if it's an empty string
  const imageUrl = quote.mediaUrl ? quote.mediaUrl : defaultImage;
  console.log(imageUrl);

  return (
    <div className="box">
      <img
        src={imageUrl}
        className="box-img"
        alt={quote.text || "default image"}
      />
      <h3>{quote.text}</h3>
      <p>{quote.username}</p>
    </div>
  );
};

export default Quote;
