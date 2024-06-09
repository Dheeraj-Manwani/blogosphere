import { CSSProperties } from "react";
import { DotLoader } from "react-spinners";

const cssProp: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position: "fixed",
  top: "45%",
  left: "42%",
  zIndex: 100,
};
const cssPropCenter: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position: "fixed",
  top: "45%",
  left: "44%",
  zIndex: 100,
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
      <>
        <div className={`sweet-loading hidden md:block`}>
          <DotLoader
            color={"black"}
            loading={loading}
            cssOverride={{ ...cssPropCenter, left: "44%", top: "43%" }}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        <div className={`sweet-loading block md:hidden`}>
          <DotLoader
            color={"black"}
            loading={loading}
            cssOverride={{ ...cssPropCenter, left: "33%", top: "43%" }}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </>
    );
  }
}

export default Spinner;
