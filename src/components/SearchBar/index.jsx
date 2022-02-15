import { useEffect, useRef, useState } from 'react';
import './searchBar.css';
import { motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import { useDebauncer } from '../../utils';
import { useAuth } from '../../contexts/Auth';
import { SearchContentDB } from '../SearchBarContent';

const containerVariants = {
  expanded: {
    height: '30em',
    zIndex: '10'
  },
  collapsed: {
    height: '1.8em',
    zIndex: '10'
  }
};

const containerTransition = {
  type: 'spring',
  damping: 22,
  stiffness: 150
};

export default function SearchBar(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickOutside] = useClickOutside();
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [searchDataDB, setSearchDataDB] = useState([]);

  const isEmpty = !searchDataDB || searchDataDB.length === 0;

  const { user, client } = useAuth();

  const changeHandler = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const expandSearchBar = () => {
    setExpanded(true);
  };

  const collapseSearchBar = () => {
    setExpanded(false);
    setSearchQuery('');
    setSearchDataDB([]);
    if (inputRef.current) inputRef.current.value = '';
  };

  useEffect(() => {
    if (isClickOutside) collapseSearchBar();
  }, [isClickOutside]);

  const SearchSeparator = () => <span className="search__separator"></span>;

  const SearchContent = ({ children }) => (
    <div className="search__content">{children}</div>
  );

  useEffect(() => {
    if (!searchQuery) setSearchDataDB([]);
  }, [searchQuery]);

  //TODO: implement user input sanitization ?
  /**
   *
   **/
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
          if (!error) {
            searchItems.push(...data);
          }
        });

      await client
        .from(`boards`)
        .select('*')
        .like('description', `%${sanitize(searchQuery)}%`)
        .then(({ data, error }) => {
          if (!error) {
            searchItems.push(...data);
          }
        });

      setSearchDataDB(filterDubs(searchItems));
    }
    setLoading(false);
    return true;
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
        <i className="bi bi-search"></i>
        <input
          className="search__input"
          type="search"
          placeholder="Search"
          name="header-search"
          autoFocus=""
          onFocus={expandSearchBar}
          ref={inputRef}
          value={searchQuery}
          onChange={changeHandler}
        ></input>
        {isExpanded && (
          <i className="bi bi-x-circle" onClick={collapseSearchBar}></i>
        )}
      </form>
      {isExpanded && <SearchSeparator />}
      {isExpanded && (
        <SearchContent>
          {!isLoading && !isEmpty && (
            <>
              {searchDataDB.map((data) => (
                <SearchContentDB
                  title={data.title}
                  description={data.description}
                  dataId={data.id}
                  date={data.insertedat}
                />
              ))}
            </>
          )}
        </SearchContent>
      )}
    </motion.div>
  );
}
