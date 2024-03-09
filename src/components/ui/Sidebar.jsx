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
      icon: <BiHome />,
    },
    {
      name: "GASTOS",
      path: "/gastos",
      icon: <FiShoppingBag />,
    },
    {
      name: "VENTAS",
      path: "/ventas",
      icon: <FiSend />,
    },
    {
      name: "ABERTURAS",
      path: "/aberturas",
      icon: <FiSidebar />,
    },
    {
      name: "PRESUPUESTOS",
      path: "/presupuestos",
      icon: <FiShoppingBag />,
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
