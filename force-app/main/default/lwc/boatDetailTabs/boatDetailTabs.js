import { LightningElement, api, wire } from 'lwc';

import {
    APPLICATION_SCOPE,
    subscribe,
    MessageContext
} from 'lightning/messageService';

import BOATMC from "@salesforce/messageChannel/BoatMessageChannel__c";

// Custom Labels Imports
// import labelDetails for Details
// import labelReviews for Reviews
// import labelAddReview for Add_Review
// import labelFullDetails for Full_Details
// import labelPleaseSelectABoat for Please_select_a_boat
// Boat__c Schema Imports
// import BOAT_ID_FIELD for the Boat Id
// import BOAT_NAME_FIELD for the boat Name
// const BOAT_FIELDS = [BOAT_ID_FIELD, BOAT_NAME_FIELD];

export default class BoatDetailTabs extends LightningElement {
    subscription = null;
    @api
    boatId;

    wiredRecord;

    // label = {
    //     labelDetails,
    //     labelReviews,
    //     labelAddReview,
    //     labelFullDetails,
    //     labelPleaseSelectABoat,
    // };

    // Decide when to show or hide the icon
    // returns 'utility:anchor' or null
    get detailsTabIconName() { }

    // Utilize getFieldValue to extract the boat name from the record wire
    get boatName() { }

    @api
    get recordId() {
        return this.boatId;
    }
    set recordId(value) {
        this.setAttribute('boatId', value);
        this.boatId = value;
    }

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        // recordId is populated on Record Pages, and this component
        // should not update when this component is on a record page.
        if (this.subscription || this.recordId) {
            return;
        }
        // Subscribe to the message channel to retrieve the recordID and assign it to boatId.
        this.subscribeMC();


    }

    subscribeMC() {
        this.subscription = subscribe(
            this.messageContext, BOATMC, (message) => {
                this.boatId = message.recordId
            }, {
            scope: APPLICATION_SCOPE
        });
    }

    // Navigates to record page
    navigateToRecordViewPage() { }

    // Navigates back to the review list, and refreshes reviews component
    handleReviewCreated() { }
}