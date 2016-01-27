/*****************************************************************************/
/* AddTable: Event Handlers */
/*****************************************************************************/
Template.AddTable.events({
});

/*****************************************************************************/
/* AddTable: Helpers */
/*****************************************************************************/
Template.AddTable.helpers({
	'chooseEvent':function(){

		var curEvent = Session.get('currentEvent');
		console.log("THis is the currentEvent in addTable:");
		console.log(curEvent);
		return curEvent;
		/*return [
		{label: curEvent, value: curEvent}
		];*/
	},

	'eventFormSchema': function(){
		return Schema.tables;
	}

});

/*****************************************************************************/
/* AddTable: Lifecycle Hooks */
/*****************************************************************************/
Template.AddTable.onCreated(function () {
});

Template.AddTable.onRendered(function () {
});

Template.AddTable.onDestroyed(function () {
});
