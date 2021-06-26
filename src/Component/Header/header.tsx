import React from "react";

interface HeaderProps {
  pageNo: number;
}

const Header: React.FC<HeaderProps> = ({ pageNo }) => {
  return (
    <div className="container text-center mt-2">
      <div className="row">
        <div className="col-12">
          <div className="card p-3">
            <h1>
              Your are on <span className="text-nowrap">Page {pageNo}</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
