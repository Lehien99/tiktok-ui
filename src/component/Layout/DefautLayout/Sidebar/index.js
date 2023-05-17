import React from 'react'
import styles from './Sidebar.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
const SideBar = () => {
  return (
    <div className={cx('wrapper')}><h2>Sidebar</h2></div>
  )
}

export default SideBar