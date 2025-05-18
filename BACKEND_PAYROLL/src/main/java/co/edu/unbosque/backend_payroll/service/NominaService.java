package co.edu.unbosque.backend_payroll.service;

import co.edu.unbosque.backend_payroll.dto.NominaDTO;
import co.edu.unbosque.backend_payroll.projection.NominaProjection;
import co.edu.unbosque.backend_payroll.repository.NominaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NominaService {

    @Autowired
    private NominaRepository nominaRepository;

    public List<NominaProjection> getAll() {
        return nominaRepository.consultarNominas();
    }

    public List<NominaProjection> getNominasByEmpleadoId(Integer empleadoId) {
        return nominaRepository.findNominasByEmpleadoId(empleadoId);
    }
    public List<NominaProjection> getNominasByContratoId(Integer contratoId) {
        return nominaRepository.findByContratoId(contratoId);
    }

    public NominaProjection getNominaById(Short idNomina) {
        return nominaRepository.consultarNominaPorId(idNomina);
    }

    public void agregarNomina(NominaDTO nomina) {
        nominaRepository.agregarNomina(nomina.getPeriodo(), nomina.getContratoIdContrato(), nomina.getHorasExtras());
    }

    public void eliminarNomina(Short idNomina) {
        nominaRepository.eliminarNomina(idNomina);
    }
}
