/*****************************************************************************/
/* EditTable: Event Handlers */
/*****************************************************************************/
Template.EditTable.events({
});

AutoForm.hooks({
	editTableForm: {
		onSuccess: function(doc)  {
			var eventId = Session.get('currentEvent');
			Router.go('viewEvent', {_id:eventId});
		}
	}
});
/*****************************************************************************/
/* EditTable: Helpers */
/*****************************************************************************/
Template.EditTable.helpers({
	'eventFormSchema': function(){
		return Schema.tables;
	},

	'selectedDoc':function(){
		// console.log("The table is this id:");
		// console.log(Tables.findOne(Session.get('selectedTable')));
		return(Tables.findOne(Session.get('selectedTable')));
	},

	beforeRemove: function() {
		return function (collection, id) {
			var doc = collection.findOne(id);
			console.log("The id is: ", id);
			if(confirm('Delete Table: "' + doc.tableName + '"?')) {
				/** First delete all the covers associated with the event so as to clean the database **/
				console.log("In the function");
				while (Covers.findOne({table: id})){
					console.log("id: ", id );
					var coverId = Covers.findOne({table: id})._id;
					console.log("The coverId: ", coverId);
					Covers.remove({_id: coverId});
				}

				/** Second delete all the tables associated with the event so as to clean the database **/
				// while (Tables.findOne({createdForEvent: id})) {
					// var tableId = Tables.findOne({createdForEvent: id})._id;

					/** First delete all of the itemcounts associated with the table in the event **/
					while(ItemCounts.findOne({table: id})){
						var itemCountId = ItemCounts.findOne({table: id})._id;
						ItemCounts.remove({_id: itemCountId});
					}

					/** Second delete all of the itemcounts associated with the event **/
					while(ItemCounts.findOne({table: id})) {
						var itemCountId = ItemCounts.findOne({table: id})._id;
						ItemCounts.remove({_id: itemCountId});
					}
					// Tables.remove({_id: tableId});
				//}

				/** Third delete all of the allergies associated with that event **/
				// while (AllergyList.findOne({eventId: id})) {
				// 	var allergyId = AllergyList.findOne({eventId: id})._id;
				// 	AllergyList.remove({_id: allergyId});
				// }

				/** Then delete the event itself and go back to the events page **/
				this.remove();
				Router.go('events');
			}
		}
	}
});

/*****************************************************************************/
/* EditTable: Lifecycle Hooks */
/*****************************************************************************/
Template.EditTable.onCreated(function () {
});

Template.EditTable.onRendered(function () {
});

Template.EditTable.onDestroyed(function () {
});
