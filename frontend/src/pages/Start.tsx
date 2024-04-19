import { Appbar } from "../components/Appbar";
export const Start = () => {
  return (
    <div className="flex flex-col h-screen">
      <Appbar />

      <div className="flex-grow flex justify-center">
        <div className="text-center">
          <div className="flex justify-center mt-40">
            <div className="flex flex-col justify-center m-auto">
              <h1 className="logo-font text-6xl pt-12 pb-1 font-semibold tracking-wider">
                BlogoSphere
              </h1>
              <h3 className="text-lg font-semibold mb-6 text-gray-500 logo-font tracking m-auto">
                Where Every Thought Finds its Orbit
              </h3>
            </div>
            <div>
              <video autoPlay loop muted className="h-64 w-64">
                <source src="https://res.cloudinary.com/dx2hdfv0w/video/upload/v1713558234/Globe_frb8d0.mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
