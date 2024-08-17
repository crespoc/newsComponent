import { LightningElement, api } from 'lwc';
import createJiraIssue from '@salesforce/apex/JiraIntegrationService.createJiraIssue';
import { NavigationMixin } from 'lightning/navigation';

export default class CreateJiraItem extends NavigationMixin(LightningElement) {
    //replace these values according to your jira account
    @api jiraProjectKey = 'IN';
    @api jiraUserName = 'ruddycrespo.c@gmail.com';
    @api jiraApiToken = 'ATATT3xFfGF0HQA5B-HX-Eo1uJq3pACgpvcMe9TslkldO01vN1VIOxqQv5f_rothxkWeyPh1o5k2pJUl4oys-S6ee8avEMjdkZGXE6aq2WqITRrPRVUMdAHWLoI7LrYq1ujqxSsjM1UM4TCfhjyYdbJOLsOCoyqRBN2-Q9kYDRUFEGR4QmcME6Q=82DEECA9';
    @api jiraBaseUrl = 'https://ruddycrespoc.atlassian.net/';
    summary = '';
    description = '';
    jiraResponseId = '';
    showSpinner;

    get requestBody() {
        return {
            "fields": {
                "project": {
                    "key": this.jiraProjectKey
                },
                "summary": this.summary,
                "description": {
                    "type": "doc",
                    "version": 1,
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": this.description
                                }
                            ]
                        }
                    ]
                },
                "issuetype": {
                    "name": "Task"
                }
            }
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const formFields = event.detail.fields;
        this.showSpinner = true;
        this.summary = formFields.summary__c;
        this.description = formFields.Description__c;
        try {
            this.jiraResponseId = await createJiraIssue({
                userName: this.jiraUserName,
                apiToken: this.jiraApiToken,
                baseUrl: this.jiraBaseUrl,
                requestBody: JSON.stringify(this.requestBody)
            });
            formFields.Item_Link__c = 'https://ruddycrespoc.atlassian.net/browse/'+ this.jiraResponseId;
            // Trigger form submission with the updated fields
            this.template
                .querySelector("lightning-record-edit-form")
                .submit(formFields);
        } catch (error) {
            this.jiraResponseId = '';
        }
        this.showSpinner = false;
    }

    navigateToNewJiraItem(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'Jira__c',
                actionName: 'view'
            }
        });
    }
}