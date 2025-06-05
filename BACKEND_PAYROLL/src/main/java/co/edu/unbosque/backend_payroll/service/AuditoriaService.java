package co.edu.unbosque.backend_payroll.service;

import co.edu.unbosque.backend_payroll.document.Auditoria;
import co.edu.unbosque.backend_payroll.repository.AuditoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuditoriaService {

    @Autowired
    private AuditoriaRepository auditoriaRepository;

    public void registrarCambio(String entidad, Object idRef, String operacion) {

        Auditoria auditoria = new Auditoria();
        auditoria.setEntidad(entidad);
        auditoria.setIdReferencia(idRef);
        auditoria.setOperacion(operacion);
        auditoria.setFecha(new Date());

        auditoriaRepository.save(auditoria);
    }
}
