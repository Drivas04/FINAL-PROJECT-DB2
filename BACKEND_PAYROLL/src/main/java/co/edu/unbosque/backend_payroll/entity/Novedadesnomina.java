package co.edu.unbosque.backend_payroll.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "novedadesnomina", schema = "public")
public class Novedadesnomina {
    @Id
    @Column(name = "id_novedad", nullable = false)
    private Short id;

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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "nomina_id_nomina", nullable = false)
    private Nomina nominaIdNomina;

}