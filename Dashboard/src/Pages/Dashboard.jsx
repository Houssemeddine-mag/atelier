import React from "react";
import Header from "../Components/Header";
import TableComponent from "../Components/Table/Dashboard_T";

export default function Dashboard() {
  const columns = [
    "Status",
    "Restaurant",
    "Director",
    "Today's Sales",
    "Staff",
    "Alert Level",
    "Actions",
  ];

  const data = [
    {
      Status: "Open",
      Restaurant: "Bistro Cafe",
      Director: "Merdaci ahmed",
      "Today's Sales": "$500",
      Staff: 10,
      "Alert Level": "Low",
      Actions: "Edit",
    },
    {
      Status: "Open",
      Restaurant: "magic house",
      Director: "Magra houssem eddine",
      "Today's Sales": "$500",
      Staff: 80,
      "Alert Level": "High",
      Actions: "Edit",
    },
    {
      Status: "Closed",
      Restaurant: "tinbox",
      Director: "moustache",
      "Today's Sales": "$500",
      Staff: 50,
      "Alert Level": "Low",
      Actions: "Edit",
    },
  ];

  return (
    <div className="page">
      <Header />
      <div className="content">
        <TableComponent columns={columns} data={data} />
      </div>
    </div>
  );
}
