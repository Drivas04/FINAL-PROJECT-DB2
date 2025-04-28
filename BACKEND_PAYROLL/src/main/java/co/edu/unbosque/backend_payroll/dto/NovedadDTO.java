package co.edu.unbosque.backend_payroll.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Data
public class NovedadDTO {

    String tipo_novedad;
    String descripcion;
    BigDecimal valorAfectacion;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate fecha_inicio;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate fecha_fin;
    Short id_nomina;
}
