package co.edu.unbosque.backend_payroll.service;

import co.edu.unbosque.backend_payroll.dto.LiquidacionCesantiasDTO;
import co.edu.unbosque.backend_payroll.repository.LiquidacionCensantiasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LiquidacionCesantiasService {

    @Autowired
    private LiquidacionCensantiasRepository liquidacionCensantiasRepository;

    public void agregarLiquidacionCesantias(LiquidacionCesantiasDTO dto){
        liquidacionCensantiasRepository.agregarLiquidacionCesantias(dto.getPeriodo(), dto.getFechaPago(), dto.getMotivoRetiro(), dto.getFondoCesantias(), dto.getIdContrato());
    }
}
