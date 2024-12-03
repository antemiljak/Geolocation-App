import React, { useState } from "react";
import { getInitials } from "../utils/helper";
import DropDownProfile from "./DropDownProfile";

const ProfileInfo = ({ userInfo, onLogout }) => {
  const [showDropDownProfile, setShowDropDownProfile] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <h4>{userInfo?.name}</h4>
      <div
        onClick={() => setShowDropDownProfile(!showDropDownProfile)}
        className="w-12 h-12 flex items-center justify-center rounded-full text-green-300 font-medium bg-gray-700 cursor-pointer"
      >
        {getInitials(userInfo?.name)}
      </div>

      {showDropDownProfile && <DropDownProfile onLogout={onLogout} />}
    </div>
  );
};

export default ProfileInfo;
