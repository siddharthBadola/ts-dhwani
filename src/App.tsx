import React, { useState, useRef } from "react";

import Header from "./Component/Header/header";
import Table from "./Component/Table/Table";
import Chart from "./Component/Chart/Chart";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { CancelTokenSource } from "axios";

type TimeoutId = number | null;

function App() {
  const [pageNo, setPageNo] = useState<number>(1);
  const [timerId, settimerId] = useState<TimeoutId>(null);
  const [cancelToken, setcancelToken] = useState<CancelTokenSource>(
    null! as CancelTokenSource
  );

  const nextPrevBtn = useRef<HTMLButtonElement>(null! as HTMLButtonElement);

  const onClickHandler = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    setPageNo(nextPrevBtn.current.dataset.btnstate === "prev" ? 1 : 2);
    cancelToken.cancel();
  };

  return (
    <div className="App">
      <Header pageNo={pageNo} />
      <div className="container mt-5 mb-4">
        <div className="row">
          <div className="col-12 offset-0 col-sm-4 offset-sm-8">
            <button
              type="button"
              className="btn btn-outline-primary d-block mx-auto ml-sm-auto mr-sm-0"
              ref={nextPrevBtn}
              data-btnstate={pageNo === 1 ? "next" : "prev"}
              onClick={onClickHandler}
            >
              Go To Page {pageNo === 1 ? 2 : 1}
            </button>
          </div>
          <div className="col-12 mt-3">
            {pageNo === 1 ? (
              <Table setId={settimerId} setToken={setcancelToken} />
            ) : (
              <Chart setId={settimerId} setToken={setcancelToken} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
