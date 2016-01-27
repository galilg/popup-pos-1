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
	},

	tables: function() {
		//var theUser = Meteor.users.find({_id: this.userId});
		//if (!Meteor.user().profile.businessName){  					// If it is the root user, they don't have a profile.businessName
		//	var businessType = Meteor.user().emails[0].address; 	// So in that case the businessType takes their email
		//}															// Which serves as the businessType for all children of the root user
		//else{
		//	var businessType = Meteor.user().profile.businessName;	// Otherwise, businessType gets assigned the profile.businessName of the regular child user
		//}
		var currentEvent = Session.get('currentEvent');
		return Tables.find({createdForEvent: currentEvent}, {sort: {tableName: 1}});

	},

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
