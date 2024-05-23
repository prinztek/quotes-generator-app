import { useEffect, useState } from "react";
import { Spinner } from "./Spinner.jsx";
import "./QuotesGenerator.css";

// "You have to believe in yourself when no one else does." Serena Williams

export const QuotesGenerator = () => {
  const [state, setState] = useState({
    data: {
      author: null,
      quote: null,
    },
    error: null,
  });

  useEffect(() => {
    console.log("Component Mounted");
    generateRandomQuote();
  }, []); // run once on mount

  const generateRandomQuote = async () => {
    try {
      // send a request to server
      const response = await fetch("http://localhost:8000/quote");

      if (response.status === 200) {
        const quoteArr = await response.json(); // console.log(quoteArr);
        const { author, quote } = quoteArr[0];
        // and use the result
        setState({ ...state, data: { author: author, quote: quote } });
      }
    } catch (error) {
      console.error(error);
      setState({ ...state, error: error });
    }
  };

  const errorComponent = () => {
    // return <div>Oops! Something went wrong. Please try again later.</div>;
    return <div>{`${state.error.message}`}</div>;
  };

  const renderQuoteComponent = () => {
    if (state.error) {
      return errorComponent();
    }

    if (!state.data.author && !state.data.quote) {
      return <Spinner />;
    }

    return (
      <>
        <p>{state.data.quote}</p>
        <p>{state.data.author}</p>
      </>
    );
  };

  return (
    <>
      <div>
        <h1>Quotes Generator</h1>
        <div id="quote-container">{renderQuoteComponent()}</div>
        <button onClick={generateRandomQuote}>Generate Random Quote</button>
      </div>
    </>
  );
};
