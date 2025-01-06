import React from "react";
import { getInitials } from "../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-green-300 font-medium bg-zinc-900">
        {getInitials(userInfo?.name)}
      </div>
      <div>
        <h4 className="font-bold">{userInfo?.name}</h4>
        <h5
          className="text-sm text-slate-300 cursor-pointer"
          onClick={onLogout}
        >
          Logout
        </h5>
      </div>
    </div>
  );
};

export default ProfileInfo;
