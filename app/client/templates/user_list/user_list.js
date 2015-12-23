/*****************************************************************************/
/* UserList: Event Handlers */
/*****************************************************************************/
Template.UserList.events({
	'click .deleteThisGuy': function(e){
		e.preventDefault();
		console.log("its been hit");
		console.log(Meteor.user().emails[0].address);
	}
});

/*****************************************************************************/
/* UserList: Helpers */
/*****************************************************************************/
Template.UserList.helpers({
	beforeRemove: function() {
		//return function (collection, id) {
			//var doc = collection.findOne(id);
			//if(confirm('Delete Event: "' + doc.name + " party on " + doc.date + '"?')) {
			//	this.remove();
			//	Router.go('events');
			}
		
});

/*****************************************************************************/
/* UserList: Lifecycle Hooks */
/*****************************************************************************/
Template.UserList.onCreated(function () {
});

Template.UserList.onRendered(function () {
});

Template.UserList.onDestroyed(function () {
});
