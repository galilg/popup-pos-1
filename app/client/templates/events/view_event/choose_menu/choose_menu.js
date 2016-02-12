/*****************************************************************************/
/* ChooseMenu: Event Handlers */
/*****************************************************************************/
Template.ChooseMenu.events({
});

/*****************************************************************************/
/* ChooseMenu: Helpers */
/*****************************************************************************/
Template.ChooseMenu.helpers({
	aMenu: function() {
		console.log("GOT IN HERE");
		var businessType = Meteor.user().profile.businessName;
		var selectedEvent = Session.get('currentEvent');
		console.log(selectedEvent);
		var eventType = Events.findOne({_id:selectedEvent}).eventType;
		console.log(eventType);
		console.log(Menus.find({}));
		return Menus.find({createdFromAccount: businessType, category:eventType}, {sort: {course:1, itemName:1}});
	}
});

/*****************************************************************************/
/* ChooseMenu: Lifecycle Hooks */
/*****************************************************************************/
Template.ChooseMenu.onCreated(function () {
});

Template.ChooseMenu.onRendered(function () {
});

Template.ChooseMenu.onDestroyed(function () {
});
