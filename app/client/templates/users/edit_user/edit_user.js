/*****************************************************************************/
/* EditUser: Event Handlers */
/*****************************************************************************/
Template.EditUser.events({
});

/*****************************************************************************/
/* EditUser: Helpers */
/*****************************************************************************/
Template.EditUser.helpers({
	'currentUser': function(){
		var currentUser = Session.get('editThisUser');
		console.log(Meteor.user(currentUser).emails[0].address);
		return Meteor.user(currentUser).emails[0].address;
	}
});

/*****************************************************************************/
/* EditUser: Lifecycle Hooks */
/*****************************************************************************/
Template.EditUser.onCreated(function () {
});

Template.EditUser.onRendered(function () {
});

Template.EditUser.onDestroyed(function () {
});
