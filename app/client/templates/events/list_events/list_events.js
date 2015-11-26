/*****************************************************************************/
/* ListEvents: Event Handlers */
/*****************************************************************************/
Template.ListEvents.events({
});

/*****************************************************************************/
/* ListEvents: Helpers */
/*****************************************************************************/
Template.ListEvents.helpers({
	events: function() {
		return Events.find({createdBy: Meteor.userId()}, {sort: {createdAt: -1}});
	},
});

/*****************************************************************************/
/* ListEvents: Lifecycle Hooks */
/*****************************************************************************/
Template.ListEvents.onCreated(function () {
});

Template.ListEvents.onRendered(function () {
});

Template.ListEvents.onDestroyed(function () {
});
