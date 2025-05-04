package co.edu.unbosque.backend_payroll.controller;

import co.edu.unbosque.backend_payroll.entity.Nomina;
import co.edu.unbosque.backend_payroll.projection.NominaProjection;
import co.edu.unbosque.backend_payroll.service.NominaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/nominas")
public class NominaController {

    @Autowired
    private NominaService nominaService;

    @GetMapping
    public List<NominaProjection> getNominas() {
        return nominaService.getAll();
    }

    @GetMapping("/empleado/{empleadoId}")
    public ResponseEntity<List<NominaProjection>> getNominasByEmpleado(@PathVariable Integer empleadoId) {
        List<NominaProjection> nominas = nominaService.getNominasByEmpleadoId(empleadoId);
        return ResponseEntity.ok(nominas);
    }
}
