import { Link } from "react-router-dom";
import { Icon } from "./Icon";

export const Button = ({
  icon,
  href,
  text = "",
}: {
  icon?: string;
  href: string;
  text?: string;
}) => {
  return (
    <Link
      to={href}
      className="inline-flex items-center px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-gray-800 hover:bg-gray-900 rounded-lg focus:outline-none "
    >
      {text} {icon && <Icon type={icon} />}
    </Link>
  );
};
