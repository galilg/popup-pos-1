/*****************************************************************************/
/* UserList: Event Handlers */
/*****************************************************************************/
Template.UserList.events({
	'click .deleteThisGuy': function(e){

		e.preventDefault();
		console.log("its been hit");
		console.log(Meteor.user().emails[0].address);
	},

	'click .userAccounts': function(e){
		e.preventDefault();
		var userId = this._id;
		Session.set('selectedUser', this._id);
		var selectedUser = Session.get('selectedUser');
		console.log("This is in the .userAccounts:")
		console.log(Meteor.user(userId).emails[0].address);
	},

	'click .theDeleteButton': function(e){
		e.preventDefault();
		console.log("Delete button pressed");
		var userId = this._id;
		var selectedUser = Session.get('selectedUser');
		if(userId == selectedUser){
			console.log("This GUY IS GETTING deleted");
			console.log(selectedUser);
			Meteor.users.remove({_id:selectedUser});
		}
	}



});

/*****************************************************************************/
/* UserList: Helpers */
/*****************************************************************************/
Template.UserList.helpers({
	/*'userAccounts': function(){
		return userDB.find();
	},*/

	'selectedClass': function(){
		//return this._id;
		var userId = this._id;
		var selectedUser = Session.get('selectedUser');
		console.log(selectedUser);
		Session.set('editThisUser', selectedUser);
		if(userId == selectedUser){	
			console.log("NOW this is the selectedClass thingy and the user is:");
			console.log(Meteor.user(userId).emails[0].address);
			return "selected";
		}

	}, 

	'deleteThisGuy': function(){
		var userId = this._id;
		var selectedUser = Session.get('selectedUser');
		if(userId == selectedUser){
			console.log("This keeps pointing to the current user.");
			console.log(Meteor.user(selectedUser).emails[0].address);
			return userId;
		}
	},

	'notManager':function(){
		var currentUserId = Meteor.userId();
		console.log(Meteor.user(currentUserId).profile);
		if (Meteor.user(currentUserId).profile.type == "Server"){
			return true;
		}
		else{
			return false;
		}
	},

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
