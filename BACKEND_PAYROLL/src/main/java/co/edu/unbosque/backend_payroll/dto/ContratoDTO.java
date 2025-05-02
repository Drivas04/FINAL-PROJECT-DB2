package co.edu.unbosque.backend_payroll.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ContratoDTO {

    BigDecimal salario;
    String tipoContrato;
    String nombreCargo;
    LocalDate fechaInicio;
    LocalDate fechaFin;
    String estado;
}
