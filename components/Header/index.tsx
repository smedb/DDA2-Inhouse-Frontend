"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userDepartment, setUserDepartment] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const pathUrl = usePathname();

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleStickyMenu);
    };
  }, []);

  useEffect(() => {
    const loadUserData = () => {
      const storedEmail = localStorage.getItem("mail");
      const storedDepartment = localStorage.getItem("department");
      setUserEmail(storedEmail);
      setUserDepartment(storedDepartment);
      setIsLoading(false);
    };

    // Load user data on mount
    loadUserData();

    // Listen for storage changes
    const handleStorageChange = () => {
      loadUserData();
    };
    
    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("mail");
    localStorage.removeItem("department");
    setUserEmail(null);
    setUserDepartment(null);
    
    // Redirect to home page
    window.location.href = "/";
  };

  return (
    <header className={`fixed left-0 top-0 z-99999 w-full py-7 ${
        stickyMenu
          ? "bg-white !py-4 shadow transition duration-100 dark:bg-black"
          : ""
      }`}
    >
      <div className="relative mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 xl:flex 2xl:px-0">
        <div className="flex w-full items-center justify-between xl:w-1/4">
          <a href="/" className="flex items-center">
            <span className="text-xl font-bold text-black dark:text-white">XWallet - Internal</span>
          </a>

          {/* Hamburger Toggle BTN */}
          <button
            aria-label="hamburger Toggler"
            className="block xl:hidden"
            onClick={() => setNavigationOpen(!navigationOpen)}
          >
            {/* Hamburger SVG Icons */}
          </button>
          {/* Hamburger Toggle BTN */}
        </div>

        {/* Nav Menu Start */}
        <div
          className={`invisible h-0 w-full items-center justify-between xl:visible xl:flex xl:h-auto xl:w-full ${
            navigationOpen &&
            "navbar !visible mt-4 h-auto max-h-[400px] rounded-md bg-white p-7.5 shadow-solid-5 dark:bg-blacksection xl:h-auto xl:p-0 xl:shadow-none xl:dark:bg-transparent"
          }`}
        >
          <nav>
            <ul className="flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-10">
              {menuData.map((menuItem, key) => (
                <li key={key} className={menuItem.submenu && "group relative"}>
                  {menuItem.submenu ? (
                    <>
                      <button
                        onClick={() => setDropdownToggler(!dropdownToggler)}
                        className="flex cursor-pointer items-center justify-between gap-3 hover:text-primary"
                      >
                        {menuItem.title}
                        {/* Dropdown SVG Icon */}
                      </button>

                      <ul className={`dropdown ${dropdownToggler ? "flex" : ""}`}>
                        {menuItem.submenu.map((item, key) => (
                          <li key={key} className="hover:text-primary">
                            <Link href={item.path || "#"}>{item.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={`${menuItem.path}`}
                      className={
                        pathUrl === menuItem.path
                          ? "text-primary hover:text-primary"
                          : "hover:text-primary"
                      }
                    >
                      {menuItem.title}
                    </Link>
                  )}
                </li>
              ))}
              {/* Mostrar opción "Alta Empleados" y "Ver Empleados" si el usuario es Admin */}
              {userDepartment === "Admin" && (
                <li>
                  <Link legacyBehavior href="/support">
                    <a className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-primary">Alta Empleados</a>
                  </Link>
                </li>
              )}
              {userDepartment === "Admin" && (
                <li>
                  <Link legacyBehavior href="/userempleado">
                    <a className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-primary">Ver Empleados</a>
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <div className="mt-7 flex items-center gap-6 xl:mt-0">
            <ThemeToggler />
            {isLoading ? (
              <div>Loading...</div>
            ) : userEmail ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{userEmail}</span>
                <span className="bg-gray-200 dark:bg-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">{userDepartment}</span>
                <button onClick={handleLogout} className="bg-red-200 dark:bg-red-700 text-sm font-semibold text-white-600 dark:text-white-400 px-2 py-1 rounded-full">Logout</button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
