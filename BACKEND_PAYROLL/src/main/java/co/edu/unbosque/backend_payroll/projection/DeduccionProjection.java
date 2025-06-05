package co.edu.unbosque.backend_payroll.projection;

import java.math.BigDecimal;

public interface DeduccionProjection {
    Short getIdDeduccion();
    String getTipoDeduccion();
    BigDecimal getValor();
    String getDescripcion();
    Short getNominaIdNomina();
}
