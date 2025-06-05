package co.edu.unbosque.backend_payroll.projection;

import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;


public interface EmpleadoProjection {
    Short getIdEmpleado();
    String getNombre();
    String getApellido();
    String getTipoDocumento();
    String getNumeroDocumento();
    String getCorreo();
    String getTelefono();
    String getDireccion();
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate getFechaNacimiento();
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate getFechaContratacion();
    String getEpsEmpleado();
    Short getDepartamentoIdDepartamento();
    Long getCuentabancariaNumeroCuenta();
}
