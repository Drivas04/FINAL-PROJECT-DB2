package co.edu.unbosque.backend_payroll.service;

import co.edu.unbosque.backend_payroll.dto.EmpleadoDTO;
import co.edu.unbosque.backend_payroll.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmpleadoService {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    public void agregarEmpleado(EmpleadoDTO dto){
        empleadoRepository.agregarEmpleado(dto.getNombre(), dto.getApellido(), dto.getTipoDocumento(), dto.getNumeroDocumento(),
                dto.getCorreo(), dto.getTelefono(), dto.getDireccion(), dto.getFechaNacimiento(), dto.getFechaContratacion(),
                dto.getEps(), dto.getIdDepartamento(), dto.getNumeroCuenta());
    }
}
