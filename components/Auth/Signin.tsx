"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios"; 

const Signin = () => {
  const [data, setData] = useState({
    usuario: "",
    clave: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.inhouse.deliver.ar/users/employee/login",
        {
          email: data.usuario,
          password: data.clave
        }
      );
      const token = response.data.token;
      console.log(token);
      
      // Guardar el token en el localStorage
      localStorage.setItem("authToken", token);
  
      setError("");
    } catch (error) {
      if (error.response && error.response.data.message === "Invalid login credentials.") {
        setError("Credenciales de inicio de sesión incorrectas. Por favor, inténtalo de nuevo.");
      } else {
        setError("Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
      }
      console.error("Error al iniciar sesión:", error);
    }
  };
  
  return (
    <>
      {/* <!-- ===== SignIn Form Start ===== --> */}
      <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
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
              Accedé con SSO XWallet
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-7.5 flex flex-col items-center gap-7.5">
                <input
                  type="text"
                  placeholder="Usuario"
                  name="usuario"
                  value={data.usuario}
                  onChange={(e) => setData({ ...data, usuario: e.target.value })}
                  className="w-1/2 border-b border-stroke !bg-white pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white"
                />

                <input
                  type="password" 
                  placeholder="Clave"
                  name="clave"
                  value={data.clave}
                  onChange={(e) =>
                    setData({ ...data, clave: e.target.value })
                  }
                  className="w-1/2 border-b border-stroke !bg-white pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white"
                />
              </div>

              <div style={{ textAlign: 'center' }}>

              {error && <p className="text-red-500">{error}</p>} {/* Mostrar el mensaje de error */}

              </div>
              
              <div className="flex justify-center"> 
                <button
                  type="submit" 
                  aria-label="login with email and password"
                  className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                  style={{ margin: '20px' }} 
                >
                  Log in
                  <svg
                    className="fill-white"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                      fill=""
                    />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      {/* <!-- ===== SignIn Form End ===== --> */}
    </>
  );
};

export default Signin;
