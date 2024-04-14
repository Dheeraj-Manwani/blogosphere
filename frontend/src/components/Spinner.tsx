import { CSSProperties } from "react";
import { DotLoader } from "react-spinners";

const cssProp: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position: "absolute",
  top: "47%",
  left: "21%",
};
const cssPropCenter: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position: "absolute",
  top: "47%",
  left: "42%",
};

function App({ loading }: { loading: boolean }) {
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

export default App;
