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
@Table(name = "departamento")
public class Departamento {
    @Id
    @Column(name = "id_departamento", nullable = false)
    private Short id;

    @Size(max = 20)
    @Column(name = "nombre_departamento", length = 20)
    private String nombreDepartamento;

}