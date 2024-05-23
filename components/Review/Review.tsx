"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Dialog from "./ReviewDialog";
import {
  parseEmploymentStatus,
  parseFraudSituation,
  parseHasTesla,
  parseVerified,
} from "./reviewUtils";

const Review = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [userList, setUserList] = useState([
    {
      _id: "6644314177479c1546b55114",
      firstName: "user1",
      lastName: "perez",
      email: "user.prueba18@cmail.com",
      password: "asdasd",
      picture: " data:image/png;base64,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",
      immovables: "0",
      monthlyIncome: ">1000",
      employmentSituation: "employee",
      hasTesla: "yes",
      verified: "VERIFIED",
      approved: "PENDING",
      creditScore: 700,
      fraudSituation: "PENDING_RISKY",
      __v: 0,
    },
    {
      _id: "66443b6cf420f376375ed189",
      firstName: "user1",
      lastName: "perez",
      email: "user.prueba21@cmail.com",
      password: "asdasd",
      picture: "asdfasdfds",
      immovables: "0",

      monthlyIncome: ">1000",
      employmentSituation: "employee",
      hasTesla: "yes",
      verified: "PENDING",
      approved: "PENDING",
      creditScore: 700,
      fraudSituation: "TRUSTWORTHY",
      __v: 0,
    },
  ]);

  const approveCurrentUser = () => {
    setOpenDialog(false);

    console.log("Aprobar");
  };

  const rejectCurrentUser = () => {
    setOpenDialog(false);

    console.log("Rechazar");
  };

  const reviewUser = (index) => {
    setSelectedUser(userList[index]);
    setOpenDialog(true);
  };

  return (
    <>
      <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="relative z-1 mx-auto px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-17.5 left-0 -z-1 h-1/3 w-full">
            <Image
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
          >
            <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
              Revisión de Usuarios
            </h2>

            <form>
              <div className="mb-7.5 flex flex-col items-center gap-7.5">
                <table className="table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Nombre</th>
                      <th className="border px-4 py-2">Apellido</th>
                      <th className="border px-4 py-2">Email</th>
                      <th className="border px-4 py-2">Inmuebles</th>
                      <th className="border px-4 py-2">Ingreso mensual</th>
                      <th className="border px-4 py-2">Situación laboral</th>
                      <th className="border px-4 py-2">Tiene Tesla</th>
                      <th className="border px-4 py-2">
                        Estado de verificación
                      </th>
                      <th className="border px-4 py-2">Puntaje de crédito</th>
                      <th className="border px-4 py-2">Evaluación</th>
                      <th className="border px-4 py-2">Ver</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) => (
                      <tr key={user._id}>
                        <td className="border px-4 py-2">{user.firstName}</td>
                        <td className="border px-4 py-2">{user.lastName}</td>
                        <td className="border px-4 py-2">{user.email}</td>
                        <td className="border px-4 py-2">{user.immovables}</td>
                        <td className="border px-4 py-2">
                          {user.monthlyIncome}
                        </td>
                        <td className="border px-4 py-2">
                          {parseEmploymentStatus(user.employmentSituation)}
                        </td>
                        <td className="border px-4 py-2">
                          {parseHasTesla(user.hasTesla)}
                        </td>
                        <td className="border px-4 py-2">
                          {parseVerified(user.verified)}
                        </td>
                        <td className="border px-4 py-2">{user.creditScore}</td>
                        <td className="border px-4 py-2">
                          {parseFraudSituation(user.fraudSituation)}
                        </td>
                        <td
                          className="border px-4 py-2"
                          onClick={() => reviewUser(index)}
                        >
                          <Image
                            src="/images/user/profilePhoto.png"
                            alt="Abrir foto"
                            className="mx-auto"
                            width={30}
                            height={30}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      <Dialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        title={"Revisión de Usuario"}
        handleApprove={approveCurrentUser}
        handleReject={rejectCurrentUser}
        user={selectedUser}
      />
    </>
  );
};

export default Review;
