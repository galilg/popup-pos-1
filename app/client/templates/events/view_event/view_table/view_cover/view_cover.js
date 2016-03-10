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
		var currentEvent = Session.get('currentEvent');
		var currentTable = Session.get('selectedTable');
		var appList = [];
		SelectedMenuItems.find({eventId: currentEvent, course: "Appetizer"}).forEach(function (obj){appList.push(obj.itemName)})
		Covers.update({_id: currentCover}, {$set: {appetizer: chosenApp}});
		// Even though at this point there is no spot for appTemp in the HTML,
		// one can be made.
		if (!Session.get('selectedApp').takesTemp){
			Covers.update({_id: currentCover}, {$set: {appTemp: ""}});
		}
		// This will search for the appetizer within the ItemCounts collection tagged with the currentEvent.
		// If found, then we will retally all of the appetizers.  If not, it will create an entry in ItemCounts
		// And tally them.
		if (ItemCounts.findOne({table: currentTable, appetizer: chosenApp})) {
			for (x in appList){
				var tableId = ItemCounts.findOne({table: currentTable, appetizer: appList[x]})._id;
				var tableTally = Covers.find({table: currentTable, appetizer: appList[x]}).count();
				ItemCounts.update({_id: tableId}, {$set: {tally: tableTally}});
			}
		}
		else{ 
			ItemCounts.insert({
				table: currentTable,
				appetizer: chosenApp,
				tally: 1,
				order: 1
			})
		}

		if (ItemCounts.findOne({event: currentEvent, appetizer: chosenApp})) {
				for (x in appList){
					var eventId = ItemCounts.findOne({event: currentEvent, appetizer: appList[x]})._id;
					var eventTally = Covers.find({event: currentEvent, appetizer: appList[x]}).count();
					ItemCounts.update({_id: eventId}, {$set: {tally: eventTally}});
			}
		}
		else{
			ItemCounts.insert({
				event: currentEvent,
				appetizer: chosenApp,
				tally: 1,
				order: 1
			})
		}
	},

		'click .mainItem': function() {
		Session.set('selectedMain', this._id);
		var chosenMain = SelectedMenuItems.findOne({_id:this._id}).itemName;
		var currentCover = Session.get('currentCover');
		var currentEvent = Session.get('currentEvent');
		var currentTable = Session.get('selectedTable');
		var mainList = [];
		SelectedMenuItems.find({eventId: currentEvent, course: "Main"}).forEach(function (obj){mainList.push(obj.itemName)})
		Covers.update({_id: currentCover}, {$set: {main: chosenMain}});
		if (!Session.get('selectedMain').takesTemp){
			Covers.update({_id: currentCover}, {$set: {mainTemp: ""}});
		}

		if (ItemCounts.findOne({table: currentTable, main: chosenMain})){
				for (x in mainList){
				var tableTally = Covers.find({table: currentTable, main: mainList[x]}).count();
				var tableId = ItemCounts.findOne({table: currentTable, main: mainList[x]})._id;
				ItemCounts.update({_id: tableId}, {$set: {tally: tableTally}});
			}
		}
		else{ 
			ItemCounts.insert({
				table: currentTable,
				main: chosenMain,
				tally: 1,
				order: 2
			})
		}
		if (ItemCounts.findOne({event: currentEvent, main: chosenMain})){
			for(x in mainList){
				var eventTally = Covers.find({event: currentEvent, main: mainList[x]}).count();
				var eventId = ItemCounts.findOne({event: currentEvent, main: mainList[x]})._id;
				ItemCounts.update({_id: eventId}, {$set: {tally: eventTally}});
			}
		}
		else{
			ItemCounts.insert({
				event: currentEvent,
				main: chosenMain,
				tally: 1,
				order: 2
			})
		}

	},

		'click .dessertItem': function() {
		Session.set('selectedDessert', this._id);
		var chosenDessert = SelectedMenuItems.findOne({_id:this._id}).itemName;
		var currentCover = Session.get('currentCover');
		var currentEvent = Session.get('currentEvent');
		var currentTable = Session.get('selectedTable');
		var dessertList = [];
		SelectedMenuItems.find({eventId: currentEvent, course: "Dessert"}).forEach(function (obj){dessertList.push(obj.itemName)})
		Covers.update({_id: currentCover}, {$set: {dessert: chosenDessert}});

		if (ItemCounts.findOne({table: currentTable, dessert: chosenDessert})){
			for (x in dessertList){
				var tableTally = Covers.find({table: currentTable, dessert: dessertList[x]}).count();
				var tableId = ItemCounts.findOne({table: currentTable, dessert: dessertList[x]})._id;
				ItemCounts.update({_id: tableId}, {$set: {tally: tableTally}});
			}
		}
		else{ 
			ItemCounts.insert({
				table: currentTable,
				dessert: chosenDessert,
				tally: 1,
				order: 3
			})
		}
		if (ItemCounts.findOne({event: currentEvent, dessert: chosenDessert})){
			for (x in dessertList){
				var eventTally = Covers.find({event: currentEvent, dessert: dessertList[x]}).count();
				var eventId = ItemCounts.findOne({event: currentEvent, dessert: dessertList[x]})._id;
				ItemCounts.update({_id: eventId}, {$set: {tally: eventTally}});
			}	

		}
		else{
			ItemCounts.insert({
				event: currentEvent,
				dessert: chosenDessert,
				tally: 1,
				order: 3
			})
		}
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
		var temp = $(event.currentTarget).find(':selected').val()
		var currentCover = Session.get('currentCover');
		Covers.update({_id: currentCover}, {$set: {mainTemp: temp}});

	},

	'change #appMods': function(event){
		event.preventDefault();
		var note = $('[name=appNotes').val();
		var currentCover = Session.get('currentCover');
		Covers.update({_id: currentCover}, {$set: {appNotes: note}});
	},

	'click #clearAppMods': function(event){
		event.preventDefault();
		var currentCover = Session.get('currentCover');
		Covers.update({_id: currentCover}, {$set: {appNotes: ""}});
		
	},

	'change #mainMods': function(event){
		event.preventDefault();
		var note = $('[name=mainNotes').val();
		var currentCover = Session.get('currentCover');
		Covers.update({_id: currentCover}, {$set: {mainNotes: note}});
	},

	'click #clearMainMods': function(event){
			event.preventDefault();
			console.log("Clear main mods hit");
			var currentCover = Session.get('currentCover');
			Covers.update({_id: currentCover}, {$set: {mainNotes: ""}});
		
	},

	'change #dessertMods': function(event){
		event.preventDefault();
		var note = $('[name=dessertNotes').val();
		var currentCover = Session.get('currentCover');
		Covers.update({_id: currentCover}, {$set: {dessertNotes: note}})
	},

	'click #clearDessertMods': function(event){
		event.preventDefault();
		var currentCover = Session.get('currentCover');
		Covers.update({_id: currentCover}, {$set: {dessertNotes: ""}});

		
	},


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
