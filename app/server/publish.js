
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