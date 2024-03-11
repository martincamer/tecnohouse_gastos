import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { BiHome, BiMenu } from "react-icons/bi";
import { FiShoppingBag, FiSend, FiSidebar } from "react-icons/fi";
import { useState } from "react";

export const Sidebar = () => {
  const { user, clickProvider } = useAuth();
  const [click, setClick] = useState(true);

  const handleClick = () => {
    setClick(!click);
  };

  const location = useLocation();

  const navegacion = [
    {
      name: "INICIO",
      path: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
    },
    {
      name: "GASTOS",
      path: "/gastos",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      ),
    },
    {
      name: "VENTAS",
      path: "/ventas",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
          />
        </svg>
      ),
    },
    {
      name: "ABERTURAS",
      path: "/aberturas",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
          />
        </svg>
      ),
    },
    {
      name: "PRESUPUESTOS",
      path: "/presupuestos",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={`${
        click
          ? "w-[70px] max-md:w-[44px] transition-all ease-in-out duration-300"
          : "w-1/5 transition-all ease-in-out duration-300"
      } w-1/5 bg-gray-200/90 shadow-md shadow-black/30 min-h-screen max-h-full block ${
        clickProvider ? "max-md:block" : "max-md:hidden"
      }`}
    >
      <div
        className={`${
          click
            ? "justify-center transition-all ease-in-out duration-300"
            : "justify-end transition-all ease-in-out duration-300"
        } w-full flex px-4 py-2 cursor-pointer`}
      >
        <Link className="t group relative">
          <BiMenu
            onClick={handleClick}
            className="text-primary hover:text-white text-[40px] hover:bg-indigo-500 rounded-xl py-[5px] transition-all ease-in-out duration-300 max-md:hidden"
          />

          <span className="invisible absolute left-10 top-4 ml-5 -translate-y-1/2 rounded bg-slate-900 px-4 w-[150px] flex justify-center py-2 text-xs text-white group-hover:visible font-bold uppercase shadow">
            {click ? "Abrir menu" : "Cerrar menu"}
          </span>
        </Link>
      </div>
      <div
        className={`w-full ${
          click ? "items-center" : ""
        }  flex flex-col gap-12`}
      >
        <div>
          {navegacion.map(({ name, path, icon }) => (
            <div
              key={path}
              className={`${
                location.pathname === path && "bg-indigo-500"
              } w-full py-3 px-6 max-md:px-4 `}
            >
              <div className="t group flex items-center max-md:justify-center gap-4  transition-all ease duration-300">
                <Link
                  to={path}
                  className={`${
                    location.pathname === path && "text-white"
                  } text-2xl max-md:text-2xl text-teal-950 relative`}
                >
                  {icon}

                  {click && (
                    <span className="invisible absolute left-10 top-4 ml-5 -translate-y-1/2 rounded bg-slate-900 px-4 w-[150px] flex justify-center py-2 text-xs text-white group-hover:visible font-bold uppercase shadow">
                      {name}
                    </span>
                  )}
                </Link>
                <Link
                  to={path}
                  className={`${location.pathname === path && "text-white"}   ${
                    click
                      ? "hidden transition-all ease-in-out duration-300"
                      : "block transition-all ease-in-out duration-300 text-teal-950"
                  } text-sm  text-teal-950`}
                >
                  {name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
