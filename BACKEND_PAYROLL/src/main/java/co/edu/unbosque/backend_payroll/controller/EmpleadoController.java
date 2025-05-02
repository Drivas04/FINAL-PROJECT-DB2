package co.edu.unbosque.backend_payroll.controller;

import co.edu.unbosque.backend_payroll.dto.ActualizarEmpleadoDTO;
import co.edu.unbosque.backend_payroll.dto.EmpleadoDTO;
import co.edu.unbosque.backend_payroll.entity.Empleado;
import co.edu.unbosque.backend_payroll.repository.EmpleadoRepository;
import co.edu.unbosque.backend_payroll.service.EmpleadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/empleados")
public class EmpleadoController {

    @Autowired
    private EmpleadoService empleadoService;

    @GetMapping
    public List<EmpleadoDTO> getAll(){
        return empleadoService.findAll();
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

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateById(@PathVariable Short id, @RequestBody ActualizarEmpleadoDTO currentEmployee){
        empleadoService.actualizarEmpleado(id, currentEmployee);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete-employee/{id}")
    public ResponseEntity<Empleado> deleteById(@PathVariable Short id){
        return ResponseEntity.noContent().build();
    }
}
