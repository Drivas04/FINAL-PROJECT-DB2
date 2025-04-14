package co.edu.unbosque.backend_payroll.repository;

import co.edu.unbosque.backend_payroll.entity.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartamentoRepository extends JpaRepository<Departamento, Short> {

    @Procedure(procedureName = "sp_updatedepartment")
    void updateDepartment(Short id_department, String new_name);
}
