package co.edu.unbosque.backend_payroll.projection;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface NominaProjection {

    Short getIdNomina();
    LocalDate getperiodo();
    BigDecimal getRetFuente();
    BigDecimal getRecargos();
    BigDecimal getHorasExtras();
    BigDecimal getPagoTotal();
    BigDecimal getAuxilioTransporte();
    Integer getDiasTrabajados();
    LocalDate getFechaPago();
    Short getContratoIdContrato();
}
