"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

// Define the Employee interface
interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  monthlySalary: number;
  department: string;
  age: number;
  state: string;
  gender: string;
  birthDate: string;
  __v: number;
}

const UserEmpleado = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setHasMounted(true);

    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get('https://api.inhouse.deliver.ar/users/employee', {
          headers: {
            Authorization: `${localStorage.getItem("authToken")}`,
          },
        });

        if (response.data) {
          setEmployees(response.data);
        } else {
          setError('API error');
        }
      } catch (error) {
        setError('Usted no está autorizado.');
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (email: string) => {
    try {
      const token = localStorage.getItem("authToken");
      console.log("Token:", token); // Verificar si el token se está obteniendo correctamente
  
      const response = await axios.delete('https://api.inhouse.deliver.ar/users/employee', {
        headers: {
          Authorization: token,
        },
        data: {
          email: email
        }
      });
    
      console.log("Response:", response); // Registrar la respuesta de la API para verificar si se completó con éxito
    
      setEmployees(employees.filter(employee => employee.email !== email));
    } catch (error) {
      console.error("Error:", error); // Registrar cualquier error que ocurra durante la solicitud
      setError('Ops. Contacte a XWallet Help Desk y comparta el id: 0803');
    }
  };
  
  if (!hasMounted) {
    return null;
  }

  return (
    <section className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <div className="animate_top mx-auto text-center">
          <SectionHeader
            headerInfo={{
              title: `Employees`,
              subtitle: `Summary of Employees`,
              description: `The listed employees have access to XWallet Internal.`,
            }}
          />
        </div>
      </div>

      <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
        {error && <p className="text-red-500">{error}</p>}
        {employees.length === 0 ? (
          <p>No se encontraron empleados.</p>
        ) : (
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {employees.map((employee) => (
              <motion.div
                key={employee._id}
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="animate_top rounded-lg bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection"
              >
                <div className="px-4">
                  <h3 className="mb-3.5 mt-7.5 text-lg font-medium text-black dark:text-white xl:text-itemtitle2">
                    {employee.firstName} {employee.lastName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email: {employee.email}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Department: {employee.department}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Salary: {employee.monthlySalary}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Gender: {employee.gender}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Birth Date: {new Date(employee.birthDate).toLocaleDateString()}</p>
                  <div className="flex justify-center mt-4">
                  <button
                    className="rounded bg-red-500 py-2 px-4 text-white hover:bg-red-700"
                    onClick={() => handleDelete(employee.email)}
                  >
                    Eliminar acceso
                  </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UserEmpleado;

// SectionHeader Component
const SectionHeader = ({ headerInfo }: { headerInfo: { title: string; subtitle: string; description: string; } }) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-black dark:text-white">{headerInfo.title}</h2>
      <p className="text-lg text-black dark:text-white">{headerInfo.subtitle}</p>
      <p className="text-sm text-gray-600">{headerInfo.description}</p>
    </div>
  );
};
