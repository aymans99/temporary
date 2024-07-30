import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadMedia, createQuote } from "../../apiServices/api";

const QuoteCreationPage = ({ token }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await uploadMedia(file);
      const mediaUrl = response.data.url;
      await createQuote(token, text, mediaUrl);
      navigate("/listing");
      console.log("successfully created");
    } catch (error) {
      console.log("Failed to create quote", error);
    }
  };

  return (
    <div className="quote-container">
      <h1>Create Quote</h1>
      <form onSubmit={handleSubmit} className="quote-form">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Quote Text"
          required
          className="quote-textarea"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
          className="quote-file-input"
        />
        <button type="submit" className="quote-submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuoteCreationPage;
