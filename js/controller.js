var app = angular.module('todoApp', []) // Declare Angular Application module

app.controller('TodoListController', ['$scope', function($scope) { // Declare Angular Controller

	// The controller responds to user input and performs interactions on the data model objects. The controller receives input, validates it, and then performs business operations that modify the state of the data model.
	
	// $scope is a special javascript object which plays the role of joining controller with the views. Scope contains the model data. In controllers, model data is accessed via $scope object.
	
	// $scope.title is the model which is to be viewed in HTML. $scope.title also has a value assigned to it.
    
    $scope.title = 'EasyLister'; 
    
    $scope.createdby = "Created By : Billy Halim";
	
    // Get all the item to be visible whether the page is reloaded.
    $scope.saved = localStorage.getItem('todos');

    $scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : [];
	
	// Save all the item to browser localStorage
	localStorage.setItem('todos', JSON.stringify($scope.todos));
	
	// When an edit button in an item is pressed, $scope.selected will contain the item properties.
    $scope.selected = {};
	
	var currentID = localStorage.getItem('currentID') || 1;
	
    $scope.addTodo = function() {
		// Use unshift() method to push a new item in the beginning of an array. There is an ID to specify the items in array.
        $scope.todos.unshift({text:$scope.todoText, done:false, id : currentID++});
		// After push an item to array, the input form will be blanked.
        $scope.todoText = '';
		localStorage.setItem('todos', JSON.stringify($scope.todos));
		localStorage.setItem('currentID', currentID);
    };

    $scope.remaining = function() {
        var count = 0; // Initialize count to 0
		// For each item in $scope.todos, count the unfinished task. "todo" in "function(todo)" represents an item
        angular.forEach($scope.todos, function(todo) {
            count += todo.done ? 0 : 1; // If done=false (unchecked), the count on unchecked will added by 1. If done=true (checked), the count on checked won't be added.
        });
          return count; // Return the count, executed in HTML
        };

    $scope.delete = function() {
        var oldTodos = $scope.todos; // create a new variable (assigned by $scope.todos) to be inserted the items which will be deleted. I use $scope.todos to oldTodos because the deleted items will be in an array also.
        $scope.todos = [];
		// For each item in oldTodos. If items are checked (todo.done = true), they will be pushed to the oldTodos variable.
        angular.forEach(oldTodos, function(todo) {
           if (!todo.done) $scope.todos.push(todo);
        });
		localStorage.setItem('todos', JSON.stringify($scope.todos));
    };

	// remove individual item
    $scope.remove = function(){
        $scope.todos.splice(this.$index, 1);
		localStorage.setItem('todos', JSON.stringify($scope.todos));
    };

	// get the template to edit or display post
     $scope.getTemplate = function (todo) {
        if (todo.id === $scope.selected.id) return 'edit';
        else return 'display';
    };
	
	
	// edit function, copy the properties of an item to $scope.selected to be edited
    $scope.change = function(todo){
        $scope.selected = angular.copy(todo);
		localStorage.setItem('todos', JSON.stringify($scope.todos));
    }

    $scope.save = function(index) {
		// If an item's properties has been changed in $scope.selected, when the save button is pressed, an item's properties will be changed in $scope.todos
        $scope.todos[index] = angular.copy($scope.selected); // use 'index' to reflect the changes of an item from $scope.selected to $scope.todos
        $scope.cancel();
		localStorage.setItem('todos', JSON.stringify($scope.todos));
    };

    $scope.cancel = function() {
		// No changes in $scope.selected. The item's properties won't be changed because when the cancel button is pressed, $scope.selected is blanked.
        $scope.selected = {};
		localStorage.setItem('todos', JSON.stringify($scope.todos));		
    };
	
	// Delete all your item from the list and also the browser localStorage
	$scope.reset = function(){
		localStorage.clear();
	}
}]);

// Try to press Esc button when in edit mode.
app.directive('onEsc', function() {
		return function(scope, elm, attr) {
			elm.bind('keyup', function(e) {
				if (e.keyCode === 27) {
					scope.$apply(attr.onEsc);
				}
			});
		};
});

// Try to press edit button, the cursor will automatically focused on the edit input field.
app.directive('todoFocus', function todoFocus($timeout) {
		return function (scope, elem, attrs) {
			scope.$watch(attrs.todoFocus, function (newVal) {
				if (newVal) {
					$timeout(function () {
						elem[0].focus();
					}, 0, false);
				}
			});
		};
	});
	
// The tutorial is coming soon
	
	