package co.edu.unbosque.backend_payroll.service;

import co.edu.unbosque.backend_payroll.dto.LiquidacionCesantiasDTO;
import co.edu.unbosque.backend_payroll.projection.CesantiasProjection;
import co.edu.unbosque.backend_payroll.repository.LiquidacionCensantiasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class LiquidacionCesantiasService {

    @Autowired
    private LiquidacionCensantiasRepository liquidacionCensantiasRepository;

    public List<CesantiasProjection> getLiquidacionCesantias() {
        return liquidacionCensantiasRepository.findAllLiquidacioncesantias();
    }

    public void agregarLiquidacionCesantias(LiquidacionCesantiasDTO dto){
        liquidacionCensantiasRepository.agregarLiquidacionCesantias(dto.getPeriodo(), dto.getFechaPago(), dto.getMotivoRetiro(), dto.getFondoCesantias(), dto.getIdContrato());
    }

    public Map<String, Object> consultarCesantiasDisponibles(Integer contratoId) {
        return liquidacionCensantiasRepository.calcularCesantiasDisponibles(contratoId);
    }
}
