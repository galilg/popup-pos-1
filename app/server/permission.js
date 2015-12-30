
Meteor.users.deny({
	update: function(){
		return true;
	}
});

Meteor.users.allow({						//allows the remove function to work only if profile.type is Manager
	remove:function(){
		if(Meteor.user().profile.type == "Manager")
			return true;
	}
})
