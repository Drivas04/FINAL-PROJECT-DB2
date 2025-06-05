package co.edu.unbosque.backend_payroll.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "banco")
public class Banco {
    @Id
    @Column(name = "id_banco", nullable = false)
    private Short id;

    @Size(max = 20)
    @Column(name = "nombre_banco", length = 20)
    private String nombreBanco;

}