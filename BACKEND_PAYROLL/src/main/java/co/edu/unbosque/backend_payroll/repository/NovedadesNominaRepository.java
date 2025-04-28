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

    @Query(value = "SELECT id_novedad, tipo_novedad, descripcion, valor_afectacion, fecha_inicio, fecha_fin, nomina_id_nomina FROM public.fn_consultar_novedadesnomina()", nativeQuery = true)
    List<Novedadesnomina> getPayrollNews();

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
