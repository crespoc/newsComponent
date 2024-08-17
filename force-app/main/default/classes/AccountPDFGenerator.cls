public with sharing class AccountPDFGenerator {
    @AuraEnabled(cacheable=true)
    public static String generatePDF(Id accountId) {
        // Crear una referencia a la página Visualforce y establecer el parámetro de la cuenta
        PageReference pdfPage = Page.generatePdf;
        pdfPage.getParameters().put('id', accountId);
        
        // Generar el contenido PDF
        Blob pdfBlob;
        try {
            pdfBlob = pdfPage.getContentAsPDF();
        } catch (Exception e) {
            throw new AuraHandledException('Error generating PDF: ' + e.getMessage());
        }
        
        // Almacenar el PDF en un archivo
        ContentVersion contentVersion = new ContentVersion();
        contentVersion.Title = 'Account Details';
        contentVersion.PathOnClient = 'AccountDetails.pdf';
        contentVersion.VersionData = pdfBlob;
        insert contentVersion;
        
        return [SELECT ContentDocumentId FROM ContentVersion WHERE Id = :contentVersion.Id].ContentDocumentId;
    }
}
