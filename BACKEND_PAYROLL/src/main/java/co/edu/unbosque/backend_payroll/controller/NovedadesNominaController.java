package co.edu.unbosque.backend_payroll.controller;

import co.edu.unbosque.backend_payroll.dto.NovedadDTO;
import co.edu.unbosque.backend_payroll.entity.Novedadesnomina;
import co.edu.unbosque.backend_payroll.service.NovedadesNominaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/novedades")
public class NovedadesNominaController {

    @Autowired
    private NovedadesNominaService novedadesNominaService;

    @GetMapping
    public List<NovedadDTO> getAll() {
        return novedadesNominaService.getAll();
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody NovedadDTO novedad) {
        novedadesNominaService.agregarNovedadNomina(novedad);
        return ResponseEntity.ok().build();
    }

}
