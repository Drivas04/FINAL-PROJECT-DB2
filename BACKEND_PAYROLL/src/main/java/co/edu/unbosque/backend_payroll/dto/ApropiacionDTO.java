package co.edu.unbosque.backend_payroll.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ApropiacionDTO {
    String tipoApropiacion;
    BigDecimal valor;
    Short NominaIdNomina;
}
