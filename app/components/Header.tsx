import React from "react";

export default function Header({
  title,
  className,
}: {
  title: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{title}</div>;
}
