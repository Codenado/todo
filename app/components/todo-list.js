import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		createTodo: function(newTitle) {
			this.set('newTitle', '');
			this.sendAction('createTodo', newTitle)
		},
		remaining: Ember.computed('model.@each.isCompleted', function() {
			var model = this.get('model');
			return model.filterBy('isCompleted', false).get('length');

		}),
		infection: Ember.computed('remaining', function(){
			var remaining =this.get('remaining');
			return (remaining === 1 ) ? 'todo' : 'todos';
		}),
		clearCompleted: function() {
			var complete = this.get('model').filterBy('isCompleted', true);
			complete.invoke('deleteRecord')
			complete.invoke('save')
		},
		hasCompleted: Ember.computed('completed', function() {
    		return this.get('completed') > 0;
		}),
		completed: Ember.computed('model.@each.isCompleted', function() {
   			var model = this.get('model');
    		return model.filterBy('isCompleted', true).get('length');
		}),
		allAreDone: function(key, value) {
    		var model = this.get('model');
    		console.log(key + ": " + value);
    		if (value === undefined) {
        		return model.get('length') > 0 && model.isEvery('isCompleted', true);
    		} else {
        		model.setEach('isCompleted', value);
        		model.invoke('save');
        		return value;
			}
		}.property('@each.isCompleted')
	}
});
