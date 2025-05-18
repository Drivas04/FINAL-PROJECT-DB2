package co.edu.unbosque.backend_payroll.repository;

import co.edu.unbosque.backend_payroll.dto.ContratoDTO;
import co.edu.unbosque.backend_payroll.entity.Contrato;
import co.edu.unbosque.backend_payroll.projection.ContratoProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ContratoRepository extends JpaRepository<Contrato, Long> {

    @Query(value = "SELECT * FROM fn_consultarcontratos()", nativeQuery = true)
    List<ContratoProjection> findAllContratos();

    @Procedure(procedureName = "sp_agregarcontrato")
    void agregarContrato(@Param("pn_salario") BigDecimal salario,
                         @Param("pv_tipo_contrato") String tipoContrato,
                         @Param("pv_nombre_cargo") String cargo,
                         @Param("pd_fecha_inicio") LocalDate fechaInicio,
                         @Param("pd_fecha_fin") LocalDate fechaFin,
                         @Param("pv_estado") String estado,
                         @Param("pv_nombre") String nombre,
                         @Param("pv_apellido") String apellido,
                         @Param("pv_tipo_documento") String tipoDocumento,
                         @Param("pv_numero_documento") String numeroDocumento,
                         @Param("pv_correo") String correo,
                         @Param("pv_telefono") String telefono,
                         @Param("pv_direccion") String direccion,
                         @Param("pd_fecha_nacimiento") LocalDate fechaNacimiento,
                         @Param("pd_fecha_contratacion") LocalDate fechaContratacion,
                         @Param("pv_eps_empleado") String epsEmpleado,
                         @Param("pn_Departamento_ID_Departamento") Short deapartamentoId,
                         @Param("pn_CuentaBancaria_Numero_cuenta") Long numeroCuentaBancaria,
                         @Param("pn_Banco_ID_Banco") Short idBanco);

    @Procedure(procedureName = "sp_actualizarcontrato")
    void actualizarContrato(@Param("pn_ID_Contrato") Short idContrato,
                            @Param("pn_salario") BigDecimal salario,
                            @Param("pv_tipo_contrato") String tipoContrato,
                            @Param("pv_nombre_cargo") String cargo,
                            @Param("pd_fecha_inicio") LocalDate fechaInicio,
                            @Param("pd_fecha_fin") LocalDate fechaFin,
                            @Param("pv_estado") String estado,
                            @Param("pn_Empleado_ID_Empleado") Short empleadoIdEmpleado);
}
