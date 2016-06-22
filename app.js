"use strict";

console.log("app starts");

var mymod = angular.module("mymodule", []);


var openFields =  function (x, y) {

    // TODO
    console.log('no code :(');

}

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

var isWin = function (board, count_mines) {
    var count_noOpen_fields = 0;
    console.log(count_mines);
    board.map(function (row) {
        row.map(function (cell) {
            if (!cell.result) {
                count_noOpen_fields += 1;
            }
        })

    })

    return count_noOpen_fields === count_mines;

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
    var m = new_array.length,  t, n;

    while (m) {
        n = Math.floor(Math.random() * m--);

        t = new_array[m];
        new_array[m] = new_array[n];
        new_array[n] = t;
    }
    for ( j = 0; j < len; j++){
        result.push([]);
        for ( i = 0; i < len; i++){
            result[j].push(new_array[j * array.length + i]);
        }
    }
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
        $scope.flags = len;
        game = true;


    };
    $scope.btnRClick = function (cell) {
        if (!cell.result) {
            if($scope.flags != 0 ){
                if (cell.value === "fa fa-flag"){
                    cell.value = "";
                    $scope.flags = $scope.flags + 1;
                } else {
                    cell.value = "fa fa-flag";
                    $scope.flags = $scope.flags - 1;
                }

            }
        }




    };
     $scope.btnClick = function (cell) {
        if (cell.value != "fa fa-flag") {
            if (game) {
                if (cell.mine){
                    cell.counter = '';
                    cell.value = "fa fa-bomb";
                    cell.class = 'btn-danger';
                    $scope.status = 'Game Over!';

                    game = false;
                } else {
                    cell.class = '';
                    cell.value = '';
                    cell.result = cell.counter;
                    if ( Math.random() > 0.5 ) {
                        $scope.status = 'Weee!';
                    } else {
                        $scope.status = 'Yay!';
                    }

                    if (isWin($scope.board, $scope.board.length)) {
                        $scope.status = 'You win, smart guy ;)'
                    }

                }
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




console.log("app ends");