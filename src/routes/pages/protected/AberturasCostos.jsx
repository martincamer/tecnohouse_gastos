import { AberturasIntro } from "../../../components/aberturas/AberturasIntro";
import { CrearAberturasCategorias } from "../../../components/aberturas/CrearAberturasCategorias";
import { ModalCrearNuevaAbertura } from "../../../components/aberturas/ModalCrearAbertura";
import { ModalPrecios } from "../../../components/precios/ModalPrecios";
import { useAberturasContext } from "../../../context/AberturasProvider";

export const AberturasCostos = () => {
  const { isOpen, openModal, closeModal } = useAberturasContext();

  return (
    <section className="w-full py-12 px-12 max-md:px-4 flex flex-col gap-8">
      <AberturasIntro />
      <CrearAberturasCategorias /*results={results}*/ />
      <ModalCrearNuevaAbertura />
      <ModalPrecios />
    </section>
  );
};
