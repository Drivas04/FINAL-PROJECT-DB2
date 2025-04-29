package co.edu.unbosque.backend_payroll.repository;

import co.edu.unbosque.backend_payroll.entity.Liquidacioncesantia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface LiquidacionCensantiasRepository extends JpaRepository<Liquidacioncesantia, Short> {

    @Procedure(procedureName = "sp_agregar_liquidacion_cesantias")
    void agregarLiquidacionCesantias(@Param("pv_periodo") String periodo,
                                     @Param("pd_fecha_pago") LocalDate fechaPago,
                                     @Param("pv_motivo_retiro") String motivoRetiro,
                                     @Param("pv_fondo_cesantias") String fondoCesantias,
                                     @Param("pn_id_contrato") Short idContrato);
}
