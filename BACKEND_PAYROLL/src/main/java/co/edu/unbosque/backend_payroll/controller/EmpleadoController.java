package co.edu.unbosque.backend_payroll.controller;

import co.edu.unbosque.backend_payroll.dto.EmpleadoDTO;
import co.edu.unbosque.backend_payroll.entity.Empleado;
import co.edu.unbosque.backend_payroll.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmpleadoController {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @GetMapping("/employees-list")
    public List<Empleado> getAll(){
        return List.of();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empleado> getById(@PathVariable Short id){
        Empleado empleado = new Empleado();
        return ResponseEntity.ok(empleado);
    }

    @PostMapping("/new-employee")
    public ResponseEntity<Void> save(@RequestBody EmpleadoDTO newEmployee){
        return ResponseEntity.ok().build();
    }

    @PutMapping("/edit-employee/{id}")
    public ResponseEntity<Empleado> updateById(@PathVariable Short id, @RequestBody Empleado currentEmployee){
        return ResponseEntity.ok(currentEmployee);
    }

    @DeleteMapping("/delete-employee/{id}")
    public ResponseEntity<Empleado> deleteById(@PathVariable Short id){
        return ResponseEntity.noContent().build();
    }
}
