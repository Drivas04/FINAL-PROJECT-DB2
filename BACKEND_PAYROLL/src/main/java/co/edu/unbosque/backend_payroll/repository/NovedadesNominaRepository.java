package co.edu.unbosque.backend_payroll.repository;

import co.edu.unbosque.backend_payroll.dto.NovedadDTO;
import co.edu.unbosque.backend_payroll.entity.Novedadesnomina;
import co.edu.unbosque.backend_payroll.projection.NovedadNominaProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface NovedadesNominaRepository extends JpaRepository<Novedadesnomina, Short> {

    @Query(value = "SELECT * FROM fn_consultar_novedadesnomina()", nativeQuery = true)
    List<NovedadNominaProjection> getPayrollNews();

    @Procedure(value = "sp_agregar_novedadnomina")
    void agregarNovedadNomina(
            @Param("pv_tipoNovedad") String tipoNovedad,
            @Param("pv_descripcion") String descripcion,
            @Param("pd_fechaInicio") LocalDate fechaInicio,
            @Param("pd_fechaFin") LocalDate fechaFin,
            @Param("pn_nominaId") Short idNomina
    );

    @Procedure(value = "sp_eliminar_novedadnomina")
    void eliminarNovedadNomina(
            @Param("pn_id_novedad") Short idNovedad
    );


}
