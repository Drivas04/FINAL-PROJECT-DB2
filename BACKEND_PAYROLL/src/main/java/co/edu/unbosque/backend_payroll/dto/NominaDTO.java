package co.edu.unbosque.backend_payroll.dto;

import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
public class NominaDTO {
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate periodo;
    Short contratoIdContrato;
    Integer horasExtras;
}
