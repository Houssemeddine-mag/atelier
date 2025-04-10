// import React from "react";
// import Header from "../Components/Header";

// export default function Menu() {
//   return (
//     <div className="page">
//           <Header/>
//         </div>
//   )
// }
import React from "react";
import Header from "../Components/Header";
import MenuTable from "../Components/Table/MenuT"; // Adjust path if needed
import PageTitle from "../Components/pagetitle";
export default function Menu() {
  const columns = ["Name", "Category", "Price", "Availability", "Actions"];

  const data = [
    {
      Name: "Cheeseburger",
      Category: "Fast Food",
      Price: "$5.99",
      Availability: "Available",
    },
    {
      Name: "Spaghetti Bolognese",
      Category: "Pasta",
      Price: "$8.50",
      Availability: "Out of Stock",
    },
    {
      Name: "Pizza Margherita",
      Category: "Italian",
      Price: "$7.50",
      Availability: "Available",
    },
  ];

  return (
    <div className="page">
      <Header />
      <div className="content">
        <PageTitle
          title="Menu"
          description="Manage dishes, ingredients, and promotional packs."
        />
        <MenuTable columns={columns} data={data} />
      </div>
    </div>
  );
}