package co.edu.unbosque.backend_payroll.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "deduccion")
public class Deduccion {
    @Id
    @Column(name = "id_deduccion", nullable = false)
    private Short id;

    @Size(max = 30)
    @Column(name = "tipo_deduccion", length = 30)
    private String tipoDeduccion;

    @Column(name = "valor", precision = 10, scale = 2)
    private BigDecimal valor;

    @Column(name = "descripcion", length = Integer.MAX_VALUE)
    private String descripcion;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "nomina_id_nomina", nullable = false)
    private Nomina nominaIdNomina;

}