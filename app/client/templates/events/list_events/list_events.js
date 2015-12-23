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
		var galilUserId = 'RzfsYFgAHCrP2iu84';
		console.log(galilUserId.email);
		//var theUser = Meteor.users.find({_id: this.userId});
		var businessType = Meteor.user().profile.businessName;
		//console.log(businessType);
		//return Events.find({createdBy: Meteor.userId()}, {sort: {createdAt: -1}});
		//return Events.find({createdBy: galilUserId}, {sort: {createdAt: -1}});
		//return Events.find({createdFromAccount: businessType}, {sort: {createdAt: -1}});
		return Events.find({createdFromAccount: businessType}, {sort: {createdAt: -1}});

	},

	'isManager':function(){
		var currentUserId = Meteor.userId();
		//console.log(Meteor.user(currentUserId).profile);
		if (Meteor.user(currentUserId).profile.type == "Server"){
			return false;
		}
		else{
			return true;
		}
	}

	
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
