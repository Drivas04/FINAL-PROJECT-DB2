package co.edu.unbosque.backend_payroll.projection;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface CesantiasProjection {
    Short getIdLiquidacion();
    String getPeriodo();
    BigDecimal getInteresesCesantias();
    BigDecimal getValorCesantias();
    LocalDate getFechaPago();
    String getMotivoRetiro();
    String getFondoCesantias();
    Short getContratoIdContrato();
}
