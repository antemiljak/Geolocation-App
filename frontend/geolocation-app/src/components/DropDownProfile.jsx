import React from "react";

const DropDownProfile = ({ onLogout }) => {
  return (
    <div className=" bg-slate-900 flex flex-col absolute top-16 right-6 rounded  p-6 drop-shadow-lg">
      <ul className="flex flex-col gap-2 text-m">
        <li>Profile</li>
        <li className="mb-2">Settings</li>
        <hr></hr>
        <button onClick={onLogout} className="text-slate-400">
          Logout
        </button>
      </ul>
    </div>
  );
};

export default DropDownProfile;
