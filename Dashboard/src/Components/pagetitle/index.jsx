import React from "react";
import "./style.module.scss";

export default function PageTitle({ title, description }) {
  return (
    <div className="title">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
