import React from "react";
import Link from "next/link";
const Nav = () => {
  const navItems = [
    { href: "/cards", label: "Cards" },
    { href: "/create-card", label: "Create" },
  ];
  return (
    <div>
      {navItems.map((item) => {
        return <Link href={item.href}>{item.label}</Link>;
      })}
    </div>
  );
};

export default Nav;
