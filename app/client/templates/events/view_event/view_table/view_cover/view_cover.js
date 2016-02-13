/*****************************************************************************/
/* ViewCover: Event Handlers */
/*****************************************************************************/
Template.ViewCover.events({
	'click #backToTable': function(){
		var currentTableId = Session.get('selectedTable');
		Router.go('viewTable', {_id: currentTableId});
	},

	'click .appItem': function() {
		Session.set('selectedApp', this._id);
		var chosenApp = SelectedMenuItems.findOne({_id:this._id}).itemName;
		var currentCover = Session.get('currentCover');
		Covers.update({_id: currentCover}, {$set: {appetizer: chosenApp}});
	}
});

/*****************************************************************************/
/* ViewCover: Helpers */
/*****************************************************************************/
Template.ViewCover.helpers({
	'getCurrentPosition': function(){
		var currentPositionId = Session.get('currentCover');
		return Covers.findOne({_id:currentPositionId}).coverNumber;
	},

	'getCurrentTable':function() {
		var currentTableId = Session.get('selectedTable');
		var currentEventId = Session.get('currentEvent');
		return Tables.findOne({_id:currentTableId , createdForEvent:currentEventId}).tableName;
	},

	'apps':function() {
		var eventId = Session.get('currentEvent');
		var businessName = Meteor.user().profile.businessName;
		return SelectedMenuItems.find({eventId: eventId, createdFromAccount: businessName, course: "Appetizer"});
	},

	'mains':function() {
		var eventId = Session.get('currentEvent');
		var businessName = Meteor.user().profile.businessName;
		return SelectedMenuItems.find({eventId: eventId, createdFromAccount: businessName, course: "Main"});
	},

	'desserts':function() {
		var eventId = Session.get('currentEvent');
		var businessName = Meteor.user().profile.businessName;
		return SelectedMenuItems.find({eventId: eventId, createdFromAccount: businessName, course: "Dessert"});
	},

	'sides':function() {
		var eventId = Session.get('currentEvent');
		var businessName = Meteor.user().profile.businessName;
		return SelectedMenuItems.find({eventId: eventId, createdFromAccount: businessName, course: "Side"});
	},

	'selectedApp': function() {
		var appId = this._id;
		var selectedApp = Session.get('selectedApp');
		if(appId == selectedApp){
			return "selected";
		}
	},
});

/*****************************************************************************/
/* ViewCover: Lifecycle Hooks */
/*****************************************************************************/
Template.ViewCover.onCreated(function () {
});

Template.ViewCover.onRendered(function () {
});

Template.ViewCover.onDestroyed(function () {
});
