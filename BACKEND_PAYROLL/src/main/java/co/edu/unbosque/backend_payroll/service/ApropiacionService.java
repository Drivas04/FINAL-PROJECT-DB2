package co.edu.unbosque.backend_payroll.service;

import co.edu.unbosque.backend_payroll.dto.ApropiacionDTO;
import co.edu.unbosque.backend_payroll.entity.Apropiacion;
import co.edu.unbosque.backend_payroll.projection.ApropiacionProjection;
import co.edu.unbosque.backend_payroll.repository.ApropiacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class ApropiacionService {

    @Autowired
    private ApropiacionRepository apropiacionRepository;

    public List<ApropiacionProjection> getApropiaciones() {
        return apropiacionRepository.consultarApropiaciones();
    }

    public void agregarApropiacion(ApropiacionDTO apropiacion) {
        apropiacionRepository.agregarApropiacion(apropiacion.getTipoApropiacion(), apropiacion.getValor(), apropiacion.getNominaIdNomina());
    }

    public List<ApropiacionProjection> getApropiacionesByNominaId(Short nominaId) {
        return apropiacionRepository.findByNominaId(nominaId);
    }

}
