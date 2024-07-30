import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getQuotes } from "../../apiServices/api";
import Quote from "./Quote";

const Listing = ({ token }) => {
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuotes();
  }, [offset]);

  const fetchQuotes = async () => {
    try {
      const response = await getQuotes(token, 20, offset);
      console.log(response);

      // Check if the response data is an array
      if (Array.isArray(response.data.data)) {
        if (response.data.data.length === 0) {
          setHasMore(false);
        } else {
          setQuotes((prevQuotes) => [...prevQuotes, ...response.data.data]);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch quotes", error);
    }
  };

  const handleCreateQuote = () => {
    navigate("/create-quote");
  };

  return (
    <div>
      <h1>Quotes</h1>
      {quotes.length > 0 &&
        quotes.map((quote) => <Quote key={quote.id} quote={quote} />)}
      {hasMore && (
        <button onClick={() => setOffset(offset + 20)}>Load More</button>
      )}
      <button
        onClick={handleCreateQuote}
        style={{ position: "fixed", bottom: 20, right: 20 }}
      >
        Create Quote
      </button>
    </div>
  );
};

export default Listing;
