package co.edu.unbosque.backend_payroll.projection;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface ContratoProjection {

    Short getIdContrato();
    BigDecimal getSalario();
    String getTipoContrato();
    String getNombreCargo();
    LocalDate getFechaInicio();
    LocalDate getFechaFin();
    String getEstado();
    Short getIdEmpleado();
}
