package co.edu.unbosque.backend_payroll.controller;

import co.edu.unbosque.backend_payroll.entity.Departamento;
import co.edu.unbosque.backend_payroll.service.DepartamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/departamentos")
@CrossOrigin(origins = "http://localhost:5173")
public class DepartamentoController {

    @Autowired
    private DepartamentoService departamentoService;

    @GetMapping("/")
    public List<Departamento> getAllDepartamentos() {
        return departamentoService.getAll();
    }

    @PutMapping("/editar-departamento/{id_department}")
    public ResponseEntity<Void> editarDepartamento(@PathVariable Short id_department, String new_name) {
        departamentoService.updateDepartment(id_department, new_name);
        return ResponseEntity.noContent().build();
    }
}
