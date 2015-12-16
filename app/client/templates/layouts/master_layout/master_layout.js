Template.MasterLayout.helpers({
	'isManager': function(){
		var currentUserId = Meteor.userId();
		console.log(Meteor.user(currentUserId).profile);
		if (Meteor.user(currentUserId).profile == "Server"){
			return false;
		}
		else{
			return true;
		}
	}
});

Template.MasterLayout.events({
});

