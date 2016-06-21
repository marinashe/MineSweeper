"use strict";

console.log("app starts");

var mymod = angular.module("mymodule", []);


var countMines = function (board) {
    board.map(function (row, y){
        row.map(function (cell, x) {
            var n = 0;
            if (y > 0){
                n += x > 0 ? (board[y-1][x-1].mine ? 1 : 0) : 0;
                n += board[y-1][x].mine ? 1 : 0;
                n += x < row.length-1 ? (board[y-1][x+1].mine ? 1 : 0) : 0;
                    }
            n += x < row.length-1 ? (board[y][x+1].mine ? 1 : 0) : 0;
            if ( x > 0){
                n += board[y][x-1].mine ? 1 : 0;
                n += y < board.length-1 ? (board[y+1][x-1].mine ? 1 : 0) : 0;

            }
            if (y < board.length-1) {
                n += board[y+1][x].mine ? 1 : 0;
                n += x < row.length-1 ? (board[y+1][x+1].mine ? 1 : 0) : 0;

            }

            board[y][x].counter = n;
            // console.log(n);

        })
    })

};

var createBord = function (len) {
    var board1 = [];
    for ( var j = 0; j < len; j++){
        board1.push([]);
        for (var i = 0; i < len; i++){
            board1[j].push({mine: i===0, value: 'hide', class: 'btn-success', counter: 0, result: ''});
        }
    }
    board1 = shuffleArray(board1);
    countMines(board1);
    return board1;

};


var shuffleArray = function(array) {
    var new_array = [];
    var result = [];
    var len = array.length;
    for (var j = 0; j < len; j++){
        for (var i = 0; i < len; i++){
            new_array.push(array[j][i]);
        }
    }
    console.log(new_array);
    var m = new_array.length,  t, n;

    while (m) {
        n = Math.floor(Math.random() * m--);

        t = new_array[m];
        new_array[m] = new_array[n];
        new_array[n] = t;
    }
    console.log(new_array);
    for ( j = 0; j < len; j++){
        result.push([]);
        for ( i = 0; i < len; i++){
            result[j].push(new_array[j * array.length + i]);
            console.log(j * len + i);
        }
    }
    console.log(result);
  return result;
};


mymod.run(function udi($rootScope) {
    console.log("mymod is loading!!!");
});


mymod.controller("CalcController", function CalcController($scope) {
    console.log("calc controller");

    var game = true;
    
    $scope.btnCreate = function (len) {
       $scope.board = createBord(len);
        $scope.status = 'Go!';
        game = true;

    };
    $scope.btnDbClick = function (item) {
        if($scope.flags != 0){
            console.log('qwet');
            if ($scope.board[item.x][item.y].value === "fa fa-flag"){
                $scope.board[item.x][item.y].value = "";
                $scope.flags = $scope.flags + 1;
            } else {
                $scope.board[item.x][item.y].value = "fa fa-flag";
                $scope.flags = $scope.flags - 1;
            }

        }



    };
     $scope.btnClick = function (item) {
        if (game) {
            if ($scope.board[item.x][item.y].mine){
                $scope.board[item.x][item.y].counter = '';
                $scope.board[item.x][item.y].value = "fa fa-bomb";
                $scope.board[item.x][item.y].class = 'btn-danger';
                $scope.status = 'Game Over!';

                game = false;
            } else {
                $scope.board[item.x][item.y].class = '';
                $scope.board[item.x][item.y].value = '';
                $scope.board[item.x][item.y].result = $scope.board[item.x][item.y].counter;
                $scope.status = 'Ufff!';
            }
        }
    };
});

mymod.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});



// // INSTEAD of ng-app:
// angular.element(document).ready(function() {
//     console.log("ready");
//     angular.bootstrap(document, ['mymodule']);
// });


console.log("app ends");