package co.edu.unbosque.backend_payroll.repository;

import co.edu.unbosque.backend_payroll.entity.Nomina;
import co.edu.unbosque.backend_payroll.projection.NominaProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface NominaRepository extends JpaRepository<Nomina, Long> {

    @Query(value = "SELECT * FROM Nomina ", nativeQuery = true)
    List<NominaProjection> consultarNominas();

    @Query(value = "SELECT n.* FROM nomina n " +
            "JOIN contrato c ON n.contrato_id_contrato = c.id_contrato " +
            "WHERE c.empleado_id_empleado = :empleadoId", nativeQuery = true)
    List<NominaProjection> findNominasByEmpleadoId(@Param("empleadoId") Short empleadoId);

    @Query(value = "SELECT * FROM fn_consultar_nomina(:pn_id_nomina)", nativeQuery = true)
    NominaProjection consultarNominaPorId(@Param("pn_id_nomina") Short idNomina);

    @Query(value = "SELECT * FROM nomina n WHERE n.contrato_id_contrato = :contratoId", nativeQuery = true)
    List<NominaProjection> findByContratoId(@Param("contratoId") Integer contratoId);

    @Procedure(procedureName = "sp_agregarnomina")
    void agregarNomina(@Param("pd_periodo") LocalDate periodo,
                       @Param("pn_idcontrato") Short idContrato,
                       @Param("pn_horasExtras") Integer horasExtras);

    @Procedure(procedureName = "sp_eliminar_nomina")
    void eliminarNomina(@Param("pn_id_nomina") Short idNomina);

   
}
