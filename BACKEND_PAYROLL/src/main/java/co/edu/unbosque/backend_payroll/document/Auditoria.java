package co.edu.unbosque.backend_payroll.document;

import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@Document(collection = "auditorias")
public class Auditoria {
    @Id
    private String id;
    private String entidad;
    private Object idReferencia;
    private String operacion;
    private Date fecha;
}



