import UserEmpleado from "@/components/UserEmpleado";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review de Usuarios",
  description: "Pagina para aprobar o rechazar usuarios",
};

export default function UserView() {
  return (
    <>
      <UserEmpleado />
    </>
  );
}
