import React from "react";
import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null; // Hide pagination if only 1 page

  return (
    <Pagination className="mt-3">
      {/* Previous Button */}
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => {
        const pageNum = index + 1;
        return (
          <Pagination.Item
            key={pageNum}
            active={pageNum === currentPage}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </Pagination.Item>
        );
      })}

      {/* Next Button */}
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

PaginationComponent.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationComponent;
