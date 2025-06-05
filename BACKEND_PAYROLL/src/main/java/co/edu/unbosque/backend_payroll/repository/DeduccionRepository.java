package co.edu.unbosque.backend_payroll.repository;

import co.edu.unbosque.backend_payroll.entity.Deduccion;
import co.edu.unbosque.backend_payroll.projection.DeduccionProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface DeduccionRepository extends JpaRepository<Deduccion, Long> {

    @Query(value = "SELECT * FROM fn_consultardeducciones()", nativeQuery = true)
    List<DeduccionProjection> consultarDeducciones();

    @Procedure(procedureName = "sp_agregardeduccion")
    void agregarDeduccion(@Param("pv_tipo_deduccion") String tipoDeduccion,
                          @Param("pn_valor") BigDecimal valor,
                          @Param("pv_descripcion") String descripcion,
                          @Param("pn_Nomina_ID_Nomina") Short nominaIdNomina);

    @Query(value = "SELECT * FROM deduccion d WHERE d.nomina_id_nomina = :nominaId", nativeQuery = true)
    List<DeduccionProjection> findByNominaId(@Param("nominaId") Short nominaId);
}
