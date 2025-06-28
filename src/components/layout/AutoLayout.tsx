import React from "react";
import SidebarLayout from "./SidebarLayout";
import HeaderLayout from "./HeaderLayout";
import { Grid } from "antd";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const { useBreakpoint } = Grid;

const AutoLayout: React.FC<ProtectedRouteProps> = ({ children }) => {
  const screens = useBreakpoint();
  const LayoutComponent = screens.lg ? SidebarLayout : HeaderLayout;

  return <LayoutComponent>{children}</LayoutComponent>;
};

export default AutoLayout;
