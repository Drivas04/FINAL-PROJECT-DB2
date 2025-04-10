package co.edu.unbosque.backend_payroll.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "departamento", schema = "public")
public class Departamento {
    @Id
    @Column(name = "id_departamento", nullable = false)
    private Short id;

    @Column(name = "nombre_departamento", length = 20)
    private String nombreDepartamento;

}