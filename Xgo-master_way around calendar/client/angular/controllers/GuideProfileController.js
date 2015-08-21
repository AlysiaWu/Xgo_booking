// Guide Profile
myApp.controller('GuideProfileController', function($scope, $compile, $routeParams, mainfactory){
       $scope.eventSources = [];
mainfactory.getGuide($routeParams.id, function(data){
  $scope.guide = data;
  console.log("GUIDE INFO", $scope.guide);
// $scope.eventSources = [];
// for(var i = 0; i <$scope.guide.availabilities.length; i++){
//   $scope.eventSources.push($scope.guide.availabilities[i]);
// }
    // $scope.eventSources = [];
 // $scope.eventSources=$scope.guide.availabilities;

// console.log("scope.eventSources", $scope.eventSources);
});
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
      dayClick: $scope.alertEventOnClick,
      eventClick: $scope.alertOnEventClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize,
      eventRender: $scope.eventRender,
      defaultView: 'agendaWeek',
      selectable: true,
      selectHelper: true,
      select: function(start, end, allDay) {
         // console.log("hehe");
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
                  // $scope.eventSources.push($scope.events);
              // });
          }
          // should call 'unselect' method here


      },
      editable: true,
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
              // });
          };


      mainfactory.addAvailabilities($routeParams.id, $scope.events, function(availabilities){
        $scope.eventSources = [];
       $scope.eventSources.push(availabilities);
            console.log("agular ", availabilities);
             console.log("paramsID ", $routeParams.id);
            // $scope.events=[];

      })

}



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
