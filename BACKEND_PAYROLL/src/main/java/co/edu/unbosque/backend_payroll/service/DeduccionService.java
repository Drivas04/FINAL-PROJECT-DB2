package co.edu.unbosque.backend_payroll.service;

import co.edu.unbosque.backend_payroll.dto.DeduccionDTO;
import co.edu.unbosque.backend_payroll.entity.Deduccion;
import co.edu.unbosque.backend_payroll.projection.DeduccionProjection;
import co.edu.unbosque.backend_payroll.repository.DeduccionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeduccionService {

    @Autowired
    private DeduccionRepository deduccionRepository;

    public List<DeduccionProjection> getAll() {
        return deduccionRepository.consultarDeducciones();
    }

    public void save(DeduccionDTO deduccion) {
        deduccionRepository.agregarDeduccion(deduccion.getTipoDeduccion(), deduccion.getValor(), deduccion.getDescripcion(), deduccion.getNominaIdNomina());
    }

    public List<DeduccionProjection> getDeduccionesByNominaId(Short nominaId) {
        return deduccionRepository.findByNominaId(nominaId);
    }

}
