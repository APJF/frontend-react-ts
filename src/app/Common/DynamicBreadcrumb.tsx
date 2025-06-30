import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

// Helper function to capitalize and transform path segments
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const DynamicBreadcrumb: React.FC = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  // Build the breadcrumb items dynamically based on the URL
  const breadcrumbItems = [
    ...pathSnippets
    .filter((segment) => segment.toLowerCase() !== "admin" && segment.toLowerCase() !== "organization")
      .map((segment, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSnippets.length - 1;

        const name = isNaN(Number(segment))
          ? capitalize(segment)
          : `${segment}`;

        return {
          key: url,
          title: isLast ? name : <Link to={url}>{name}</Link>,
        };
      }),
  ];

  return <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbItems} />;
};

export default DynamicBreadcrumb;
