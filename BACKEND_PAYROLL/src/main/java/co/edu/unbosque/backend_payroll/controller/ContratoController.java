package co.edu.unbosque.backend_payroll.controller;

import co.edu.unbosque.backend_payroll.projection.ContratoProjection;
import co.edu.unbosque.backend_payroll.service.ContratoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
