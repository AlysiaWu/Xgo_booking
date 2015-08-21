// Guide Profile
myApp.controller('GuideProfileController_backup', function($scope, $compile, $routeParams, mainfactory){
       // $scope.eventSources = [];
mainfactory.getGuide($routeParams.id, function(data){
  $scope.guide = data;
  console.log("GUIDE INFO", $scope.guide);
// $scope.eventSources = [];
// for(var i = 0; i <$scope.guide.availabilities.length; i++){
//   $scope.eventSources.push($scope.guide.availabilities[i]);
// }
    // $scope.eventSources = [];
 $scope.availabilities=$scope.guide.availabilities;

// console.log("scope.eventSources", $scope.eventSources);

});

var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();
   /* event source that contains custom events on the scope */

   /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };

   $scope.calEventsExt = {
       color: '#f00',
       textColor: 'yellow',
       events: [
          {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ]
    };
     /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };

/* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'Open Sesame',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        className: ['openSesame']
      });
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };

/* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };
/* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
// $scope.eventSources = [];
//              $scope.eventSources=[$scope.events];
// console.log("scope.eventSources", $scope.eventSources);


 // $scope.eventSources = [];
 /* event sources array*/
 $scope.eventSources = [
    [
        {
            "title": 'All Day Event',
            "start": new Date(y, m, d)
         },
         {
            "title": 'Long Event',
            "start": new Date(y, m, d - 5),
            "end": new Date(y, m, d - 2)
        },
        {
            "title": 'aewfae',
            "start": new Date(y, m, d),
            "end": new Date(y, m, d )
        }
    ],
    [
         {
                    "title": 'helllo',
                    "start": new Date(y, m, d),
                    "end": new Date(y, m, d )
                }
    ]
];

    // $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    // $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
    $scope.events=[]
$scope.uiconfig = {
      height: 450,
      width: 500,
      editable: true,
      calendar: {
      header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
      },
      editable: true,
      dayClick: $scope.alertEventOnClick,
      eventClick: $scope.alertOnEventClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize,
      eventRender: $scope.eventRender,
      defaultView: 'agendaWeek',
      selectable: true,
      selectHelper: true,
      select: function(start, end, allDay) {
         console.log("hehe");
          var title = prompt('Event Title:');
           // console.log("haha");
          if (title) {
              // $scope.$apply(function(){
                  $scope.events.push({
                      title: title,
                      start: start,
                      end: end
                      // allDay: allDay
                  });
                  console.log("scope.events", $scope.events);

              // });
          }
          // should call 'unselect' method here
  $scope.eventSources.push($scope.events);
    $scope.events=[]
      },

    }

};

$scope.uiconfig.calendar.select=function(start, end, allDay){
      console.log("slect");
       var title = prompt('Event Title:');
           // console.log("haha");
           $scope.events=[];
          if (title) {
              // $scope.$apply(function(){
                  $scope.events.push({
                      title: title,
                      start: start,
                      end: end
                      // allDay: allDay
                  });
                  console.log("scope.events", $scope.events);
        $scope.eventSources.push($scope.events);
          $scope.events=[]
              // });
          };
      // $scope.eventSources=[$scope.events];


}
$scope.addAvailabilities = function(){
  mainfactory.addAvailabilities($routeParams.id, $scope.new_aval, function(availabilities){

            console.log("agular ", availabilities);
             console.log("paramsID ", $routeParams.id);
            $scope.availabilities=availabilities;

      })
};
    $scope.review = {};
    $scope.addR = function(){
      console.log($scope.review);
      // $scope.review.push($scope.new_review);
      // consoel.log($scope.review);

    };
// addReview method

  $scope.addTour= function(){

    console.log($scope.new_tour);
    mainfactory.addTour($routeParams.id, $scope.new_tour, function(output){
      $scope.tour=output;
      console.log(output);
      $scope.new_tour={};
    })
    };



  });
