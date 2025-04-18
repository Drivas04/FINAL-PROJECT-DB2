package co.edu.unbosque.backend_payroll.dto;

import lombok.Getter;

@Getter
public class EmailDTO {
    String toEmail;
    String subject;
    String text;
    NominaDTO nominaDTO;
}
