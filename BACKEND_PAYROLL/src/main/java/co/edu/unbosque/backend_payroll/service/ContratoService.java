package co.edu.unbosque.backend_payroll.service;

import co.edu.unbosque.backend_payroll.dto.ContratoDTO;
import co.edu.unbosque.backend_payroll.dto.EmpleadoDTO;
import co.edu.unbosque.backend_payroll.projection.EmpleadoProjection;
import co.edu.unbosque.backend_payroll.projection.ContratoProjection;
import co.edu.unbosque.backend_payroll.repository.ContratoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContratoService {

    @Autowired
    private ContratoRepository repo;

    public List<ContratoProjection> getContratos() {
        return repo.findAllContratos();
    }

    public void agregarContrato(ContratoDTO c, EmpleadoDTO e) {
        repo.agregarContrato(c.getSalario(), c.getTipoContrato(), c.getNombreCargo(), c.getFechaInicio(),
                c.getFechaFin(), c.getEstado(), e.getNombre(), e.getApellido(), e.getTipoDocumento(), e.getNumeroDocumento(),
                e.getCorreo(), e.getTelefono(), e.getDireccion(), e.getFechaNacimiento(), e.getFechaContratacion(), e.getEpsEmpleado(),
                e.getDepartamentoIdDepartamento(), e.getCuentabancariaNumeroCuenta(), e.getBancoIdBanco());
    }
}
