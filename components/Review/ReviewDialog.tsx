import { Fragment, useRef, useState } from "react";
import Image from "next/image";
import {
  parseEmploymentStatus,
  parseHasTesla,
  parseVerified,
  parseFraudSituation,
} from "./reviewUtils";

export default function ReviewDialog({
  open,
  handleClose,
  handleApprove,
  handleReject,
  title,
  user,
}) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm backdrop-opacity-300">
          <div className="bg-white dark:bg-black rounded-lg shadow-2xl p-6">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="flex">
              <div>
                <p className="mb-1 font-bold">Nombre</p>
                <p className="mb-2">{user.firstName}</p>
                <p className="mb-1 font-bold">Apellido</p>
                <p className="mb-2">{user.lastName}</p>
                <p className="mb-1 font-bold">Email</p>
                <p className="mb-2">{user.email}</p>
                <p className="mb-1 font-bold">Inmuebles</p>
                <p className="mb-2">{user.properties ?? user.immovables}</p>
                <p className="mb-1 font-bold">Ingreso mensual</p>
                <p className="mb-2">{user.monthlyIncome}</p>
                <p className="mb-1 font-bold">Situación laboral</p>
                <p className="mb-2">
                  {parseEmploymentStatus(user.employmentSituation)}
                </p>
                <p className="mb-1 font-bold">Tiene Tesla</p>
                <p className="mb-2">{parseHasTesla(user.hasTesla)}</p>
                <p className="mb-1 font-bold">Estado de verificación</p>
                <p className="mb-2">{parseVerified(user.verified)}</p>
                <p className="mb-1 font-bold">Puntaje de crédito</p>
                <p className="mb-2">{user.creditScore}</p>
                <p className="mb-1 font-bold">Evaluación</p>
                <p className="mb-2">
                  {parseFraudSituation(user.fraudSituation)}
                </p>
              </div>
              <div className="pl-20">
                <p className="font-bold">Foto del pasaporte</p>
                <Image
                  src={user.pictureIdPassport}
                  alt="Foto del pasaporte"
                  className="mx-auto py-2"
                  width={250}
                  height={250}
                />
                <p className="font-bold">Foto del usuario</p>
                <Image
                  src={user.pictureSelfie}
                  alt="Foto del usuario"
                  className="mx-auto py-2"
                  width={250}
                  height={250}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="text-black dark:text-white font-bold py-2 px-4 mx-2 rounded"
                onClick={handleClose}
              >
                Cerrar
              </button>{" "}
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mx-2 rounded"
                onClick={handleReject}
              >
                Rechazar
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mx-2 rounded"
                onClick={handleApprove}
              >
                Aprobar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
