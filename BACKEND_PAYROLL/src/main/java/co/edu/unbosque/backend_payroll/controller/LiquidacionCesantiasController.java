package co.edu.unbosque.backend_payroll.controller;

import co.edu.unbosque.backend_payroll.dto.LiquidacionCesantiasDTO;
import co.edu.unbosque.backend_payroll.service.LiquidacionCesantiasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cesantias")
public class LiquidacionCesantiasController {

    @Autowired
    private LiquidacionCesantiasService service;

    @PostMapping
    public ResponseEntity<Void> agregarCesantia(@RequestBody LiquidacionCesantiasDTO dto){
        service.agregarLiquidacionCesantias(dto);
        return ResponseEntity.ok().build();
    }
}
