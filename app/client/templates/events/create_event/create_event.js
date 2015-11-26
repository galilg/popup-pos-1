/*****************************************************************************/
/* CreateEvent: Event Handlers */
/*****************************************************************************/
Template.CreateEvent.events({

});

AutoForm.hooks({
	insertEventForm: {
		onSuccess: function(doc) {
			Router.go('events');
		}
	}
});

/*****************************************************************************/
/* CreateEvent: Helpers */
/*****************************************************************************/
Template.CreateEvent.helpers({
});

/*****************************************************************************/
/* CreateEvent: Lifecycle Hooks */
/*****************************************************************************/
Template.CreateEvent.onCreated(function () {
});

Template.CreateEvent.onRendered(function () {
});

Template.CreateEvent.onDestroyed(function () {
});
