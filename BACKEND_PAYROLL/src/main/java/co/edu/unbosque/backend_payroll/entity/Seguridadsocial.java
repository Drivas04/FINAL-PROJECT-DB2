package co.edu.unbosque.backend_payroll.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "seguridadsocial", schema = "public", indexes = {
        @Index(name = "seguridadsocial_id_nomina_idx", columnList = "nomina_id_nomina", unique = true)
})
public class Seguridadsocial {
    @Id
    @Column(name = "id_seguridadsocial", nullable = false)
    private Short id;

    @Column(name = "periodo", length = 5)
    private String periodo;

    @Column(name = "salud_empleado", precision = 10, scale = 2)
    private BigDecimal saludEmpleado;

    @Column(name = "salud_empresa", precision = 10, scale = 2)
    private BigDecimal saludEmpresa;

    @Column(name = "pension_empleado", precision = 10, scale = 2)
    private BigDecimal pensionEmpleado;

    @Column(name = "pesion_empresa", precision = 10, scale = 2)
    private BigDecimal pesionEmpresa;

    @Column(name = "arl", precision = 10, scale = 2)
    private BigDecimal arl;

    @Column(name = "caja_compensacion", length = 10)
    private String cajaCompensacion;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "nomina_id_nomina", nullable = false)
    private Nomina nominaIdNomina;

}