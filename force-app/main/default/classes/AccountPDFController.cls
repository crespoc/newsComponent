public class AccountPDFController {
    public Account account { get; set; }
    
    public AccountPDFController() {
        // Replace 'accountId' with the actual parameter name if different
        Id accountId = ApexPages.currentPage().getParameters().get('id');
        if (accountId != null) {
            account = [SELECT Name, Industry, Phone FROM Account WHERE Id = :accountId];
        }
    }
}
