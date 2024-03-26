// import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
    <section className="max-md:px-4 flex items-center justify-center gap-12 h-screen bg-white flex-col relative">
      <form
        onSubmit={onSubmit}
        className="max-md:w-full flex w-1/4 flex-col gap-4 bg-white border-slate-300 border-[1px] shadow px-10 py-10 rounded-xl"
      >
        <div className="flex justify-center text-slate-700">
          <h4>Iniciar Sesion</h4>
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
            // registro={{ ...register("email", { required: true }) }}
            register={register}
            placeholder={"emailregistro@email.com"}
            type={"email"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label label="Contraseña del registro" />
          <Input
            register={register}
            // registro={{ ...register("password", { required: true }) }}
            placeholder={""}
            type={"password"}
          />
        </div>
        <div>
          <Button type={"submit"} titulo={"Iniciar Sesión"} />
        </div>
      </form>
    </section>
  );
};
