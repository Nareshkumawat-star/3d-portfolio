import { Link } from "react-router-dom";

import { SOCIALS } from "../constants";
import { styles } from "../styles";
import { cn } from "../utils/lib";

// Footer
const Footer = () => {
  return (
    <nav
      className={cn(
        styles.paddingX,
        "w-full flex items-center py-5 sm:py-8 bg-primary border-t border-t-secondary/5"
      )}
    >
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 max-w-7xl mx-auto">
        <p className="text-white text-sm sm:text-md font-bold flex text-center">
          &copy; Shubham {new Date().getFullYear()}. All rights reserved.
        </p>

        {/* Social Links - visible on all sizes now */}
        <ul className="list-none flex flex-row gap-6 sm:gap-10">
          {SOCIALS.map((social) => (
            <li
              key={social.name}
              className="text-secondary font-poppins font-medium cursor-pointer text-[16px] opacity-80 hover:opacity-100 transition"
            >
              <Link to={social.link} target="_blank" rel="noreferrer noopener">
                <img src={social.icon} alt={social.name} className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Footer;
