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
	},

		'click .mainItem': function() {
		Session.set('selectedMain', this._id);
		var chosenMain = SelectedMenuItems.findOne({_id:this._id}).itemName;
		var currentCover = Session.get('currentCover');
		Covers.update({_id: currentCover}, {$set: {main: chosenMain}});
	},

		'click .dessertItem': function() {
		Session.set('selectedDessert', this._id);
		var chosenDessert = SelectedMenuItems.findOne({_id:this._id}).itemName;
		var currentCover = Session.get('currentCover');
		Covers.update({_id: currentCover}, {$set: {dessert: chosenDessert}});
	},

		'click .sideItem': function() {
		Session.set('selectedSide', this._id);
		var chosenSide = SelectedMenuItems.findOne({_id:this._id}).itemName;
		var currentCover = Session.get('currentCover');
		Covers.update({_id: currentCover}, {$set: {side: chosenSide}});
	},

	'change #hasAllergy': function(e){
		e.preventDefault();
		var isChecked = e.target.checked;
		var currUser = Meteor.userId();
		var accountCreator = Meteor.user(currUser).profile.businessName;
		var currentCover = Session.get('currentCover');
		var currentEvent = Session.get('currentEvent');
		if (isChecked){
			Session.set('hasAllergy', true);
			Session.set('hasAllergyId', Session.get('currentCover'));
			console.log(Session.get('hasAllergyId'));

			AllergyList.insert({
				eventId: currentEvent,
				allergicGuest: currentCover,
				createdFromAccount: accountCreator
			})

		}
		
		else{
			Session.set('hasAllergy', false);
			Session.set('hasAllergyId', "");
			var allergicId = AllergyList.findOne({eventId:currentEvent, allergicGuest: currentCover, createdFromAccount: accountCreator})._id;
			var coversId = AllergyList.findOne({eventId:currentEvent, allergicGuest: currentCover, createdFromAccount: accountCreator}).allergicGuest;
			// console.log("This is the allergicId: ", allergicId);
			// console.log("THis is the covers id: ", coversId);
			Covers.update(coversId, {$set: {allergy:""}});  //First update the allergy attribute to blank before deleting from list.
			AllergyList.remove({
				_id: allergicId
			})
		}
	},

	// 'submit form': function(event){
	'change .specifyAllergy': function(event){
		event.preventDefault();
		var allergyDescription = $('[name=theAllergy]').val();
		var currentCover = Session.get('currentCover');
		var currentEvent = Session.get('currentEvent');
		Covers.update(currentCover, {$set:{allergy: allergyDescription}});
	},

	'change #appTempSelect':function(event){
		event.preventDefault();
		console.log("The temp has been changed.");
		console.log($(event.currentTarget).find(':selected').val()); // This fetches the selected option value.
		var temp = $(event.currentTarget).find(':selected').val()
		var currentCover = Session.get('currentCover');
		Covers.update({_id: currentCover}, {$set: {appTemp: temp}});

	},

	'change #mainTempSelect':function(event){
		event.preventDefault();
		// console.log("The temp has been changed.");
		// console.log($(event.currentTarget).find(':selected').val()); // This fetches the selected option value.
		var temp = $(event.currentTarget).find(':selected').val()
		var currentCover = Session.get('currentCover');
		Covers.update({_id: currentCover}, {$set: {mainTemp: temp}});

	},

	'change #appMods': function(event){
		event.preventDefault();
		var note = $('[name=appNotes').val();
		var currentCover = Session.get('currentCover');
		Covers.update({_id: currentCover}, {$set: {appNotes: note}})
	},

	'change #mainMods': function(event){
		event.preventDefault();
		var note = $('[name=mainNotes').val();
		var currentCover = Session.get('currentCover');
		Covers.update({_id: currentCover}, {$set: {mainNotes: note}})
	},

	'change #dessertMods': function(event){
		event.preventDefault();
		var note = $('[name=dessertNotes').val();
		var currentCover = Session.get('currentCover');
		Covers.update({_id: currentCover}, {$set: {dessertNotes: note}})
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
			return "colorSelected";
		}
	},

	'selectedMain': function() {
		var mainId = this._id;
		var selectedMain = Session.get('selectedMain');
		if(mainId == selectedMain){
			return 'colorSelected';
		}
	},

		'selectedDessert': function() {
		var dessertId = this._id;
		var selectedDessert = Session.get('selectedDessert');
		if(dessertId == selectedDessert){
			return 'colorSelected';
		}
	},

		'selectedSide': function() {
		var sideId = this._id;
		var selectedSide = Session.get('selectedSide');
		if(sideId == selectedSide){
			return 'colorSelected';
		}
	},

	'hasAllergy': function(){
		if (Session.get('hasAllergy')){
			return true;
		}
	},

	'isChecked': function(){
		var currUser = Meteor.userId();
		var accountCreator = Meteor.user(currUser).profile.businessName;
		var currentCover = Session.get('currentCover');
		var currentEvent = Session.get('currentEvent');
		if(AllergyList.findOne({eventId:currentEvent, allergicGuest: currentCover, createdFromAccount: accountCreator})){
			return true;
		}
		else{
			return false;
		}
	},

	'getAllergy':function(){
		var currUser = Meteor.userId();
		var accountCreator = Meteor.user(currUser).profile.businessName;
		var currentCover = Session.get('currentCover');
		var currentEvent = Session.get('currentEvent');
		var allergicGuest = AllergyList.findOne({eventId:currentEvent, allergicGuest: currentCover, createdFromAccount: accountCreator}).allergicGuest;
		console.log("The allergicGuest id: ", allergicGuest);
		if(allergicGuest){
			return Covers.findOne({_id: allergicGuest}).allergy;
		}
		else{
			return " ";
		}
	},

	'tempNames':function(){
		var temps = ["Black n Blue", "Rare", "Med Rare", "Medium", "Med Well", "Well"];
		return temps;
	},

	'selectedTemp':function(){
		 var currentCover = Session.get('currentCover');
		 var tempName = Covers.findOne({_id: currentCover}).mainTemp;
		 //var temp = $(event.target).find('value').val();
		 //var temp = $(event).find('value').val();
		 console.log("tempName ", tempName);
		 //console.log("temp ", temp);
		 
		 if("Medium" == tempName){
		 	console.log("returning selected");
		 	return "selected";
		 }
		 else{
		 	return "false";
		 }

	}

	
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
