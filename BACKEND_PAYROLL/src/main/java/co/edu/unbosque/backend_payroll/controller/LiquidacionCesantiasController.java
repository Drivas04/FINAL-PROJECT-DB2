package co.edu.unbosque.backend_payroll.controller;

import co.edu.unbosque.backend_payroll.dto.LiquidacionCesantiasDTO;
import co.edu.unbosque.backend_payroll.projection.CesantiasProjection;
import co.edu.unbosque.backend_payroll.service.LiquidacionCesantiasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cesantias")
public class LiquidacionCesantiasController {

    @Autowired
    private LiquidacionCesantiasService service;

    @GetMapping
    public List<CesantiasProjection> getLiquidacionCesantias() {
        return service.getLiquidacionCesantias();
    }

    @PostMapping
    public ResponseEntity<Void> agregarCesantia(@RequestBody LiquidacionCesantiasDTO dto){
        service.agregarLiquidacionCesantias(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/disponible/{contratoId}")
    public ResponseEntity<Map<String, Object>> consultarCesantiasDisponibles(@PathVariable Short contratoId) {
        try {
            Map<String, Object> cesantias = service.consultarCesantiasDisponibles(contratoId);
            return ResponseEntity.ok(cesantias);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
