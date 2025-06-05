package co.edu.unbosque.backend_payroll.controller;

import co.edu.unbosque.backend_payroll.dto.ApropiacionDTO;
import co.edu.unbosque.backend_payroll.entity.Apropiacion;
import co.edu.unbosque.backend_payroll.projection.ApropiacionProjection;
import co.edu.unbosque.backend_payroll.service.ApropiacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/apropiaciones")
public class ApropiacionController {

    @Autowired
    private ApropiacionService apropiacionService;

    @GetMapping
    public List<ApropiacionProjection> getApropiaciones() {
        return apropiacionService.getApropiaciones();
    }

    @PostMapping
    public ResponseEntity<Void> createApropiacion(@RequestBody ApropiacionDTO apropiacion) {
        apropiacionService.agregarApropiacion(apropiacion);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/nomina/{nominaId}")
    public ResponseEntity<List<ApropiacionProjection>> getApropiacionesByNominaId(@PathVariable Short nominaId) {
        List<ApropiacionProjection> apropiaciones = apropiacionService.getApropiacionesByNominaId(nominaId);
        return ResponseEntity.ok(apropiaciones);
    }
}
