package co.edu.unbosque.backend_payroll.dto;

import co.edu.unbosque.backend_payroll.utils.NominaEmailDTO;
import lombok.Getter;

@Getter
public class EmailDTO {
    String toEmail;
    String subject;
    String text;
    NominaEmailDTO nominaDTO;
}
