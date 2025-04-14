import { links } from "@/data/links";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === "/";
  const navLinks = links;

  const logoutHandler = () => {
    localStorage.removeItem("userSession");
    navigate("/");
  };

  return (
    <header className="bg-gray-200 top-0 w-full px-3 border-b border-gray-300 shadow-md flex justify-between items-center content-center">
      <div className="flex items-center">
        <img
          className="ml-2"
          src="logo-rh.png"
          alt="logo"
          width="100px"
          height="100px"
        />
        <h1 className="text-xl font-semibold text-gray-800 ml-3 tablet:text-2xl pc:text-4xl text-center">
          Aplicación de Recursos Humanos
        </h1>
      </div>


      {!isAuthPage && (
        <nav className="flex justify-end gap-5 ">
          {navLinks.map((link) => {
            return (
              <Link
              key={link.id}
              to={link.path}
              className={`${
                link.path === location.pathname &&
                "text-violet-600 border-b-2 font-semibold border-violet-600 tex"
              }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Button className="ml-4" onClick={logoutHandler}>
            Cerrar sesión
          </Button>
        </nav>
      )}
    </header>
  );
};
