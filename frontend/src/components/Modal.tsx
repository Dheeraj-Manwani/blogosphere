import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modal } from "../recoil/atom/atom";

interface ModalProps {
  isVisible: boolean;
  message: string;
  href?: string;
}

export const Modal: React.FC<ModalProps> = ({ isVisible, message, href }) => {
  const [modalState, setModalState] = useRecoilState(modal);
  const navigate = useNavigate();

  const handleClick = (href: string) => {
    setModalState({ ...modalState, visible: false });
    if (href) navigate(href);
  };
  return (
    <div
      className={`fixed top-0 left-0 w-full flex items-center justify-center md:inset-0 h-[calc(100%-1rem)] max-h-full ${
        !isVisible && "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-gray-600 rounded-lg shadow">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  "
            onClick={() => handleClick(href || "")}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            <button
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              onClick={() => handleClick(href || "")}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
