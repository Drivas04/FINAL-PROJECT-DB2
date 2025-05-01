package co.edu.unbosque.backend_payroll.service;

import co.edu.unbosque.backend_payroll.dto.ContratoDTO;
import co.edu.unbosque.backend_payroll.entity.Contrato;
import co.edu.unbosque.backend_payroll.projection.ContratoProjection;
import co.edu.unbosque.backend_payroll.repository.ContratoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContratoService {

    @Autowired
    private ContratoRepository repo;

    public List<ContratoProjection> getContratos() {
        return repo.findAllContratos();
    }

    public void agregarContrato(Contrato c) {}
}
