import { useAuthContext } from "../../contexts/AuthContext";
import { EmotivaHome } from "../home/structure/home/structure/admin/EmotivaHome";
import { EmotivaHomeAdmin } from "../home/structure/home/structure/admin/EmotivaHomeAdmin";

export const EmotivaHomeUserRouter = () => {
  const { isAuthenticated, rol } = useAuthContext();
  const isAdminPage = isAuthenticated && ["Administrador", "Noticias", "Deportes", "Entretenimiento", "Estilo"].includes(rol);
  return (
    <div>{ isAdminPage ? <EmotivaHomeAdmin /> : <EmotivaHome /> }</div>
  );
};
