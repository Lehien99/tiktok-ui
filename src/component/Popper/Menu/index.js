import React from "react";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { Wrapper as PopperWrapper } from "~/component/Popper";
import MenuItem from "./MenuItem";

const cx = classNames.bind(styles);

const Menu = ({ children, items = [] }) => {
  const renderItems = () => {
    return items.map((item, index) => {
     return <MenuItem key={index} data={item} />;
    });
  };
  return (
    <Tippy
      interactive
      delay={[0,500]}
      placement="bottom-end"
      render={(attrs) => (
        <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cx('menu-popper')}>{renderItems()}</PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
};

export default Menu;
