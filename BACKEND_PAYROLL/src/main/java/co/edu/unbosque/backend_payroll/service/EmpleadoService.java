package co.edu.unbosque.backend_payroll.service;

import co.edu.unbosque.backend_payroll.dto.ActualizarEmpleadoDTO;
import co.edu.unbosque.backend_payroll.dto.EmpleadoDTO;
import co.edu.unbosque.backend_payroll.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpleadoService {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    public List<EmpleadoDTO> findAll() {
        return empleadoRepository.findAllEmpleados();
    }

    public void agregarEmpleado(EmpleadoDTO dto){
        empleadoRepository.agregarEmpleado(dto.getNombre(), dto.getApellido(), dto.getTipoDocumento(), dto.getNumeroDocumento(),
                dto.getCorreo(), dto.getTelefono(), dto.getDireccion(), dto.getFechaNacimiento(), dto.getFechaContratacion(),
                dto.getEpsEmpleado(), dto.getDepartamentoIdDepartamento(), dto.getCuentabancariaNumeroCuenta());
    }

    public void actualizarEmpleado(Short id, ActualizarEmpleadoDTO dto){
        //id = dto.getIdEmpleado();
        empleadoRepository.actualizarEmpleado(id, dto.getNombre(), dto.getApellido(), dto.getTipoDocumento(), dto.getNumeroDocumento(),
                dto.getCorreo(), dto.getTelefono(), dto.getDireccion(), dto.getFechaNacimiento(), dto.getFechaContratacion(),
                dto.getEpsEmpleado(), dto.getDepartamentoIdDepartamento(), dto.getCuentabancariaNumeroCuenta());
    }
}
