package co.edu.unbosque.backend_payroll.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public interface EmpleadoDTO {
    String nombre;
    String apellido;
    String tipoDocumento;
    String numeroDocumento;
    String correo;
    String telefono;
    String direccion;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate fechaNacimiento;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate fechaContratacion;
    String eps;
    Short idDepartamento;
    Long numeroCuenta;
}
