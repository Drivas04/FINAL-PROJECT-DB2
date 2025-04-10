package co.edu.unbosque.backend_payroll.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "empleado", schema = "public")
public class Empleado {
    @Id
    @Column(name = "id_empleado", nullable = false)
    private Short id;

    @Column(name = "nombre", length = 20)
    private String nombre;

    @Column(name = "tipo_documento", length = 10)
    private String tipoDocumento;

    @Column(name = "correo", length = 20)
    private String correo;

    @Column(name = "telefono", length = 12)
    private String telefono;

    @Column(name = "numero_documento", length = 11)
    private String numeroDocumento;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @Column(name = "direccion", length = Integer.MAX_VALUE)
    private String direccion;

    @Column(name = "fecha_contratacion")
    private LocalDate fechaContratacion;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "departamento_id_departamento", nullable = false)
    private Departamento departamentoIdDepartamento;

}