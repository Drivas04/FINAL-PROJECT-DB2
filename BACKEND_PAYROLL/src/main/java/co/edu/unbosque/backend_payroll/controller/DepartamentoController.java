package co.edu.unbosque.backend_payroll.controller;

import co.edu.unbosque.backend_payroll.entity.Departamento;
import co.edu.unbosque.backend_payroll.service.DepartamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/departamentos")
public class DepartamentoController {

    @Autowired
    private DepartamentoService departamentoService;

    @PutMapping("/editar-departamento/{id_department}")
    public ResponseEntity<Void> editarDepartamento(@PathVariable Short id_department, String new_name) {
        departamentoService.updateDepartment(id_department, new_name);
        return ResponseEntity.noContent().build();
    }
}
