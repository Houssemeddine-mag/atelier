import React from "react";
import Header from "../Components/Header";
import TableComponent from "../Components/Table/GRH_T";
import PageTitle from "../Components/pagetitle";
export default function GRH() {
  const columns = [
    "Name",
    "Email",
    "Phone",
    "Restaurant",
    "Hire Date",
    "Actions",
  ];
  const data = [
    {
      Name: "Magra Houssem Eddine",
      Email: "Houssemeddinemagra@gmail.com",
      Phone: "0557887192",
      Restaurant: "Magic food",
      "Hire Date": "10/02/2025",
    },
  ];
  return (
    <div className="page">
      <Header />
      <div className="content">
        <PageTitle
          title="Manage Human Resources"
          description="Human Resources Management for Restaurant Directors"
        />
        <TableComponent columns={columns} data={data} />
      </div>
    </div>
  );
}
