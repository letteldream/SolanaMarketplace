import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
import styles from "./Header.module.sass";
import Icon from "../Icon";
import Image from "../Image";
import Notification from "./Notification";
import User from "./User";
import { connect } from "react-redux";
import { authLogout } from "../../store/actions/auth.actions";
const nav = [
  {
    url: "/search01",
    title: "Discover",
  },
  {
    url: "/faq",
    title: "How it work",
  },
  {
    url: "/item",
    title: "Create item",
  },
  {
    url: "/profile",
    title: "Profile",
  },
];

const Headers = (props) => {
  const [visibleNav, setVisibleNav] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(props.user);
  },[props])

  const handleSubmit = (e) => {
    alert();
  };
  return (
    <header className={styles.header}>
      <div className={cn("container", styles.container)}>
        <Link className={styles.logo} to="/">
          <Image
            className={styles.pic}
            src="/images/fox1-small.png"
            srcDark="/images/fox1-small.png"
            alt="BlockFox"
          />
        </Link>
        <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
          <nav className={styles.nav}>
            {nav.map((x, index) => (
              <Link
                className={styles.link}
                // activeClassName={styles.active}
                to={x.url}
                key={index}
              >
                {x.title}
              </Link>
            ))}
          </nav>
          <form
            className={styles.search}
            action=""
            onSubmit={() => handleSubmit()}
          >
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Search"
              required
            />
            <button className={styles.result}>
              <Icon name="search" size="20" />
            </button>
          </form>
          <Link
            className={cn("button-small", styles.button)}
            to="/upload-variants"
          >
            Upload
          </Link>
        </div>
        <Notification className={styles.notification} />
        <Link
          className={cn("button-small", styles.button)}
          to="/upload-variants"
        >
          Upload
        </Link>
        {!Object.keys(user).length ?
          <Link
            className={cn("button-stroke button-small", styles.button)}
            to="/connect-wallet"
          >
            Connect Wallet
          </Link>
          : <User className={styles.user} user={user} logout={() => props.authLogout()}/>
        }
        <button
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={() => setVisibleNav(!visibleNav)}
        ></button>
      </div>
    </header>
  );
};

const mapToStateProps = ({auth}) => ({
  user: auth.user
})

const mapToDispatchProps = dispatch => ({
  authLogout: () => dispatch(authLogout())
})
export default connect(mapToStateProps, mapToDispatchProps)(Headers);
