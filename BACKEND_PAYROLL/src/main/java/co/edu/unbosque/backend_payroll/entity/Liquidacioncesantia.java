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
@Table(name = "liquidacioncesantias")
public class Liquidacioncesantia {
    @Id
    @Column(name = "id_liquidacion", nullable = false)
    private Short id;

    @Size(max = 5)
    @Column(name = "periodo", length = 5)
    private String periodo;

    @Column(name = "intereses_cesantias", precision = 10, scale = 2)
    private BigDecimal interesesCesantias;

    @Column(name = "valor_cesantias", precision = 10, scale = 2)
    private BigDecimal valorCesantias;

    @Column(name = "fecha_pago")
    private LocalDate fechaPago;

    @Size(max = 50)
    @Column(name = "motivo_retiro", length = 50)
    private String motivoRetiro;

    @Size(max = 15)
    @Column(name = "fondo_cesantias", length = 15)
    private String fondoCesantias;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "contrato_id_contrato", nullable = false)
    private Contrato contratoIdContrato;

}