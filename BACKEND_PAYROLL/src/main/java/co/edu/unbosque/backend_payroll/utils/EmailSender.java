package co.edu.unbosque.backend_payroll.utils;

import co.edu.unbosque.backend_payroll.dto.NominaDTO;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class EmailSender {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;

    public void sendPayrollEmail(String to, String subject, String text, NominaEmailDTO dto) throws MessagingException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PdfWriter pdfWriter = new PdfWriter(byteArrayOutputStream);
        PdfDocument pdfDocument = new PdfDocument(pdfWriter);
        Document document = new Document(pdfDocument);

        Paragraph title = new Paragraph("Detalle de Nómina")
                .setBold()
                .setFontSize(16)
                .setTextAlignment(TextAlignment.CENTER);
        document.add(title);
        document.add(new Paragraph("\n"));

        float[] columnWidths = {200F, 300F};
        Table table = new Table(columnWidths);

        table.addHeaderCell(new Cell().add(new Paragraph("Campo")).setBackgroundColor(ColorConstants.LIGHT_GRAY).setBold());
        table.addHeaderCell(new Cell().add(new Paragraph("Valor")).setBackgroundColor(ColorConstants.LIGHT_GRAY).setBold());

        // Filas con datos
        table.addCell("Empleado");
        table.addCell(safeText(dto.getNombreEmpleado()));

        table.addCell("Documento");
        table.addCell(safeText(dto.getDocumento()));

        table.addCell("Departamento");
        table.addCell(safeText(dto.getDepartamento()));

        table.addCell("Tipo de contrato");
        table.addCell(safeText(dto.getTipoContrato()));

        table.addCell("Fecha de ingreso");
        table.addCell(safeText(dto.getFechaIngreso()));

        table.addCell("Entidad Bancaria");
        table.addCell(safeText(dto.getEntidadBancaria()));

        table.addCell("Entidad Promotora de Salud");
        table.addCell(safeText(dto.getEPS()));

        table.addCell("Fondo de pensiones");
        table.addCell(safeText(dto.getFondoPensiones()));

        table.addCell("Periodo");
        table.addCell(safeText(dto.getPeriodo()));

        table.addCell("Salario base");
        table.addCell("$" + safeText(dto.getSalarioBase()));

        table.addCell("Horas extras");
        table.addCell("$" + safeText(dto.getHorasExtras()));

        table.addCell("Deducciones");
        table.addCell("$" + safeText(dto.getDeducciones()));

        table.addCell("Cuenta bancaria");
        table.addCell(safeText(dto.getCuentaBancaria()));

        table.addCell("Total a pagar");
        table.addCell("$" + safeText(dto.getPagoTotal()));

        document.add(table);
        document.close();



        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
        mimeMessageHelper.setTo(to);
        mimeMessageHelper.setSubject(subject);
        mimeMessageHelper.setText(text, false);

        ByteArrayResource pdfResource = new ByteArrayResource(byteArrayOutputStream.toByteArray());
        mimeMessageHelper.addAttachment("nomina.pdf", pdfResource);

        mailSender.send(mimeMessage);
    }

    private String safeText(Object value) {
        return value != null ? value.toString() : "";
    }

}
