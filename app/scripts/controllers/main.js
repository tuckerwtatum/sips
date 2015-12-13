'use strict';

/*
 * @ngdoc function
 * @name statscalcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the statscalcApp
 */

angular.module('statscalcApp')
  .controller('MainCtrl', function ($scope, $parse) {

  	$scope.debugBtn = function() {

  		console.log($scope.cells);
  		
    };

	$scope.addRow = function() {
    	$scope.rows.push($scope.rows.length + 1);
    };

    $scope.addCol = function(){
    	$scope.columns.push('var' + ($scope.columns.length + 1));

    	/*
    	
    	$('.tableBody').css({
    		"margin-left":"-=39px" 
    	});

		*/
    };

    $scope.deleteRow = function() {

    	if ($scope.rows.length > 1) {

    		$scope.rows.splice($scope.rows.length - 1);

    	}

    };

    $scope.deleteCol = function() {

    	if ($scope.columns.length > 1) {

    		$scope.columns.splice($scope.columns.length - 1);

    	}

    };

    $scope.columns = ['var1'];
  	$scope.rows = [];
  	$scope.cells = {};


  	var i;
  	var j;
  	var numRows = 15;
  	var numCols = 10;

  	for (i=1; i <= numRows; i++) {
  		$scope.rows.push(i);
  	}

  	for (i=2; i <= numCols; i++) {
  		$scope.columns.push('var' + i);
  	}
  	
  	$scope.compute = function(cell) {
    	return $parse($scope.cells[cell])($scope);
  	};

  	$scope.clearBtn = function() {

  		numRows = parseInt($scope.rows.length);
  		numCols = parseInt($scope.columns.length);

  		if ($scope.rows.length >= 15) {

	  		for (i=15; i <= $scope.rows.length; i++) {
		  		
		  		$scope.rows.splice(i);
	  		}

  		} else {

  			for (i = ($scope.rows.length + 1); i <= 15; i++) {

  				$scope.rows.push(i);
  			}

  		}

  		if ($scope.columns.length >= 10) {

	  		for (i=10; i < $scope.columns.length; i++) {
		  		
		  		$scope.columns.splice(i);
	  		} 

  		} else {

  			for (i = ($scope.columns.length + 1); i <= 10; i++) {

  				$scope.columns.push('var' + i);
  			}
  		}

  		$scope.inputRows = '';
  		$scope.inputCols = '';
  	};

  	/* need to update for single additions w/ button push */

  	$scope.updateInputRows = function() {

  		numRows = parseInt($scope.rows.length);
  	};

  	$scope.updateInputCols = function() {

  		numCols = parseInt($scope.columns.length);
  	};



  	var pushRows = 0;
  	var pushCols = 0;
  	
  	$scope.setTable = function() {

  		if ($scope.inputRows !== '' && $scope.inputRows !== undefined && $scope.inputRows !== 0) {

  			if ($scope.inputRows > $scope.rows.length) {

	  			pushRows = $scope.inputRows - $scope.rows.length;
	  			for (i = ($scope.rows.length + 1); i <= (numRows + pushRows); i++) {
	  				$scope.rows.push(i);
	  			}

  			} else {

  				pushRows = $scope.inputRows;
  				for (i = ($scope.rows.length); i >= (pushRows); i--) {
	  				$scope.rows.splice(i);
	  			}

  			}
  		}

  		if ($scope.inputCols !== '' && $scope.inputCols !== undefined && $scope.inputCols !== 0) {
  			if ($scope.inputCols > $scope.columns.length) {

	  			pushCols = $scope.inputCols - $scope.columns.length;
	  			for (i = ($scope.columns.length + 1); i <= (numCols + pushCols); i++) {
	  				$scope.columns.push('var' + i);
	  			}

	  			/*

	  			for (j = 1; j <= (i - 10); j++) {
	  				
	  				$('.tableBody').css({
    					"margin-left":"-=39px" 
    				});
	  			}

	  			*/
  			} else {

  				pushCols = $scope.inputCols;
  				for (i = ($scope.columns.length); i >= (pushCols); i--) {
	  				$scope.columns.splice(i);
	  			}
  			}
  		}

  	};

  	var cellsSquaredX = [];
  	var cellsSquaredY = [];
  	var cellsXY = [];
  	var colXArr = [];
  	var colYArr = [];
  	var cellsCounter = 0;
  	var colX, colY, colXSum, colYSum, cellsXYSum, cellsSquaredXSum, cellsSquaredYSum, numberSamples,
  	rScore, rScore1, rScore2, rScore3, rScore4;

  	function add(a, b) {
    	return a + b;
	}

  	$scope.calcTTest = function () {

  		cellsCounter = 0;


  		for (i=1; i <= $scope.rows.length; i++) {

  			if (isNaN($scope.cells['var1' + i]) === false && isNaN($scope.cells['var2' + i]) === false) {

  				colXArr[i] = parseInt($scope.cells['var1' + i]);
  				colYArr[i] = parseInt($scope.cells['var2' + i]);
  				cellsXY[i] = parseInt($scope.cells['var1' + i]) * parseInt($scope.cells['var2' + i]);
	    		cellsSquaredX[i] = Math.pow($scope.cells['var1' + i], 2);
	    		cellsSquaredY[i] = Math.pow($scope.cells['var2' + i], 2);

	    		cellsCounter += 1;
	    		

    		} else {

    			i = ($scope.rows.length + 1);
    		}
    	}


    	numberSamples = cellsCounter;
    	colXSum = colXArr.reduce(add, 0);
    	colYSum = colYArr.reduce(add, 0);
    	cellsXYSum = cellsXY.reduce(add, 0);
	    cellsSquaredXSum = cellsSquaredX.reduce(add, 0);
	    cellsSquaredYSum = cellsSquaredY.reduce(add, 0);

	    rScore1 = (numberSamples * cellsXYSum) - (colXSum * colYSum);
	    rScore2 = (numberSamples * cellsSquaredXSum) - Math.pow(colXSum, 2);
	    rScore3 = (numberSamples * cellsSquaredYSum) - Math.pow(colYSum, 2);
	    rScore4 = Math.sqrt((rScore2 * rScore3));
	    rScore = rScore1 / rScore4;

	   	console.log(rScore);
	    

  	};

  	




});
