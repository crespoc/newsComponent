public with sharing class ProjectController {
    @AuraEnabled(cacheable=true)
    public static List<Project__c> getProjects(String estado) {
        String query = 'SELECT Id, Name, fechaInicio__c, fechaFinalizacionEstimada__c, Cuenta__c, Estado__c FROM Project__c';
        if (estado != null && estado != '') {
            query += ' WHERE Estado__c = \'' + String.escapeSingleQuotes(estado) + '\'';
        }
        query += ' LIMIT 10';
        return Database.query(query);
    }
}
