package co.edu.unbosque.backend_payroll.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;

@Data
public class ActualizarEmpleadoDTO {
    private String nombre;
    private String apellido;
    private String tipoDocumento;
    private String numeroDocumento;
    private String correo;
    private String telefono;
    private String direccion;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate fechaNacimiento;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate fechaContratacion;

    private String epsEmpleado;
    private Short departamentoIdDepartamento;
    private Long cuentabancariaNumeroCuenta;
}
