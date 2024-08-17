trigger noMenos20Caracteres on Project__c (before insert, before update) {
    for (Project__c record : Trigger.new) {
        if (record.descripcion__c != null && record.descripcion__c.length() < 20) {
            record.descripcion__c.addError('Debe ingresar al menos 20 caracteres');
        }
    }
}
