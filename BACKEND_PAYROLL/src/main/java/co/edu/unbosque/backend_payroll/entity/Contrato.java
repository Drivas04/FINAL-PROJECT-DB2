package co.edu.unbosque.backend_payroll.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "contrato")
public class Contrato {
    @Id
    @Column(name = "id_contrato", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Short id;

    @Column(name = "salario", precision = 10, scale = 2)
    private BigDecimal salario;

    @Size(max = 40)
    @Column(name = "tipo_contrato", length = 40)
    private String tipoContrato;

    @Size(max = 40)
    @Column(name = "nombre_cargo", length = 40)
    private String nombreCargo;

    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin")
    private LocalDate fechaFin;

    @Size(max = 10)
    @Column(name = "estado", length = 10)
    private String estado;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "empleado_id_empleado", nullable = false)
    private Empleado empleadoIdEmpleado;

}