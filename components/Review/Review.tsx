"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
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

  const [userList, setUserList] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.inhouse.deliver.ar/users/unapproved",
          {
            headers: {
              Authorization: `${localStorage.getItem("authToken")}`,
            },
          },
        );
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        const data = await response.json();
        setUserList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const editUser = async (userId, value) => {
    try {
      const response = await fetch(
        `https://api.inhouse.deliver.ar/users/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(value),
        },
      );
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      setUserList([...userList.filter((user) => user._id !== userId)]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const approveCurrentUser = async () => {
    setOpenDialog(false);

    await editUser(selectedUser._id, true);
  };

  const rejectCurrentUser = async () => {
    setOpenDialog(false);

    await editUser(selectedUser._id, false);
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
                {userList ? (
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
                          <td className="border px-4 py-2">
                            {user.immovables}
                          </td>
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
                          <td className="border px-4 py-2">
                            {user.creditScore}
                          </td>
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
                ) : (
                  <p>No hay usuarios para revisar</p>
                )}
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
