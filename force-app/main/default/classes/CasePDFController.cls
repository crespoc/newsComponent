public class CasePDFController {
    public Case caseRecord { get; private set; }

    public CasePDFController(ApexPages.StandardController stdController) {
        // Consultar el caso incluyendo el campo AccountId
        this.caseRecord = [SELECT Id, AccountId FROM Case WHERE Id = :stdController.getId()];
    }

    public PageReference generatePDF() {
        // Obtener el contenido del PDF
        PageReference pdfPage = new PageReference('/apex/pdfCase');
        pdfPage.getParameters().put('id', caseRecord.Id);
        pdfPage.getParameters().put('renderAsPDF', 'true');
        Blob pdfBlob = pdfPage.getContentAsPDF();

        // Crear un nuevo archivo adjunto
        Attachment attachment = new Attachment();
        attachment.ParentId = caseRecord.AccountId; // Asignar el archivo a la cuenta relacionada con el caso
        attachment.Name = 'CaseDetails.pdf';
        attachment.Body = pdfBlob;
        attachment.ContentType = 'application/pdf';

        // Insertar el archivo adjunto
        insert attachment;

        // Redireccionar al usuario de vuelta a la página del caso
        PageReference casePage = new PageReference('/' + caseRecord.Id);
        casePage.setRedirect(true);
        return casePage;
    }
}
