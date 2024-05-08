import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { IoClose } from "react-icons/io5";
import { BiMenu } from "react-icons/bi";

const rutasuno = [
  {
    name: "SALIR",
    path: "/logout",
  },
];

const rutasdos = [
  // {
  //   name: "Login",
  //   path: "/",
  // },
  // {
  //   name: "Registrarse",
  //   path: "/register",
  // },
];

export const Navbar = () => {
  const { isAuth, signout, user, clickProvider, setClickProvider } = useAuth();

  return (
    <header className="fixed w-full z-[0] py-4 px-6 max-md:px-2 max-md:static">
      <div
        className={`flex justify-between items-center gap-4 max-md:flex-col ${
          !isAuth ? "w-[1220px]" : "w-full max-md:px-2"
        } mx-auto`}
      >
        <div className="flex gap-4 items-center max-md:hidden">
          <div
            onClick={() => setClickProvider(!clickProvider)}
            className="cursor-pointer"
          >
            {!clickProvider ? (
              <BiMenu className="text-primary text-[40px] hover:bg-white rounded-full py-[5px] transition-all ease-in-out duration-300 max-md:block hidden" />
            ) : (
              <IoClose className="text-primary text-[38px] hover:bg-white rounded-full py-[5px] transition-all ease-in-out duration-300 max-md:block hidden" />
            )}
          </div>
        </div>
        {isAuth ? (
          ""
        ) : (
          <div className="font-normal text-2xl uppercase text-indigo-500 hidden">
            Administración De Gastos
          </div>
        )}

        <div className="flex flex-row gap-6">
          {isAuth
            ? rutasuno.map(({ path, name }) => (
                <div className="flex items-center gap-4">
                  <div className="font-normal bg-indigo-500 shadow text-white text-sm p-1 rounded-full px-4 max-md:text-sm capitalize">
                    <span className="font-bold">Usuario:</span> {user?.username}
                  </div>
                  <Link
                    onClick={() => signout()}
                    className="text-[15px] max-md:text-sm max-md:font-bold max-md:py-1 font-semibold transition-all ease-in-out duration-300 bg-indigo-50/10 border-[1px] border-indigo-500 px-8 rounded-2xl py-2 text-indigo-500 hover:shadow-md hover:shadow-black/20 hover:scale-[1.02] bg-white"
                    //o={path}
                    key={path}
                  >
                    {name}
                  </Link>
                </div>
              ))
            : rutasdos.map(({ path, name }) => (
                <Link
                  className="text-[17px] font-semibold transition-all ease-in-out duration-300 bg-blue-500 px-4 rounded-full py-2 text-white hover:shadhttps://www.viviendastecnohouse.com.ar/storage/img/modelos/25.jpgow-md hover:shadow-black/20 hover:scale-[1.02]"
                  to={path}
                  key={path}
                >
                  {name}
                </Link>
              ))}
        </div>
      </div>
    </header>
  );
};
