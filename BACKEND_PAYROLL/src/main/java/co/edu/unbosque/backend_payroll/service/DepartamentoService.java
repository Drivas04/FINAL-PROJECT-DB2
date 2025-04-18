package co.edu.unbosque.backend_payroll.service;

import co.edu.unbosque.backend_payroll.entity.Departamento;
import co.edu.unbosque.backend_payroll.repository.DepartamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartamentoService {

    @Autowired
    private DepartamentoRepository departamentoRepository;

    public List<Departamento> getAll() {
        return departamentoRepository.findAll();
    }

    public void updateDepartment(Short id_department, String new_name){
        departamentoRepository.updateDepartment(id_department, new_name);
    }
}
