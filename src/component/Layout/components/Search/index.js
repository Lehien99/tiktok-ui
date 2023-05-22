import React, { useEffect, useRef, useState } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/component/Popper";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import AccountItem from "../AccountItem";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SearchIcon } from "~/component/Icons";
import { useDebounce } from "~/Hooks";
import * as searchServices from "~/apiServices/searchServices";

const cx = classNames.bind(styles);

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const debounced = useDebounce(searchValue, 500);

  const inputRef = useRef();

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    if (!searchValue.startsWith(" ") || searchValue.trim()) {
      setSearchValue(searchValue);
    }
  };

  const HandleClear = () => {
    setSearchValue("");
    inputRef.current.focus();
  };

  const handleFocus = (event) => {
    setShowResult(true);
  };

  const handleHindResult = () => {
    setShowResult(false);
  };

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      setLoading(true);
      const result = await searchServices.search(debounced);
      setSearchResult(result);
      setLoading(false);
    };
    fetchApi();
  }, [debounced]);
  return (
    //Using a wrapper <div>  tag around the reference element solves this by creating a new parentNode context.
    <div>
      <HeadlessTippy
        interactive
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx("search-title")}>Accounts</h4>
              {searchResult.map((result) => {
                return <AccountItem data={result} key={result.id} />;
              })}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHindResult}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            value={searchValue}
            onChange={handleSearch}
            onFocus={handleFocus}
            placeholder="Search"
          />
          {!!searchValue && !loading && (
            <button className={cx("clear")} onClick={HandleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && (
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
          )}
          <button
            className={cx("search-btn")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
};

export default Search;
