package co.edu.unbosque.backend_payroll.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "liquidacioncesantias", schema = "public")
public class Liquidacioncesantia {
    @Id
    @Column(name = "id_liquidacion", nullable = false)
    private Short id;

    @Column(name = "periodo", length = 5)
    private String periodo;

    @Column(name = "intereses_cesantias", precision = 10, scale = 2)
    private BigDecimal interesesCesantias;

    @Column(name = "valor_cesantias", precision = 10, scale = 2)
    private BigDecimal valorCesantias;

    @Column(name = "fecha_pago")
    private LocalDate fechaPago;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "contrato_id_contrato", nullable = false)
    private Contrato contratoIdContrato;

}