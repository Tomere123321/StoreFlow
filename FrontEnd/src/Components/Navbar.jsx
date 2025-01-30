import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconBuildingStore,
  IconHome,
  IconLogout,
  IconUsers,
  IconBasketDollar,
} from "@tabler/icons-react";
import { Code, Group } from "@mantine/core";
import LOGO from "../assets/logo.png";

import classes from "../css/Navbar.module.css";

const data = [
  { link: "/", label: "Home", icon: IconHome },
  { link: "/products", label: "Products", icon: IconBuildingStore },
  { link: "/customers", label: "Customers", icon: IconUsers },
  { link: "/purchases", label: "Purchases", icon: IconBasketDollar },
];

export function Navbar() {
  const [active, setActive] = useState("Home");

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={(event) => {
        // event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <img src={LOGO} alt="StoreFlow Logo" className={classes.logo} />
          <Code fw={700}>v1.0.0</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
