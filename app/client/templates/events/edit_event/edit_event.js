/*****************************************************************************/
/* EditEvent: Event Handlers */
/*****************************************************************************/
Template.EditEvent.events({

});

AutoForm.hooks({
	editEventForm: {
		onSuccess: function(doc) {
			Router.go('events');
		}
	}
});

/*****************************************************************************/
/* EditEvent: Helpers */
/*****************************************************************************/
Template.EditEvent.helpers({
	beforeRemove: function() {
		return function (collection, id) {
			var doc = collection.findOne(id);
			if(confirm('Delete Event: "' + doc.name + " party on " + doc.date + '"?')) {
				/** First delete all the covers associated with the event so as to clean the database **/
				while (Covers.findOne({event: id})){
					//console.log("id: ", id );
					var coverId = Covers.findOne({event: id})._id;
					//console.log("The coverId: ", coverId);
					Covers.remove({_id: coverId});
				}

				/** Second delete all the tables associated with the event so as to clean the database **/
				while (Tables.findOne({createdForEvent: id})) {
					var tableId = Tables.findOne({createdForEvent: id})._id;

					/** First delete all of the itemcounts associated with the table in the event **/
					while(ItemCounts.findOne({table: tableId})){
						var itemCountId = ItemCounts.findOne({table: tableId})._id;
						ItemCounts.remove({_id: itemCountId});
					}

					/** Second delete all of the itemcounts associated with the event **/
					while(ItemCounts.findOne({event: id})) {
						var itemCountId = ItemCounts.findOne({event: id})._id;
						ItemCounts.remove({_id: itemCountId});
					}
					Tables.remove({_id: tableId});
				}

				/** Third delete all of the allergies associated with that event **/
				while (AllergyList.findOne({eventId: id})) {
					var allergyId = AllergyList.findOne({eventId: id})._id;
					AllergyList.remove({_id: allergyId});
				}

				/** Then delete the event itself and go back to the events page **/
				this.remove();
				Router.go('events');
			}
		}
	}
});

/*****************************************************************************/
/* EditEvent: Lifecycle Hooks */
/*****************************************************************************/
Template.EditEvent.onCreated(function () {
});

Template.EditEvent.onRendered(function () {
});

Template.EditEvent.onDestroyed(function () {
});
