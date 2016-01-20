/*****************************************************************************/
/* Menu: Event Handlers */
/*****************************************************************************/
Template.Menu.events({
	'click #restMenu': function(e){
		e.preventDefault();
		$('a[href="#0"]').tab('show');
	},

	'click #lunch': function(e){
		e.preventDefault();
		//console.log("Felt the click");
		$('a[href="#1"]').tab('show');

	},

	'click #brunch': function(e){
		e.preventDefault();
		$('a[href="#2"]').tab('show');

	},

	'click #dinner': function(e){
		e.preventDefault();
		$('a[href="#3"]').tab('show');

	},

	'click #bev': function(e){
		e.preventDefault();
		$('a[href="#4"]').tab('show');
	}
});

/*****************************************************************************/
/* Menu: Helpers */
/*****************************************************************************/
Template.Menu.helpers({
	'isManager':function(){
		var currentUserId = Meteor.userId();
		//console.log(Meteor.user(currentUserId).profile);
		if (Meteor.user(currentUserId).profile.type == "Server"){
			return false;
		}
		else{
			return true;
		}
	},

	theMenus: function(){

		var businessName = Meteor.user().profile.businessName;
		return Menus.find({createdFromAccount: businessName}, {sort: {course: 1, itemName: 1}});
	},

	lunchMenu: function(){
		var businessName = Meteor.user().profile.businessName;
		
		return Menus.find({createdFromAccount: businessName, course: "Lunch"}, {sort: {itemName: 1}});
	},

	brunchMenu: function(){
		var businessName = Meteor.user().profile.businessName;
		
		return Menus.find({createdFromAccount: businessName, course: "Brunch"}, {sort: {itemName: 1}});
	},

	dinnerMenu: function(){
		var businessName = Meteor.user().profile.businessName;
		
		return Menus.find({createdFromAccount: businessName, course: "Dinner"}, {sort: {itemName: 1}});
	},

	beverageMenu: function(){
		var businessName = Meteor.user().profile.businessName;
		
		return Menus.find({createdFromAccount: businessName, course: "Beverage"}, {sort: {itemName: 1}});
	},

});

AutoForm.hooks({
	insertMenuForm: {
		onSuccess: function(doc) {
			Router.go('menu');
		}
	}
});

/*****************************************************************************/
/* Menu: Lifecycle Hooks */
/*****************************************************************************/
Template.Menu.onCreated(function () {

});

Template.Menu.onRendered(function () {

});

Template.Menu.onDestroyed(function () {
});
