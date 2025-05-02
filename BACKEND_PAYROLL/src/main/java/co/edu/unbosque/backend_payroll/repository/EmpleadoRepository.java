package co.edu.unbosque.backend_payroll.repository;

import co.edu.unbosque.backend_payroll.projection.EmpleadoProjection;
import co.edu.unbosque.backend_payroll.entity.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EmpleadoRepository  extends JpaRepository<Empleado, Short> {

    @Query(value = "SELECT * FROM fn_consultarempleados()", nativeQuery = true)
    List<EmpleadoProjection> findAllEmpleados();

    @Procedure(procedureName = "sp_agregarEmpleado")
    void agregarEmpleado(@Param("pv_nombre") String nombre,
                         @Param("pv_apellido") String apellido,
                         @Param("pv_tipo_documento") String tipoDocumento,
                         @Param("pv_numero_documento") String numeroDocumento,
                         @Param("pv_correo") String correo,
                         @Param("pv_telefono") String telefono,
                         @Param("pv_direccion") String direccion,
                         @Param("pd_fecha_nacimiento")LocalDate fechaNacimiento,
                         @Param("pd_fecha_contratacion") LocalDate fechaContratacion,
                         @Param("pv_eps_empleado") String eps,
                         @Param("pn_Departamento_ID_Departamento") Short idDepartamento,
                         @Param("pn_CuentaBancaria_Numero_cuenta") Long numeroCuenta);


    @Procedure(procedureName = "sp_actualizarempleado")
    void actualizarEmpleado(@Param("pn_ID_Empleado") Short idEmpleado,
                            @Param("pv_nombre") String nombre,
                            @Param("pv_apellido") String apellido,
                            @Param("pv_tipo_documento") String tipoDocumento,
                            @Param("pv_numero_documento") String numeroDocumento,
                            @Param("pv_correo") String correo,
                            @Param("pv_telefono") String telefono,
                            @Param("pv_direccion") String direccion,
                            @Param("pd_fecha_nacimiento")LocalDate fechaNacimiento,
                            @Param("pd_fecha_contratacion") LocalDate fechaContratacion,
                            @Param("pv_eps_empleado") String eps,
                            @Param("pn_Departamento_ID_Departamento") Short idDepartamento,
                            @Param("pn_CuentaBancaria_Numero_cuenta") Long numeroCuenta);
}


