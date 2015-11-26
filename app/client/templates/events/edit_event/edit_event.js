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
