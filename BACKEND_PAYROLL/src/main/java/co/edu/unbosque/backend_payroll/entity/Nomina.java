package co.edu.unbosque.backend_payroll.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "nomina", schema = "public")
public class Nomina {
    @Id
    @Column(name = "id_nomina", nullable = false)
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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "contrato_id_contrato", nullable = false)
    private Contrato contratoIdContrato;

}