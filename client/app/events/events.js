angular.module('lunchCorgi.events', [])

.controller('EventsController', function ($scope, $window, $location, Events) {

  $scope.event = {}
  $scope.hideme=false

  $scope.joinEvent = function(evt) {
    $scope.event = evt;
    var userToken = $window.localStorage.getItem('com.corgi');
    Events.joinEvent(evt, userToken)
    .then(function() {
      evt.attendeeIDs.push({username:'USER'})
    });
    $scope.hideme=true
  }

  $scope.addEvent = function() {
    if ($scope.newEvent.description !== "" &&
      $scope.newEvent.location !== "" &&
      $scope.newEvent.datetime !== "" ) {

        var userToken = $window.localStorage.getItem('com.corgi');

        Events.addEvent($scope.newEvent, userToken)
        .then(function(newEvent) {
          Materialize.toast('New Event Created!', 1000)
          $scope.viewAllEvents();
          $scope.initNewEventForm()
        });
      } else {
        Materialize.toast('Please fill in all of the fields', 1000)
      }
  }

  $scope.eventsList = {}

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
      Events.getEvents()
      .then(function(data) {
        $scope.eventsList = data;
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
