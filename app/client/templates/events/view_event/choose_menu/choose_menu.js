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
		var businessType = Meteor.user().profile.businessName;
		var selectedEvent = Session.get('currentEvent');
		var eventType = Events.findOne({_id:selectedEvent}).eventType;
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
