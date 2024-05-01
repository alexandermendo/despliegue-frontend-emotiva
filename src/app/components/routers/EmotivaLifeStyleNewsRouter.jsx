import { useAuthContext } from "../../contexts/AuthContext";
import { NavbarFijoAdmin } from "../home/structure/home/navbar/admin/fijo-admin/NavbarFijoAdmin";
import { NavbarFijo } from "../home/structure/home/navbar/navbar/fijo/NavbarFijo";
import { StyleTopView } from "../home/structure/home/styletop/styletop-view/StyleTopView";
import { Footer } from "../home/structure/home/footer/Footer";

export const EmotivaLifeStyleNewsRouter = () => {
  const { isAuthenticated, rol } = useAuthContext();
  console.log("Autenticado: ", isAuthenticated);
  console.log("Rol: ", rol);

  const navbarComponent = isAuthenticated ? (
    rol === "Administrador" ? <NavbarFijoAdmin /> : <NavbarFijo />
  ) : <NavbarFijo />;

  return (
    <div>
      {navbarComponent}
      <StyleTopView />
      <Footer />
    </div>
  );
}