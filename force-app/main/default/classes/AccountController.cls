public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String industry) {
        String query = 'SELECT Id, Name, Industry, AnnualRevenue FROM Account';
        if (industry != null && industry != '') {
            query += ' WHERE Industry = :industry';
        }
        query += ' LIMIT 100';
        return Database.query(query);
    }
}

