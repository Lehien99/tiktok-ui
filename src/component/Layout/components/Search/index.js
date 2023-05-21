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

const cx = classNames.bind(styles);

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setSearchValue(event.target.value);
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
    if (!searchValue.trim()) {
      setSearchResult([]);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      fetch(
        `https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(
          searchValue
        )}&type=less`
      )
        .then((res) => res.json())
        .then((res) => {
          setSearchResult(res.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }, 1000);
    // .catch((error) => {console.log(error)});
    // setTimeout(() => {
    //   setSearchResult([1, 2, 1, 4]);
    // }, 0);
  }, [searchValue]);
  return (
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
        <button className={cx("search-btn")}>
          <SearchIcon />
        </button>
      </div>
    </HeadlessTippy>
  );
};

export default Search;
