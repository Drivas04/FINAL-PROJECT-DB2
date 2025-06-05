package co.edu.unbosque.backend_payroll.entity;

import co.edu.unbosque.backend_payroll.utils.TiposNovedades;
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
@Table(name = "novedadesnomina")
public class Novedadesnomina {
    @Id
    @Column(name = "id_novedad", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Short idNovedad;

    @Size(max = 20)
    @Column(name = "tipo_novedad", length = 20)
    private String tipoNovedad;

    @Column(name = "descripcion", length = Integer.MAX_VALUE)
    private String descripcion;

    @Column(name = "valor_afectacion", precision = 10, scale = 2)
    private BigDecimal valorAfectacion;

    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin")
    private LocalDate fechaFin;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "nomina_id_nomina", nullable = false)
    private Nomina nominaIdNomina;

}