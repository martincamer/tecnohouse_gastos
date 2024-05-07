// import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { Label } from "../../components/formularios/Label";
import { Input } from "../../components/formularios/Input";
import { Button } from "../../components/formularios/Button";

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
    <section className="max-md:px-4 h-screen flex justify-center items-center w-full gap-2">
      <div
        className="w-full h-full bg-gradient-to-br from-indigo-700 to-orange-400"
        // style={{
        //   objectFit: "cover",
        //   backgroundRepeat: "no-repeat",
        //   height: "100%",
        //   width: "100%",
        //   background:
        //     "url(https://images.pexels.com/photos/583848/pexels-photo-583848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
        // }}
      ></div>
      <div className="w-full">
        <form
          onSubmit={onSubmit}
          className="max-md:w-full flex w-1/2 flex-col gap-4 bg-white shadow-2xl px-10 py-10 rounded-xl mx-auto"
        >
          <div className="flex justify-center text-slate-700">
            <h4 className="flex flex-col gap-1 justify-center items-center">
              <span className="font-bold text-xl">
                Te damos la bienvenida 👋
              </span>
              Crea tus presupuestos y gestiona tus aberturas
            </h4>
          </div>
          {
            <div>
              <div className="flex flex-col gap-1">
                {error?.map((e) => (
                  <span className="bg-red-500/10 rounded-lg px-2 py-1 text-red-600 text-sm border-[1px] border-red-500/30">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          }
          <div className="flex flex-col gap-2">
            <Label label="Email del registro" />
            <Input
              register={register}
              placeholder={"emailregistro@email.com"}
              type={"email"}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label label="Contraseña del registro" />
            <Input register={register} placeholder={""} type={"password"} />
          </div>
          <div>
            <Button type={"submit"} titulo={"Iniciar Sesión"} />
          </div>

          <div>
            <Link
              to={"/cambiar-contraseña-tecnohouse"}
              className="text-sm text-indigo-600 underline cursor-pointer"
            >
              Cambiar la contraseña de la cuenta.
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};
