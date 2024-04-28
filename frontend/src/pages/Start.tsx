export const Start = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="sm:hidden absolute top-32">
        <video
          autoPlay
          loop
          muted
          className="h-full w-full -z-10 opacity-25  sm:static sm:opacity-100 sm:h-52 sm:w-52 lg:h-64 lg:w-64"
        >
          <source src="https://res.cloudinary.com/dx2hdfv0w/video/upload/v1713558234/Globe_frb8d0.mp4" />
        </video>
      </div>
      <div className="flex-grow flex justify-center absolute top-24 w-full sm:static">
        <div className="text-center">
          <div className="flex justify-center mt-40">
            <div id="bg-video" className="flex flex-col justify-center m-auto">
              <h1 className="logo-font text-4xl sm:text-5xl lg:text-6xl pt-12 pb-1 font-semibold tracking-wider">
                BlogoSphere
              </h1>
              <h3 className="text-xs sm:text-base lg:text-lg font-semibold mb-6 text-gray-500 logo-font tracking m-auto">
                Where Every Thought Finds its Orbit
              </h3>
            </div>
            <div className="hidden sm:block">
              <video
                autoPlay
                loop
                muted
                className="h-screen w-screen -z-10 opacity-50  sm:static sm:opacity-100 sm:h-52 sm:w-52 lg:h-64 lg:w-64"
              >
                <source src="https://res.cloudinary.com/dx2hdfv0w/video/upload/v1713558234/Globe_frb8d0.mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
