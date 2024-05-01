import { useAuthContext } from "../../../../../../contexts/AuthContext";
import { Footer } from "../../footer/Footer";
import { NavbarFijoAdmin } from "../../navbar/admin/fijo-admin/NavbarFijoAdmin";
import { NavbarFijo } from "../../navbar/navbar/fijo/NavbarFijo";
import { DetalleStaff } from "../../staff/DetalleStaff";

export const EmotivaStaff = () => {
  const { isAuthenticated, rol } = useAuthContext();
  console.log("Autenticado: ", isAuthenticated);
  console.log("Rol: ", rol);

  const navbarComponent = isAuthenticated ? ( rol === "Administrador" ? <NavbarFijoAdmin /> : <NavbarFijo />) : <NavbarFijo />;

  return (
    <div>
      {navbarComponent}
      <DetalleStaff />
      <Footer />
    </div>
  )
}
