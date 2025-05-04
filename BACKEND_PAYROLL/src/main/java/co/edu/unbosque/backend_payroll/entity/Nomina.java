package co.edu.unbosque.backend_payroll.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "nomina")
public class Nomina {
    @Id
    @Column(name = "id_nomina", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Short id;

    @Column(name = "periodo")
    private LocalDate periodo;

    @Column(name = "ret_fuente", precision = 10, scale = 2)
    private BigDecimal retFuente;

    @Column(name = "recargos", precision = 10, scale = 2)
    private BigDecimal recargos;

    @Column(name = "horas_extras", precision = 10, scale = 2)
    private BigDecimal horasExtras;

    @Column(name = "pago_total", precision = 10, scale = 2)
    private BigDecimal pagoTotal;

    @Column(name = "auxilio_transporte", precision = 10, scale = 2)
    private BigDecimal auxilioTransporte;

    @Column(name = "dias_trabajados", precision = 10)
    private Integer diasTrabajados;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "contrato_id_contrato", nullable = false)
    private Contrato contratoIdContrato;

}