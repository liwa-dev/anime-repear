import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SearchInput = ({ handleSearch, setActiveSearch, handleCategoryClick, isPanelClose }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isCooldown, setIsCooldown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let cooldownTimer;

    if (isCooldown) {
      cooldownTimer = setTimeout(() => {
        setIsCooldown(false);
      }, 15000); // Set cooldown duration in milliseconds
    }

    return () => {
      clearTimeout(cooldownTimer);
    };
  }, [isCooldown]);

  const handleIconClick = () => {
    if (!isCooldown && searchValue.trim().length > 0) {
      setIsCooldown(true);

      const value = searchValue.trim() || 'test';
      console.log("You're searching: " + value);
      setSearchValue("");
      handleSearch(value);
      setActiveSearch(true);
      handleCategoryClick('search');
    }
  };
  const isSearchEmpty = searchValue.trim().length === 0;
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isCooldown && !isSearchEmpty) {
      e.preventDefault(); // Prevent form submission
      handleIconClick();
      console.log("enter searching")
      navigate("/dashboard/search/?q=" + searchValue);
    }
  };


  return (
    <>
      <input
        type="text"
        value={searchValue}
        placeholder="What anime are you looking for?"
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isCooldown}
      />
      {!isCooldown && !isSearchEmpty ? (
        <Link
          to={{
            pathname: '/dashboard/search',
            search: `?q=${searchValue ? searchValue : ''}`,
          }}
          onClick={handleIconClick}
        >
          <i className={`bx bx-search icon ${isPanelClose ? 'moveIconLitte' : ''}`}></i>
        </Link>
      ) : (
        <i className={`bx bx-search icon ${isPanelClose ? 'moveIconLitte' : ''}`} style={{ pointerEvents: 'none' }}></i>
      )}
    </>
  );
};

export default SearchInput;
