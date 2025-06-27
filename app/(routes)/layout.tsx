import { NavbarComponent } from "@/components/custom/Navbar";
import { navItemsDashboard } from "@/constants";
import React from "react";

const RouteLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <NavbarComponent navItems={navItemsDashboard} />

      <div className="container mx-auto px-4 py-20">{children}</div>
    </>
  );
};

export default RouteLayout;
