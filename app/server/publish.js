
Meteor.publish('events', function () {
  return Events.find();
});

Meteor.publish('userData', function(){
	if (this.userID){
		return Meteor.users.find({_id: this.userId},
				{fields:{'other': 1, 'things': 1}});
	}
	else {
		this.ready();
	}
});

Meteor.publish('newuser', function () {
  return Newuser.find();
});

Meteor.publish('userDB', function(){
	return Meteor.users.find({});
});

//Accounts.onCreateUser(function(options, user) {
 /* if (!user.profile.type)
  	console.log("THERE IS NO PROFILE");*/
//  return user;
//});