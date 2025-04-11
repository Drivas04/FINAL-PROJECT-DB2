package co.edu.unbosque.backend_payroll.repository;

import co.edu.unbosque.backend_payroll.entity.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpleadoRepository  extends JpaRepository<Empleado, Short> {
}
