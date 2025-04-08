import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import PageWrapper from "../global/PageWrapper ";

const LandingPage = () => {
  return (
    <PageWrapper>
      <div className="landing-container">
        <div className="overlay"></div>
        <div className="content">
          <h1 className="title">Welcome to Movie Mania</h1>
          <p className="subtitle">
            Your ultimate destination for movie reviews!
          </p>
          <Link to="/reviews" className="explore-btn">
            Explore Reviews
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LandingPage;
