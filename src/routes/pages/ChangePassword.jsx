// import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../../components/formularios/Label";
import { Input } from "../../components/formularios/Input";
import { Button } from "../../components/formularios/Button";
import { toast } from "react-toastify";
import client from "../../api/axios";

export const ChangePassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const res = await client.post("/cambiar-password", data);

    toast.success("¡Contraseña cambiada correctamente, vuelve al login!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: {
        padding: "10px",
        borderRadius: "15px",
        boxShadow: "none",
        border: "1px solid rgb(203 213 225)",
      },
    });

    reset();
  });

  return (
    <section className="max-md:px-4 flex items-center justify-center gap-12 h-screen bg-white flex-col relative">
      <form
        onSubmit={onSubmit}
        className="max-md:w-full flex w-1/4 flex-col gap-4 bg-white border-slate-300 border-[1px] shadow px-10 py-10 rounded-2xl"
      >
        <div className="flex justify-center text-slate-700">
          <h4>Cambiar contraseña del usuario</h4>
        </div>
        {
          <div>
            <div className="flex flex-col gap-1"></div>
          </div>
        }
        <div className="flex flex-col gap-2">
          <Label label="Email para validar contraseña" />
          <Input
            // registro={{ ...register("email", { required: true }) }}
            register={register}
            placeholder={"emailregistro@email.com"}
            type={"email"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label label="Nueva contraseña" />
          <Input
            register={register}
            // registro={{ ...register("password", { required: true }) }}
            placeholder={""}
            type={"password"}
          />
        </div>
        <div>
          <Button type={"submit"} titulo={"Cambiar contraseña del usuario"} />
        </div>

        <div>
          <Link
            to={"/login"}
            className="text-sm text-indigo-600 underline cursor-pointer"
          >
            Volver al login para iniciar sesión.
          </Link>
        </div>
      </form>
    </section>
  );
};
