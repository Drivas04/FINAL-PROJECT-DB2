package co.edu.unbosque.backend_payroll.controller;

import co.edu.unbosque.backend_payroll.dto.DeduccionDTO;
import co.edu.unbosque.backend_payroll.entity.Deduccion;
import co.edu.unbosque.backend_payroll.projection.DeduccionProjection;
import co.edu.unbosque.backend_payroll.service.DeduccionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/deducciones")
public class DeduccionController {

    @Autowired
    private DeduccionService service;

    @GetMapping
    public List<DeduccionProjection> getDeducciones() {
        return service.getAll();
    }

    @PostMapping
    public ResponseEntity<Void> createDeduccion(@RequestBody DeduccionDTO deduccion) {
        service.save(deduccion);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/nomina/{nominaId}")
    public ResponseEntity<List<DeduccionProjection>> getDeduccionesByNominaId(@PathVariable Short nominaId) {
        List<DeduccionProjection> deducciones = service.getDeduccionesByNominaId(nominaId);
        return ResponseEntity.ok(deducciones);
    }
}
