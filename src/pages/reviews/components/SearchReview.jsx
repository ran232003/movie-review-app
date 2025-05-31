import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, FormControl, InputGroup } from "react-bootstrap";

function SearchReview({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };
  return (
    <div className="mainRevSearch">
      {/* <FormControl
        type="text"
        placeholder="Search reviews..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      /> */}
      <Form style={{ width: "50%" }}>
        <InputGroup>
          <FormControl
            value={searchTerm}
            onChange={handleChange}
            type="text"
            placeholder="Search for a movie..."
          />
        </InputGroup>
      </Form>
    </div>
  );
}

SearchReview.propTypes = {};

export default SearchReview;
