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
@Table(name = "apropiacion")
public class Apropiacion {
    @Id
    @Column(name = "id_apropiacion", nullable = false)
    private Short id;

    @Size(max = 30)
    @Column(name = "tipo_apropiacion", length = 30)
    private String tipoApropiacion;

    @Column(name = "valor", precision = 10, scale = 2)
    private BigDecimal valor;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "nomina_id_nomina", nullable = false)
    private Nomina nominaIdNomina;

}