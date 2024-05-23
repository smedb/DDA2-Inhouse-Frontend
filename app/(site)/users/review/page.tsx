import Review from "@/components/Review/Review";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review de Usuarios",
  description: "Pagina para aprobar o rechazar usuarios",
};

export default function ReviewPage() {
  return (
    <>
      <Review />
    </>
  );
}
