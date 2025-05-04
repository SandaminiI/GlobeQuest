import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search for a country..."
      className="border rounded p-2 w-full"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
