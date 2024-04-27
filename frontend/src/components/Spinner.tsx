import { CSSProperties } from "react";
import { DotLoader } from "react-spinners";

const cssProp: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position: "absolute",
  top: "53%",
  left: "21%",
};
const cssPropCenter: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position: "absolute",
  top: "53%",
  left: "43%",
};

function Spinner({ loading, type }: { loading: boolean; type: string }) {
  if (type === "Auth") {
    return (
      <>
        <div className={`sweet-loading lg:hidden`}>
          <DotLoader
            color={"black"}
            loading={loading}
            cssOverride={cssPropCenter}
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        <div className={`sweet-loading hidden lg:block`}>
          <DotLoader
            color={"black"}
            loading={loading}
            cssOverride={cssProp}
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </>
    );
  }
  if (type === "Editor") {
    return (
      <div className={`sweet-loading`}>
        <DotLoader
          color={"black"}
          loading={loading}
          cssOverride={{ ...cssPropCenter, left: "44%", top: "40%" }}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
}

export default Spinner;
