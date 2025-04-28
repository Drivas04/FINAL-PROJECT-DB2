package co.edu.unbosque.backend_payroll.repository;

import co.edu.unbosque.backend_payroll.dto.NovedadDTO;
import co.edu.unbosque.backend_payroll.entity.Novedadesnomina;
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

    @Query("SELECT new co.edu.unbosque.backend_payroll.dto.NovedadDTO(" +
            "n.id, n.tipoNovedad, n.descripcion, n.valorAfectacion, " +
            "n.fechaInicio, n.fechaFin, n.nominaIdNomina.id) " +
            "FROM Novedadesnomina n")
    List<NovedadDTO> getPayrollNews();

    @Procedure(value = "sp_agregar_novedadnomina")
    void agregarNovedadNomina(
            @Param("pv_tipo_novedad") String tipoNovedad,
            @Param("pv_descripcion") String descripcion,
            @Param("pn_valor_afectacion") BigDecimal valorAfectacion,
            @Param("pd_fecha_inicio") LocalDate fechaInicio,
            @Param("pd_fecha_fin") LocalDate fechaFin,
            @Param("pn_id_nomina") Short idNomina
    );


}
