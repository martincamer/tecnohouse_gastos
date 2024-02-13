import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import img from "../../../public/06.jpg";

export const Login = () => {
  const { signin, error } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signin(data);

    if (user) {
      navigate("/");
    }
  });

  return (
    <section className="flex items-center gap-12 h-screen bg-gray-200">
      <div className="h-full w-2/4">
        <img
          src="https://www.viviendastecnohouse.com.ar/storage/img/modelos/30.jpg"
          alt=""
          className="h-full"
        />
      </div>
      <form
        onSubmit={onSubmit}
        className="bg-white py-16 px-12 w-1/3 rounded-lg shadow-lg shadow-black/30 relative mx-auto"
      >
        <div className="space-y-2">
          {error &&
            error.map((err) => (
              <p className="uppercase text-sm bg-red-100 text-red-600 py-2 px-2 rounded w-3/4 mx-auto text-center border-[1px] border-red-200">
                {err}
              </p>
            ))}

          <p className="text-lg text-center font-semibold uppercase">
            Ingreso al sistema
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold uppercase">Email</label>
            <input
              {...register("email", { required: true })}
              type="text"
              placeholder="Email"
              className="bg-gray-200 rounded-lg shadow-md shadow-black/30 py-3 px-2 placeholder:text-black/50 outline-none"
            />
            {errors.email && (
              <span className="uppercase text-sm bg-red-100 text-red-600 py-2 px-2 rounded w-1/3 text-center shadow border-[1px] border-red-200">
                El email es requerido
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold uppercase">Contraseña</label>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Contraseña de usuario"
              className="bg-gray-200 rounded-lg shadow-md shadow-black/30 py-3 px-2 placeholder:text-black/50 outline-none"
            />
            {errors.password && (
              <span className="uppercase text-sm bg-red-100 text-red-600 py-2 px-2 rounded w-1/2 text-center shadow border-[1px] border-red-200">
                El password es requerido
              </span>
            )}
          </div>
          <div>
            <input
              type="submit"
              value="Ingresar"
              className="bg-emerald-500 text-white rounded-full hover:shadow-md hover:shadow-black/30 hover:translate-x-1 transition-all ease-in-out py-3 px-12 font-bold uppercase text-center outline-none cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-sm font-semibold">
            {/* <Link
              className="hover:underline transition-all ease-in-out"
              to={"/password-change"}
            >
              ¿Olvidaste tu contraseña?
            </Link> */}
            {/* <Link
              className="hover:underline transition-all ease-in-out"
              to={"/register"}
            >
              ¿No te registraste? Registrase
            </Link> */}
          </div>
        </div>
      </form>
    </section>
  );
};
