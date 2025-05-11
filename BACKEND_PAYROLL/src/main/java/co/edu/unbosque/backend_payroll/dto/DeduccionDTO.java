package co.edu.unbosque.backend_payroll.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DeduccionDTO {

    String tipoDeduccion;
    BigDecimal valor;
    String descripcion;
    Short nominaIdNomina;
}
