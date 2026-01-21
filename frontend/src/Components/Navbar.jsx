import { NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#0b1220] via-[#0f1a2e] to-[#0b1220] shadow-2xl">
      <div className="max-w-7xl mx-auto px-10 py-6 flex items-center justify-between">

        {/* LEFT: LOGO */}
        <Logo />

        {/* RIGHT: NAV LINKS */}
        <div className="flex gap-10 text-sm font-semibold text-white items-center">
          {[
            { name: "Home", path: "/" },
            { name: "Login", path: "/login" },
            { name: "Dashboard", path: "/dashboard" },
            { name: "Webcam", path: "/webcam" },
            
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative transition-all duration-300 ${
                  isActive
                    ? "text-yellow-400 after:absolute after:left-0 after:-bottom-2 after:w-full after:h-[2px] after:bg-yellow-400"
                    : "hover:text-yellow-300"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

      </div>
    </nav>
  );
}
