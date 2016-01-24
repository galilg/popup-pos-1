/*****************************************************************************/
/* ViewEvent: Event Handlers */
/*****************************************************************************/
Template.ViewEvent.events({

});

/*****************************************************************************/
/* ViewEvent: Helpers */
/*****************************************************************************/
Template.ViewEvent.helpers({
	'selectedEvent': function(){
		var selectedEvent = Session.get('currentEvent');
		var theEvent = Events.findOne({_id: selectedEvent});
		return theEvent;
	}
});

/*****************************************************************************/
/* ViewEvent: Lifecycle Hooks */
/*****************************************************************************/
Template.ViewEvent.onCreated(function () {
});

Template.ViewEvent.onRendered(function () {
});

Template.ViewEvent.onDestroyed(function () {
});
