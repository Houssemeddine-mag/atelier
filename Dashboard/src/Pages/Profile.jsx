// import React from "react";

// export default function Profile() {
//   return (
//     <div className="page">
//       <h1>Profile Page</h1>
//     </div>
//   )
// }

import React from "react";
import "./Page.css";
import ProfileCard from "../Components/ProfileTab/ProfileCard";
import ProfileForm from "../Components/ProfileTab/ProfileForm";
import Header from "../Components/Header";

export default function Profile() {
  return (
    <div className="page">
      <div className="profilePage">
        <div className="profileGrid">
          <div className="profileHeader">
            <Header />
          </div>
          <ProfileCard />
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}
