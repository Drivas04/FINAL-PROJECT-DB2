package co.edu.unbosque.backend_payroll.repository;

import co.edu.unbosque.backend_payroll.entity.Apropiacion;
import co.edu.unbosque.backend_payroll.projection.ApropiacionProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ApropiacionRepository extends JpaRepository<Apropiacion, Short> {

    @Query(value = "SELECT * FROM fn_consultarapropiaciones()", nativeQuery = true)
    List<ApropiacionProjection> consultarApropiaciones();

    @Procedure(procedureName = "sp_agregarapropiacion")
    void agregarApropiacion(@Param("pv_tipo_apropiacion") String tipoApropiacion,
                          @Param("pn_valor") BigDecimal valor,
                          @Param("pn_Nomina_ID_Nomina") Short nominaIdNomina);

    @Query(value = "SELECT * FROM apropiacion a WHERE a.nomina_id_nomina = :nominaId", nativeQuery = true)
    List<ApropiacionProjection> findByNominaId(@Param("nominaId") Short nominaId);
}

