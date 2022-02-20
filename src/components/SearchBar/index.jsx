import React, { useEffect, useRef, useState, useCallback } from 'react';
import './searchBar.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import { useDebauncer } from '../../utils';
import { useAuth } from '../../contexts/Auth';
import { SearchContentCard } from '../SearchContentCard';

const containerTransition = {
  type: 'spring',
  damping: 22,
  stiffness: 150,
};

export const SearchBar = (props) => {
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickOutside] = useClickOutside();
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [searchDataDB, setSearchDataDB] = useState([]);
  const [searchFieldHeight, setSearchFieldHeight] = useState('150');
  const [notFound, setNotFound] = useState(false);

  const containerVariants = {
    expanded: {
      height: `${searchFieldHeight}px`,
      zIndex: '10',
    },
    collapsed: {
      height: '1.8em',
      zIndex: '10',
    },
  };

  const navigate = useNavigate();

  const isEmpty = !searchDataDB || searchDataDB.length === 0;

  const { user, client } = useAuth();

  const changeHandler = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    if (!searchQuery || searchQuery.trim() === '') {
      setSearchFieldHeight('150');
    }
  };

  const expandSearchBar = () => {
    setExpanded(true);
  };

  const collapseSearchBar = () => {
    setExpanded(false);
    setSearchQuery('');
    setSearchDataDB([]);
    setNotFound(false);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleCross = useCallback(() => {
    setSearchQuery('');
    setSearchFieldHeight('150');
  }, []);

  useEffect(() => {
    if (searchDataDB.length) {
      setSearchFieldHeight(`${searchDataDB.length * 100}`);
    } else {
      setSearchFieldHeight('150');
    }
  }, [searchDataDB]);

  useEffect(() => {
    if (isClickOutside) collapseSearchBar();
  }, [isClickOutside]);

  const SearchSeparator = useCallback(
    () => <span className="search__separator" />,
    []
  );

  const SearchContent = useCallback(
    ({ children }) => <div className="search__content">{children}</div>,
    []
  );

  useEffect(() => {
    if (!searchQuery) setSearchDataDB([]);
  }, [searchQuery]);

  //  TODO: implement user input sanitization ?

  const sanitize = (query) => {
    const cleanedQuery = query.trim().toLowerCase();
    return cleanedQuery;
  };

  const filterDubs = (arr) => {
    const set = new Set();
    const unique = arr.filter((item) => {
      const isInSet = set.has(item.id);
      set.add(item.id);
      return !isInSet;
    });
    return unique;
  };

  const searchDB = async () => {
    if (!searchQuery || searchQuery.trim() === '') return;
    setLoading(true);
    const searchItems = [];
    if (user) {
      await client
        .from(`boards`)
        .select('*')
        .like('title', `%${sanitize(searchQuery)}%`)
        .then(({ data, error }) => {
          if (!error && data.length) {
            searchItems.push(...data);
          }
        });

      await client
        .from(`boards`)
        .select('*')
        .like('description', `%${sanitize(searchQuery)}%`)
        .then(({ data, error }) => {
          if (!error && data.length) {
            searchItems.push(...data);
          }
        });

      if (searchItems.length) {
        setSearchDataDB(filterDubs(searchItems));
        setNotFound(false);
      } else setNotFound(true);
    }
    setLoading(false);
  };

  useDebauncer(searchQuery, 500, searchDB);

  return (
    <motion.div
      className="header__search __container"
      id="search-box"
      animate={isExpanded ? 'expanded' : 'collapsed'}
      variants={containerVariants}
      transition={containerTransition}
      ref={parentRef}
    >
      <form className="search__input __container">
        <i className="bi bi-search" />
        <input
          className="search__input"
          type="search"
          placeholder="Search"
          name="header-search"
          onFocus={expandSearchBar}
          ref={inputRef}
          value={searchQuery}
          onChange={changeHandler}
        />
        {isExpanded && <i className="bi bi-x-circle" onClick={handleCross} />}
      </form>
      {isExpanded && <SearchSeparator />}
      {isExpanded && (
        <SearchContent>
          {!isLoading && !!searchDataDB.length && (
            <>
              {searchDataDB.map((data) => (
                <Link
                  key={data.id}
                  to={`/dashboard/${data.id}`}
                  onClick={collapseSearchBar}
                  className="search__content__link"
                >
                  <SearchContentCard data={data} />
                </Link>
              ))}
            </>
          )}
          {!isLoading && notFound && <div>Nothing was found</div>}
        </SearchContent>
      )}
    </motion.div>
  );
};
