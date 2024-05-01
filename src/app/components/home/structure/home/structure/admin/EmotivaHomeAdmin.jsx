import { Entertainment } from "../../entertainment/Entertainment";
import { Footer } from "../../footer/Footer";
import { NavbarAdmin } from "../../navbar/admin/admin/NavbarAdmin";
import { Fecha } from "../../navbar/fecha/Fecha";
import { Relevante } from "../../relevante/Relevante";
import { Slider } from "../../slider/Slider";
import { SportEnt } from "../../sportEnt/SportEnt";
import { Staff } from "../../staff/Staff";
import { StyleTop } from "../../styletop/StyleTop";

export const EmotivaHomeAdmin = () => {
  const hrStyle = {
    margin: "0px 0",
    paddingLeft: "15%"
  };

  return (
    <div>
      <Fecha />
      <NavbarAdmin />
      <Slider />
      <Staff />
      <hr style={hrStyle} />
      <Relevante />
      <hr style={hrStyle} />
      <StyleTop />
      <hr style={hrStyle} />
      <SportEnt />
      <hr style={hrStyle} />
      <Entertainment />
      <Footer />
    </div>
  );
};
