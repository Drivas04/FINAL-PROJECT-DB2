package co.edu.unbosque.backend_payroll.service;

import co.edu.unbosque.backend_payroll.dto.NovedadDTO;
import co.edu.unbosque.backend_payroll.projection.NovedadNominaProjection;
import co.edu.unbosque.backend_payroll.repository.NovedadesNominaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NovedadesNominaService {

    @Autowired
    private NovedadesNominaRepository novedadesNominaRepository;

    public List<NovedadNominaProjection> getAll(){
        return novedadesNominaRepository.getPayrollNews();
    }

    public void agregarNovedadNomina(NovedadDTO novedadDTO) {
        novedadesNominaRepository.agregarNovedadNomina(novedadDTO.getTipoNovedad(), novedadDTO.getDescripcion(),
                novedadDTO.getFechaInicio(), novedadDTO.getFechaFin(), novedadDTO.getNominaIdNomina());
    }

    public void eliminarNovedadNomina(Short idNovedad) {
        novedadesNominaRepository.eliminarNovedadNomina(idNovedad);
    }
}
