package co.edu.unbosque.backend_payroll.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "cuentabancaria")
public class Cuentabancaria {
    @Id
    @Column(name = "numero_cuenta", nullable = false)
    private Integer numeroCuenta;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "banco_id_banco", nullable = false)
    private Banco bancoIdBanco;

}