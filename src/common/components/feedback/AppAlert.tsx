import React from "react";
import BaseIcon from "../ui/BaseIcon";

import { useAppAlert } from "../../hooks/useAppAlert";
import { faFaceSmile } from "../../ui/Icons/Icons";

const AppAlert: React.FC = () => {
  const { responseMassage, setShowModel, showModel } = useAppAlert();
  return (
    <>
      <div
        className="appAlert position-fixed top-0 start-0 z-2 border-0 w-100 h-100 overflow-auto"
        style={{ display: `${showModel ? "block" : "none"}` }}
      >
        <div className="appAlert-content m-auto rounded-2 p-4">
          <div className="h-100 d-flex justify-content-center align-items-center">
            <div className="text-center">
              <BaseIcon
                icon={faFaceSmile}
                classes={`fs-11 ${
                  responseMassage.statusCode === 200
                    ? "text-success"
                    : "text-danger"
                }`}
              />
              <h5 className="mt-3">{responseMassage.message}</h5>
              <div className="w-100">
                {responseMassage.statusCode === 200 ? (
                  <div
                    className="btn btn-success m-3 rounded-1"
                    onClick={() => {
                      setShowModel(false);
                    }}
                  >
                    Done
                  </div>
                ) : (
                  <div
                    className="btn btn-danger m-3 rounded-1"
                    onClick={() => {
                      setShowModel(false);
                    }}
                  >
                    Try Again
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppAlert;
