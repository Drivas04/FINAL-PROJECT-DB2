package co.edu.unbosque.backend_payroll.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

@Data
public class ContratoDTO {

    BigDecimal salario;
    String tipoContrato;
    String nombreCargo;
    LocalDate fechaInicio;
    LocalDate fechaFin;
    String estado;
    Short empleadoIdEmpleado;
}
