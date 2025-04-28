package co.edu.unbosque.backend_payroll.service;

import co.edu.unbosque.backend_payroll.dto.NovedadDTO;
import co.edu.unbosque.backend_payroll.entity.Novedadesnomina;
import co.edu.unbosque.backend_payroll.repository.NovedadesNominaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class NovedadesNominaService {

    @Autowired
    private NovedadesNominaRepository novedadesNominaRepository;

    public List<NovedadDTO> getAll(){
        return novedadesNominaRepository.getPayrollNews();
    }

    public void agregarNovedadNomina(NovedadDTO novedadDTO) {
        novedadesNominaRepository.agregarNovedadNomina(novedadDTO.getTipo_novedad(), novedadDTO.getDescripcion(),
                novedadDTO.getValorAfectacion(), novedadDTO.getFecha_inicio(), novedadDTO.getFecha_fin(), novedadDTO.getId_nomina());
    }
}
