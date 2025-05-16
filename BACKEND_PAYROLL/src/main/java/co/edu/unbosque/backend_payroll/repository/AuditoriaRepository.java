package co.edu.unbosque.backend_payroll.repository;

import co.edu.unbosque.backend_payroll.document.Auditoria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditoriaRepository extends MongoRepository<Auditoria, String> {
}
