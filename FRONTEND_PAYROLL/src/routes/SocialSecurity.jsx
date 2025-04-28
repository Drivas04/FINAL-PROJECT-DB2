import { useDataContext } from '@/context/DataContext';
import { apropriations } from '@/data/appropriations';
import { deductions } from '@/data/deductions';
import React, { useState } from 'react';
import useSearch from '@/hooks/useSearch';
import { MdOutlineSecurity } from "react-icons/md";
import { CiUser } from "react-icons/ci";

export const SocialSecurity = () => {
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [nominasEmpleado, setNominasEmpleado] = useState([]);
  const [nominaSeleccionada, setNominaSeleccionada] = useState(null);

  const { employees, contracts, payrolls } = useDataContext();
  const { search, setSearch, filteredData: empleadosFiltrados } = useSearch(employees, "nombre");

  const handleEmpleadoSelect = (empleadoId) => {
    const empleado = employees.find((emp) => emp.id_empleado === empleadoId);
    setEmpleadoSeleccionado(empleado);

    const contrato = contracts.find((c) => c.id_empleado === empleadoId);
    if (!contrato) {
      setNominasEmpleado([]);
      setNominaSeleccionada(null);
      return;
    }

    const nominas = payrolls.filter((n) => n.id_contrato === contrato.id_contrato);
    setNominasEmpleado(nominas);
    setNominaSeleccionada(null);
  };

  const handleNominaChange = (e) => {
    const nominaId = parseInt(e.target.value);
    const nomina = nominasEmpleado.find((n) => n.id_nomina === nominaId);
    setNominaSeleccionada(nomina);
  };

  const obtenerDatosSeguridadSocial = (nominaId) => {
    const deduccionesNomina = deductions.filter((d) => d.nomina_id_nomina === nominaId);
    const apropiacionesNomina = apropriations.filter((a) => a.nomina_id_nomina === nominaId);

    return {
      deducciones: deduccionesNomina,
      apropiaciones: apropiacionesNomina,
    };
  };

  const datosSeguridadSocial = nominaSeleccionada
    ? obtenerDatosSeguridadSocial(nominaSeleccionada.id_nomina)
    : { deducciones: [], apropiaciones: [] };

  const totalEmpleado = datosSeguridadSocial.deducciones.reduce((sum, item) => sum + item.valor, 0);
  const totalEmpresa = datosSeguridadSocial.apropiaciones.reduce((sum, item) => sum + item.valor, 0);

  return (
    <div className=" flex flex-col p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6 mt-10 content-center items-center h-[calc(100vh-180px)]">
        <MdOutlineSecurity className='size-28' />
      <h1 className="text-2xl font-bold text-center">Seguridad Social</h1>

      <div className="text-center space-y-4 w-72 mx-auto">
        <input
          type="text"
          className="border p-2 rounded w-full md:w-1/2"
          placeholder="Buscar empleado por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <div className="border rounded-md max-h-60 overflow-y-auto mt-2 w-full md:w-1/2 mx-auto bg-white shadow">
            {empleadosFiltrados.length > 0 ? (
              empleadosFiltrados.map((emp) => (
                <div
                  key={emp.id_empleado}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-left"
                  onClick={() => {
                    handleEmpleadoSelect(emp.id_empleado);
                    setSearch(""); 
                  }}
                >
                  {emp.nombre}
                </div>
              ))
            ) : (
              <p className="p-2 text-gray-500">No se encontraron empleados</p>
            )}
          </div>
        ) }
      </div>

      {empleadoSeleccionado && nominasEmpleado.length > 0 && (
        <div className="text-center">
          <select
            className="border p-2 rounded mt-4"
            onChange={handleNominaChange}
            defaultValue=""
          >
            <option value="" disabled>Selecciona un período de nómina</option>
            {nominasEmpleado.map((nomina) => (
              <option key={nomina.id_nomina} value={nomina.id_nomina}>
                {nomina.periodo}
              </option>
            ))}
          </select>
        </div>
      )}

      {!nominaSeleccionada ? (
          <div className="flex flex-col items-center p-2 text-gray-500">
            <p>Ingrese el nombre del empleado y el periodo de la nómina que quiere consultar</p>
            <CiUser className="text-4xl mt-2" />
          </div>
        ): (
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-lg font-semibold">{empleadoSeleccionado.nombre}</p>
            <p className="text-gray-600">{nominaSeleccionada.periodo}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-32 pt-24">
            <div>
              <h2 className="text-xl font-semibold mb-2">🧾 Deducciones</h2>
              <ul className="space-y-2">
                {datosSeguridadSocial.deducciones.map((item) => (
                  <li key={item.id_deduccion} className="flex justify-between border-b pb-1">
                    <span>{item.tipo_deduccion}</span>
                    <span>${item.valor.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-bold">Total empleado: ${totalEmpleado.toLocaleString()}</p>
            </div>

            {/* Apropiaciones */}
            <div>
              <h2 className="text-xl font-semibold mb-2">💼 Apropiaciones</h2>
              <ul className="space-y-2">
                {datosSeguridadSocial.apropiaciones.map((item) => (
                  <li key={item.id_apropiacion} className="flex justify-between border-b pb-1">
                    <span>{item.tipo_apropiacion}</span>
                    <span>${item.valor.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-bold">Total empresa: ${totalEmpresa.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
