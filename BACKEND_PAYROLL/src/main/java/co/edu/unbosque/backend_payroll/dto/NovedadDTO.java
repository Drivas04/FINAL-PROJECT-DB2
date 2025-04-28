package co.edu.unbosque.backend_payroll.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Data
public class NovedadDTO {

    Short id_novedad;
    String tipo_novedad;
    String descripcion;
    BigDecimal valorAfectacion;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate fecha_inicio;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate fecha_fin;
    Short id_nomina;

    public NovedadDTO(Short id_novedad, String tipo_novedad, String descripcion,
                      BigDecimal valorAfectacion, LocalDate fecha_inicio,
                      LocalDate fecha_fin, Short id_nomina) {
        this.id_novedad = id_novedad;
        this.tipo_novedad = tipo_novedad;
        this.descripcion = descripcion;
        this.valorAfectacion = valorAfectacion;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.id_nomina = id_nomina;
    }
}
