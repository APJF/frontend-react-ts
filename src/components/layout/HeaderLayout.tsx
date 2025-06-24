import React, { useState } from "react";
import {
  UserOutlined,
  LogoutOutlined,
  GlobalOutlined,
  ArrowLeftOutlined,
  LoginOutlined,
  SunOutlined,
  MoonOutlined,
  EllipsisOutlined,
  BankOutlined,
  DownOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Breadcrumb,
  theme,
  Button,
  Space,
  Dropdown,
  Grid,
} from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DynamicBreadcrumb from "@/app/Common/DynamicBreadcrumb";
import { Constant } from "@/utils/constant";
import { MenuItemsCommon, MenuItemsHeader } from "./MenuItems";
import { useTheme } from "@/hooks";

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

const HeaderLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // const { toggleTheme, isDarkMode } = useTheme();
  const screens = useBreakpoint();
  const MenuItems = MenuItemsHeader


  return (
    <Layout style={{ minHeight: "100vh", width: "100%" }}>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {screens.md ? (
            <Link to="/dashboard">
              <img
                src={Constant.ASSET.LOGO_URL}
                alt="Logo"
                style={{
                  width: "35px",
                  margin: "0 2rem",
                }}
              />
            </Link>
          ) : (
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => window.history.back()}
              style={{
                fontSize: "16px",
                height: "100%",
                aspectRatio: "1",
                margin: "0 0.5rem",
              }}
            />
          )}
          <Menu
            mode="horizontal"
            selectedKeys={[
              MenuItems.find(
                (item) => item.key === location.pathname.split("/").pop()
              )?.key ||
              MenuItems.find((item) => location.pathname.includes(item.key))?.key ||
              "",
            ]}
            style={{ border: "none" }}
          >
            {MenuItems.map((item) =>
               (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.path}>{item.label}</Link>
                </Menu.Item>
              )
            )}
          </Menu>

        </div>

        <div style={{ display: "flex", alignItems: "center" }}>

          {(
            <>
              <Button
                type="text"
                icon={<UserOutlined />}
                onClick={() => navigate("/profile")}
                style={{
                  fontSize: "16px",
                  width: 32,
                  height: 32,
                  margin: 6,
                }}
                title="Profile"
              />
            </>
          )}
          <Button
            type="text"
            // icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
            // onClick={toggleTheme}
            style={{ fontSize: "16px", margin: "0 8px" }}
            title="Toggle Dark Mode"
          />
          {/* <Dropdown
            menu={{
              items: [
                {
                  key: "English",
                  label: "English",
                  disabled: true,
                  style: { fontWeight: "bold", color: "#1890ff" },
                },
              ],
              onClick: ({ key }) => {},
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button
              title="Change Language"
              type="text"
              icon={<GlobalOutlined />}
              style={{ fontSize: 16, margin: "0 8px" }}
            />
          </Dropdown> */}
          <Button
            type="text"
            style={{ fontSize: "16px", margin: "0 16px" }}
          />
        </div>
      </Header>

      <Content style={{ padding: "0 32px" }}>
        <DynamicBreadcrumb />
        <div
          style={{
            padding: 24,
            minHeight: "75vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            position: "relative",
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default HeaderLayout;
