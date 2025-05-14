package co.edu.unbosque.backend_payroll.controller;

import co.edu.unbosque.backend_payroll.dto.ContratoDTO;
import co.edu.unbosque.backend_payroll.dto.ContratoEmpleadoDTO;
import co.edu.unbosque.backend_payroll.dto.EmpleadoDTO;
import co.edu.unbosque.backend_payroll.projection.ContratoProjection;
import co.edu.unbosque.backend_payroll.service.ContratoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contratos")
public class ContratoController {

    @Autowired
    private ContratoService contratoService;

    @GetMapping
    public List<ContratoProjection> getContratos() {
        return contratoService.getContratos();
    }

    @PostMapping
    public ResponseEntity<Void> addContrato(@RequestBody ContratoEmpleadoDTO dto) {
        contratoService.agregarContrato(dto.getContrato(), dto.getEmpleado());
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<Void> updateContrato(Short id, @RequestBody ContratoDTO dto) {
        contratoService.actualizarContrato(id, dto);
        return ResponseEntity.ok().build();
    }
}
