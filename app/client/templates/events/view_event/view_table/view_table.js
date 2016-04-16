/*****************************************************************************/
/* ViewTable: Event Handlers */
/*****************************************************************************/
Template.ViewTable.events({
	'click #back': function(){
		var eventId = Session.get('currentEvent');
		Router.go('viewEvent', {_id: eventId});
	},

	/*Research: will the Session be set for all users?  If two users
	are accessing different covers will one person's selecting of 
	a cover affect another user?  I suspect, well, yes.  Or is a session
	specific to a logged in user?
	How around this?*/

	'click .selectedCover': function(){
		Session.set('currentCover', this._id);
		var coverId = Session.get('currentCover');
		console.log("This is the currentCover", coverId);
	},

	'change #seeMenuBox': function(){
		if (Session.get('showMenu') == "show"){
			Session.set('showMenu', "hide");
		}
		else
			(Session.set('showMenu', "show"));
	},

	'change #seeMenuBox': function(){
		if (Session.get('showMenu') == "show"){
			Session.set('showMenu', "hide");
		}
		else
			(Session.set('showMenu', "show"));
	},

	'click .guests': function(){
		Session.set('sortBy', "coverNumber");
	},

	'click .apps': function(){
		Session.set('sortBy', "appetizer");
	},

	'click .mains': function(){
		Session.set('sortBy', "main");
	},

	'click .desserts': function(){
		Session.set('sortBy', "dessert");
	},

});

/*****************************************************************************/
/* ViewTable: Helpers */
/*****************************************************************************/
Template.ViewTable.helpers({
	'theCovers':function(){
		var tableId = Session.get('selectedTable');
		var eventId = Session.get('currentEvent');
		var orderOfSort = Session.get('sortBy');
		console.log("This is the sortBy: ", orderOfSort);
		// return Covers.find({table: tableId, event: eventId}, {sort: {coverNumber: 1}});
		if (orderOfSort == "coverNumber"){
			return Covers.find({table: tableId, event: eventId}, {sort: {coverNumber: 1}});
		}
		else if(orderOfSort == "appetizer"){
			return Covers.find({table: tableId, event: eventId}, {sort: {appetizer: 1, coverNumber: 1}});
		}
		else if(orderOfSort == "main"){
			return Covers.find({table: tableId, event: eventId}, {sort: {main: 1, coverNumber: 1}});
		}
		else if(orderOfSort == "dessert"){
			return Covers.find({table: tableId, event: eventId}, {sort: {dessert: 1, coverNumber: 1}});
		}
	},

	'theApps': function(){
		var tableId = Session.get('selectedTable');
		var eventId = Session.get('currentEvent');
		return Covers.find({table: tableId, event: eventId}, {sort: {appetizer: 1}});
	},

	'theMains': function(){
		var tableId = Session.get('selectedTable');
		var eventId = Session.get('currentEvent');
		return Covers.find({table: tableId, event: eventId}, {sort: {main: 1}});
	},

	'theDesserts': function(){
		var tableId = Session.get('selectedTable');
		var eventId = Session.get('currentEvent');
		return Covers.find({table: tableId, event: eventId}, {sort: {dessert: 1}});
	},

	'getEventName':function() {
		var eventId = Session.get('currentEvent');
		console.log("the eventId: ", eventId);
		console.log("The event name", Events.findOne({_id:eventId}).name);
		return Events.findOne({_id:eventId}).name;
	},

	'getTableName':function() {
		var tableId = Session.get('selectedTable');
		console.log("the tableId: ", tableId);
		return Tables.findOne({_id:tableId}).tableName;
	},

	'isAllergic':function(){
		var thisCoverId = this._id;
		if(AllergyList.findOne({allergicGuest: thisCoverId})){
			return 'allergyHighlight';
		}
		/*var allergicId = Session.get('hasAllergyId');
		console.log("The id of isAllergic", allergicId);
		console.log('The is of thisCover', thisCoverId);
		if (thisCoverId == allergicId){
			return 'allergyHighlight';
		}*/
	},

	'foodItems': function() {
		var currentEvent = Session.get('currentEvent');
		var currUser = Meteor.userId();
		var accountCreator = Meteor.user(currUser).profile.businessName; 	
		return SelectedMenuItems.find({createdFromAccount: accountCreator, eventId: currentEvent});
	},

	'tableTallyList': function(){
		var currentTable = Session.get('selectedTable');
		return ItemCounts.find({table: currentTable}, {sort: {order: 1}});
	},


	'theMenus': function(){
		return Menus.find({itemName: chosenMain, takesTemp: "true"}); 
	},


	// 'covers': function() {
	// 	var currentTable = Session.get('selectedTable');
	// 	return Covers.find({table: currentTable});
	// },

	'isChecked': function() {
		if (Session.get('showMenu') == "show"){
			return true;
		}
		else{
			return false;
		}

	},

	'eventStatus': function(){
		var selectedEvent = Session.get('currentEvent');
		return Events.findOne({_id: selectedEvent}).status;
		//return Session.get('readyStatus');

	},

		'selectedStatus': function(){
		var selectedEvent = Session.get('currentEvent');
		var status = Events.findOne({_id: selectedEvent}).status;
		if (status == "Fire Amuse"){
			return "amuse";
		}
		else if (status == "Fire Apps"){
			return "apps"
		}
		else if (status == "Fire Mains"){
			return "mains"
		}
		else if (status == "Fire Desserts"){
			return "desserts"
		}
	},


});

/*****************************************************************************/
/* ViewTable: Lifecycle Hooks */
/*****************************************************************************/
Template.ViewTable.onCreated(function () {
	// console.log("Is this onCreated being called?");
	var tableId = Session.get('selectedTable');
	var eventId = Session.get('currentEvent');
	var coversOnTable = Tables.findOne({_id:tableId}).guestCount;
	// console.log("Cover on table: ", coversOnTable);
	if(!(Covers.findOne({table: tableId, event: eventId}))) {
		for(i = 0; i < coversOnTable; i++){
			// console.log("Trying to insert into collection");
			Covers.insert({
				table: tableId,
				event: eventId,
				coverNumber: (i+1),
				appetizer: "",
				appTemp: "",
				main: "",
				mainTemp: "",
				dessert: "",
				allergy: "",
				appNotes: "",
				mainNotes: "",
				dessertNotes: "",
				
			})
		}
	}
	else {
		var collectionsCount = Covers.find({table:tableId, event: eventId}).count();
		if (collectionsCount != coversOnTable){
			var difference = Math.abs(collectionsCount - coversOnTable)
			if (collectionsCount < coversOnTable){
				for(i = collectionsCount; i < coversOnTable; i++){
					Covers.insert({
						table: tableId,
						event: eventId,
						coverNumber: (i + 1),
						appetizer: "",
						appTemp: "",
						main: "",
						mainTemp: "",
						dessert: "",
						allergy: "",
						notes: ""
					})
				}
			}
			else if(collectionsCount > coversOnTable){
				for (i = collectionsCount; i > coversOnTable; i--){
					var coverId = Covers.findOne({table: tableId, event: eventId, coverNumber: i})._id;
					Covers.remove({_id: coverId});
				}
			}
		}
		console.log("This is the count the collection has: ", collectionsCount);
	}

	
});

Template.ViewTable.onRendered(function () {

	Session.set('sortBy', "coverNumber");
	console.log("On Rendered the sort is: ", Session.get('sortBy'));
});

Template.ViewTable.onDestroyed(function () {
});
