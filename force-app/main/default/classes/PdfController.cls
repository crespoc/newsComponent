public with sharing class PdfController {
    @AuraEnabled
    public static void generateAndAttachPdf(Id caseId) {
        Case caseRecord = [SELECT Id, AccountId FROM Case WHERE Id = :caseId LIMIT 1];
        
        // Generate PDF content
        PageReference pdfPage = Page.pdfCase; // Assuming CasePdf is the Visualforce page name
        pdfPage.getParameters().put('id', caseId);
        Blob pdfBlob;
        try {
            pdfBlob = pdfPage.getContentAsPDF();
        } catch (VisualforceException e) {
            throw new AuraHandledException('Error al generar el PDF: ' + e.getMessage());
        }

        // Attach PDF to the Account
        Attachment attachment = new Attachment();
        attachment.ParentId = caseRecord.AccountId;
        attachment.Name = 'Caso_' + caseRecord.CaseNumber + '.pdf';
        attachment.Body = pdfBlob;
        attachment.ContentType = 'application/pdf';
        insert attachment;
    }
}
