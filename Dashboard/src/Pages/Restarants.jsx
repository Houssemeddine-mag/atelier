import React from "react";
import Header from "../Components/Header";
import TableComponent from "../Components/Table/Restaurant_T";
import PageTitle from "../Components/pagetitle";
export default function Restaurants() {
  const columns = [
    "Status",
    "Restaurant",
    "Adress",
    "Director",
    "Monthly revenue",
    "Staff",
    "Actions",
  ];

  const data = [
    {
      Status: "Open",
      Restaurant: "Bistro Cafe",
      Adress: "21 rue marchez",
      Director: "John Doe",
      "Monthly revenue": "$500",
      Staff: 10,
      Actions: "Edit",
    },
  ];

  return (
    <div className="page">
      <Header />
      <div className="content">
        <PageTitle
          title="Restaurants"
          description="Manage all restaurants in your chain."
        />
        <TableComponent columns={columns} data={data} />
      </div>
    </div>
  );
}
