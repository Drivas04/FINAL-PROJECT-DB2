package co.edu.unbosque.backend_payroll.service;

import co.edu.unbosque.backend_payroll.dto.ActualizarEmpleadoDTO;
import co.edu.unbosque.backend_payroll.projection.EmpleadoProjection;
import co.edu.unbosque.backend_payroll.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpleadoService {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    private AuditoriaService auditoriaService;

    public List<EmpleadoProjection> findAll() {
        return empleadoRepository.findAllEmpleados();
    }

    public void agregarEmpleado(EmpleadoProjection dto){
        empleadoRepository.agregarEmpleado(dto.getNombre(), dto.getApellido(), dto.getTipoDocumento(), dto.getNumeroDocumento(),
                dto.getCorreo(), dto.getTelefono(), dto.getDireccion(), dto.getFechaNacimiento(), dto.getFechaContratacion(),
                dto.getEpsEmpleado(), dto.getDepartamentoIdDepartamento(), dto.getCuentabancariaNumeroCuenta());
    }

    public void actualizarEmpleado(Short id, ActualizarEmpleadoDTO dto){
        empleadoRepository.actualizarEmpleado(id, dto.getNombre(), dto.getApellido(), dto.getTipoDocumento(), dto.getNumeroDocumento(),
                dto.getCorreo(), dto.getTelefono(), dto.getDireccion(), dto.getFechaNacimiento(), dto.getFechaContratacion(),
                dto.getEpsEmpleado(), dto.getDepartamentoIdDepartamento(), dto.getCuentabancariaNumeroCuenta());

        auditoriaService.registrarCambio(
                "EMPLEADO",
                id,
                "UPDATE"
        );
    }

    public void eliminarEmpleado(Short id){
        empleadoRepository.eliminarEmpleado(id);
        auditoriaService.registrarCambio(
                "EMPLEADO",
                id,
                "DELETE"
        );
    }
}
