package co.edu.unbosque.backend_payroll.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "contrato", schema = "public", indexes = {
        @Index(name = "contrato_id_salario_idx", columnList = "salarioempleado_id_salario", unique = true)
})
public class Contrato {
    @Id
    @Column(name = "id_contrato", nullable = false)
    private Short id;

    @Column(name = "salario", precision = 10, scale = 2)
    private BigDecimal salario;

    @Column(name = "tipo_contrato", length = 20)
    private String tipoContrato;

    @Column(name = "nombre_cargo", length = 20)
    private String nombreCargo;

    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin")
    private LocalDate fechaFin;

    @Column(name = "estado", length = 10)
    private String estado;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "empleado_id_empleado", nullable = false)
    private Empleado empleadoIdEmpleado;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "salarioempleado_id_salario", nullable = false)
    private Salarioempleado salarioempleadoIdSalario;

}