package co.edu.unbosque.backend_payroll.controller;

import co.edu.unbosque.backend_payroll.dto.EmailDTO;
import co.edu.unbosque.backend_payroll.dto.NominaDTO;
import co.edu.unbosque.backend_payroll.utils.EmailSender;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mail")
public class MailController {

    @Autowired
    private EmailSender sender;

    @PostMapping
    public void sendMail(@RequestBody EmailDTO body) throws MessagingException {
        sender.sendPayrollEmail(body.getToEmail(), body.getSubject(), body.getText(), body.getNominaDTO());
    }
}
