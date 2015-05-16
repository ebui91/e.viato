angular.module('lunchCorgi.events', [])

.controller('EventsController', function ($scope, $window, $location, Events) {

  $scope.eventsList = []
  $scope.event = {}
  $scope.hideme=false
  $scope.user = ''
  $scope.eventsList = []


  var userToken = $window.localStorage.getItem('com.corgi')

  $scope.joinEvent = function(evt) {
    $scope.event = evt;
    var attending = false
    evt.attendeeIDs.forEach(function(person) {
      if(person.username === $scope.user) attending = true
    })
    if(attending) return
    // var userToken = $window.localStorage.getItem('com.corgi');
    Events.joinEvent(evt, userToken)
    .then(function(res) {
      evt.attendeeIDs.push({username: res.data})
      evt.disabled = 'disabled'
    });
  }

  $scope.assignTask = function(evt, task) {
    Events.assignTask(evt, task, $scope.user)
    .then(function(res) {
      task.volunteer = $scope.user
      
    })
  }

  $scope.logout = function() {
    $window.localStorage.setItem('com.corgi', '')
  }


  $scope.addEvent = function() {
    if ($scope.newEvent.description !== "" &&
      $scope.newEvent.location !== "" &&
      $scope.newEvent.datetime !== "" ) {

        var userToken = $window.localStorage.getItem('com.corgi');

        Events.addEvent($scope.newEvent, userToken)
        .then(function(newEvent) {
          Materialize.toast('New Event Created!', 1000)
          newEvent.disabled = 'disabled'
          $scope.eventsList.push(newEvent)
          $scope.initNewEventForm()
        });
      } else {
        Materialize.toast('Please fill in all of the fields', 1000)
      }
  }


  $scope.initNewEventForm = function() {
    $scope.newEvent = {}
    $scope.newEvent.description = ''
    $scope.newEvent.location = ''
    $scope.newEvent.details = ''
    $scope.newEvent.time = (new Date()).toTimeString().substr(0,5)
    $scope.newEvent.date = new Date(new Date() + new Date().getTimezoneOffset()*60000).toISOString().substr(0,10)
    $scope.newEvent.tasklist = []
    $scope.tasklist = []
  }

  $scope.viewAllEvents = function() {
    if ( $window.localStorage.getItem('com.corgi') ) {
      Events.getEvents(userToken)
      .then(function(data) {
        var exists = false
        $scope.user = data.user
        data.events.map(function(e) {
          exists = false
          e.attendeeIDs.forEach(function(person) {
            if(person.username === data.user)
            exists = true
          })
          if(exists) e.disabled = 'disabled'
          else e.disabled = ''
          return e
        })
        $scope.eventsList = data.events;
      });
    } else {
      $location.path('/signin');
    }
  };

  $scope.viewAllEvents()
  $scope.initNewEventForm()
  $scope.tasklist = [];

  $scope.addTask = function() {
    if(event.keyCode == 13 && $scope.taskName) {
      $scope.tasklist.push({"name": $scope.taskName, "completed": false});
      $scope.newEvent.tasklist.push({"name": $scope.taskName, "completed": false});
      $scope.taskName = "";
    }
  }

  $scope.deleteTask = function(index) {
    $scope.tasklist.splice(index, 1);
  }
})
.directive('accordian', function() {
  return {
    link: function($scope, element) {
      jQuery('.collapsible').collapsible({
        accordian: true
      })
    }
  }
})
.directive('autocomplete', function($timeout) {
  return function($scope, element, attribute) {
    element.autocomplete({
      source: $scope[attribute.uiItems],
      select: function() {
        $timeout(function() {
          element.trigger('input');
        }, 0)
      }
    });
  };
})
