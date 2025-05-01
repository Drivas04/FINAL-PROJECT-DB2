package co.edu.unbosque.backend_payroll.repository;

import co.edu.unbosque.backend_payroll.dto.ContratoDTO;
import co.edu.unbosque.backend_payroll.entity.Contrato;
import co.edu.unbosque.backend_payroll.projection.ContratoProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContratoRepository extends JpaRepository<Contrato, Long> {

    @Query(value = "SELECT * FROM fn_consultarcontratos()", nativeQuery = true)
    List<ContratoProjection> findAllContratos();
}
