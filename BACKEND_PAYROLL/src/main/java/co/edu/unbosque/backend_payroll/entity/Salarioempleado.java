package co.edu.unbosque.backend_payroll.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "salarioempleado", schema = "public")
public class Salarioempleado {
    @Id
    @Column(name = "id_salario", nullable = false)
    private Short id;

    @Column(name = "salario_base", precision = 10, scale = 2)
    private BigDecimal salarioBase;

    @Column(name = "auxilio_transporte", precision = 10, scale = 2)
    private BigDecimal auxilioTransporte;

    @Column(name = "pension")
    private BigDecimal pension;

    @Column(name = "salud", precision = 10, scale = 2)
    private BigDecimal salud;

    @Column(name = "deducciones", precision = 10, scale = 2)
    private BigDecimal deducciones;

}