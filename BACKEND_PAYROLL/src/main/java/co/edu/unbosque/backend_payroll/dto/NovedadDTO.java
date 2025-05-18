package co.edu.unbosque.backend_payroll.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Data
public class NovedadDTO {

    String tipoNovedad;
    String descripcion;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate fechaInicio;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate fechaFin;
    Short nominaIdNomina;
}
