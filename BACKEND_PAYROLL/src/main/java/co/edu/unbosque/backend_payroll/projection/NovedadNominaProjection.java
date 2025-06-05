package co.edu.unbosque.backend_payroll.projection;

public interface NovedadNominaProjection {

    Short getIdNovedad();
    String getTipoNovedad();
    String getDescripcion();
    String getValorAfectacion();
    String getFechaInicio();
    String getFechaFin();
    Short getNominaIdNomina();
}
