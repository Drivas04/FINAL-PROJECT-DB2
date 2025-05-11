package co.edu.unbosque.backend_payroll.projection;

import java.math.BigDecimal;

public interface ApropiacionProjection {
    Short getIdApropiacion();
    String getTipoApropiacion();
    BigDecimal getValor();
    Short getNominaIdNomina();
}
