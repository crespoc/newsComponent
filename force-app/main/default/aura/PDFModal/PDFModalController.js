({
    doInit : function(component, event, helper) {
        var recordId = component.get("v.recordId");
        var pdfUrl = '/apex/AccountPDFVF?id=' + recordId;
        component.set("v.pdfUrl", pdfUrl);
    },

    showPDFModal : function(component, event, helper) {
        var overlayLib = component.find("overlayLib");
        var pdfUrl = component.get("v.pdfUrl");

        overlayLib.showCustomModal({
            header: "Account PDF",
            body: '<iframe src="' + pdfUrl + '" width="100%" height="600px"/>',
            showCloseButton: true,
            cssClass: "slds-modal_large",
            closeCallback: function() {
                console.log('Modal closed');
            }
        });
    }
})

