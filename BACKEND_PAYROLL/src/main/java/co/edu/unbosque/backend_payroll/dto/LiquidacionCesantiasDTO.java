package co.edu.unbosque.backend_payroll.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class LiquidacionCesantiasDTO {

    String periodo;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate fechaPago;
    String motivoRetiro;
    String fondoCesantias;
    Short idContrato;
}
