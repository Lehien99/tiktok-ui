import React from "react";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const AccountItem = () => {
  return (
    <div className={cx("wrapper")}>
      <img className={cx("avatar")} src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/a8e1f3aedc220bf1c5f25511d8b12564~c5_300x300.webp?x-expires=1684497600&x-signature=%2FLHJbMt9TIHPQojnFvRENWUbXQA%3D" alt="Hoaa"></img>
      <div className={cx("info")}>
        <p className={cx("name")}>
          <span> Nguyen Van A</span>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </p>
        <span className={cx("username")}>nguyenvana</span>
      </div>
    </div>
  );
};

export default AccountItem;
