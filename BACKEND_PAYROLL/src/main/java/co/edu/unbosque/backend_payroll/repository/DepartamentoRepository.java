package co.edu.unbosque.backend_payroll.repository;

import co.edu.unbosque.backend_payroll.entity.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.ListPagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
 public interface DepartamentoRepository extends JpaRepository<Departamento, Short> {

    @Query(value = "SELECT * FROM fn_consultardepartamentos()", nativeQuery = true)
    List<Departamento> getDepartments();


    @Procedure(procedureName = "sp_updatedepartment")
    void updateDepartment(Short id_department, String new_name);

}
