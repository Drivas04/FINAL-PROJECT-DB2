package co.edu.unbosque.backend_payroll.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.math.BigInteger;

@Getter
@Setter
@Entity
@Table(name = "cuentabancaria")
public class Cuentabancaria {
    @Id
    @Column(name = "numero_cuenta", nullable = false)
    private Long numeroCuenta;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "banco_id_banco", nullable = false)
    private Banco bancoIdBanco;

}