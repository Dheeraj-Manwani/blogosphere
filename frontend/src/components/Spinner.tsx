import { useState, CSSProperties } from "react";
import {
  CircleLoader,
  DotLoader,
  HashLoader,
  PacmanLoader,
  RingLoader,
} from "react-spinners";
// import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  // display: "block",
  margin: "0 auto",
  // borderColor: "red",
  display: "absolute",
};

function Spinner({ loading }: { loading: boolean }) {
  return (
    <div className="sweet-loading">
      <DotLoader
        color="black"
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;
