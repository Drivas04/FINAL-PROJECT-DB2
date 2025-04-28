package co.edu.unbosque.backend_payroll.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "empleado")
public class Empleado {
    @Id
    @Column(name = "id_empleado", nullable = false)
    private Short id;

    @Size(max = 20)
    @Column(name = "nombre", length = 20)
    private String nombre;

    @Size(max = 20)
    @Column(name = "apellido", length = 20)
    private String apellido;

    @Size(max = 10)
    @Column(name = "tipo_documento", length = 10)
    private String tipoDocumento;

    @Size(max = 11)
    @Column(name = "numero_documento", length = 11)
    private String numeroDocumento;

    @Size(max = 50)
    @Column(name = "correo", length = 50)
    private String correo;

    @Size(max = 15)
    @Column(name = "telefono", length = 15)
    private String telefono;

    @Column(name = "direccion", length = Integer.MAX_VALUE)
    private String direccion;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @Column(name = "fecha_contratacion")
    private LocalDate fechaContratacion;

    @Size(max = 20)
    @Column(name = "eps_empleado", length = 20)
    private String epsEmpleado;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cuentabancaria_numero_cuenta", nullable = false)
    private Cuentabancaria cuentabancariaNumeroCuenta;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "departamento_id_departamento", nullable = false)
    private Departamento departamentoIdDepartamento;

}