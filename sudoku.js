  function solve(boardString) {
    var boardArray = boardString.split("");
    if (boardIsInvalid(boardArray)) {
      return false;
    }
    return recursiveSolve(boardString);
  }

  function recursiveSolve(boardString) {
    var boardArray = boardString.split("");
    if (boardIsSolved(boardArray)) {
      return boardArray.join("");
    }
    var cellPossibilities = getNextCellAndPossibilities(boardArray);
    var nextUnsolvedCellIndex = cellPossibilities.index;
    var possibilities = cellPossibilities.choices;
    for (var i = 0; i < possibilities.length; i++) {
      boardArray[nextUnsolvedCellIndex] = possibilities[i];
      var solvedBoard = recursiveSolve(boardArray.join(""));
      if (solvedBoard) {
        return solvedBoard;
      }
    }
    return false;
  }

  function randomed(boardString) {
    var boardArray = boardString.split("");
    for(var i=0;i<10;i++){
      var switchcase = Math.floor((Math.random() * 6) + 1);
      switch(switchcase) {
        case 1:
          var r1 = 9*Math.floor(Math.random() * 3);
          var r2 = 9*Math.floor(Math.random() * 3);
          if(r1!=r2){
            for(var j=0;j<9;j++){
              [boardArray[r1+j], boardArray[r2+j]] = [boardArray[r2+j], boardArray[r1+j]];
            }
          }
          break;
        case 2:
            var r1 = 27+9*Math.floor(Math.random() * 3);
            var r2 = 27+9*Math.floor(Math.random() * 3);
            if(r1!=r2){
              for(var j=0;j<9;j++){
                [boardArray[r1+j], boardArray[r2+j]] = [boardArray[r2+j], boardArray[r1+j]];
              }
            }
            break;
        case 3:
              var r1 = 54+9*Math.floor(Math.random() * 3);
              var r2 = 54+9*Math.floor(Math.random() * 3);
              if(r1!=r2){
                for(var j=0;j<9;j++){
                  [boardArray[r1+j], boardArray[r2+j]] = [boardArray[r2+j], boardArray[r1+j]];
                }
              }
              break;
        case 4:
                var r1 = Math.floor(Math.random() * 3);
                var r2 = Math.floor(Math.random() * 3);
                if(r1!=r2){
                  for(var j=0;j<9;j++){
                    [boardArray[r1+j*9], boardArray[r2+j*9]] = [boardArray[r2+j*9], boardArray[r1+j*9]];
                  }
                }
                break;  
        case 5:
                  var r1 = 3+Math.floor(Math.random() * 3);
                  var r2 = 3+Math.floor(Math.random() * 3);
                  if(r1!=r2){
                    for(var j=0;j<9;j++){
                      [boardArray[r1+j*9], boardArray[r2+j*9]] = [boardArray[r2+j*9], boardArray[r1+j*9]];
                    }
                  }
                  break;       
        case 6:
                    var r1 = 6+Math.floor(Math.random() * 3);
                    var r2 = 6+Math.floor(Math.random() * 3);
                    if(r1!=r2){
                      for(var j=0;j<9;j++){
                        [boardArray[r1+j*9], boardArray[r2+j*9]] = [boardArray[r2+j*9], boardArray[r1+j*9]];
                      }
                    }
                    break;      
        default:
          console.log("Switch Case Wrong");
      }
    }
    return boardArray.join("");
  }

  function removed(boardString) {
    var boardArray = boardString.split("");
    var deletArray = Array.from({length: 50}, () => Math.floor(Math.random() * 80));
    
    for(var i=0;i<50;i++){
      boardArray[deletArray[i]]=" ";
    }
    return boardArray.join("");
  }

  function boardIsInvalid(boardArray) {
    return !boardIsValid(boardArray);
  }

  function boardIsValid(boardArray) {
    return allRowsValid(boardArray) && allColumnsValid(boardArray) && allBoxesValid(boardArray);
  }

  function boardIsSolved(boardArray) {
    for (var i = 0; i < boardArray.length; i++) {
      if (boardArray[i] === "-") {
        return false;
      }
    }
    return true;
  }

  function getNextCellAndPossibilities(boardArray) {
    for (var i = 0; i < boardArray.length; i++) {
      if (boardArray[i] === "-") {
        var existingValues = getAllIntersections(boardArray, i);
        var choices = ["1", "2", "3", "4", "5", "6", "7", "8", "9"].filter(function (num) {
          return existingValues.indexOf(num) < 0;
        });
        return { index: i, choices: choices };
      }
    }
  }

  function getAllIntersections(boardArray, i) {
    return getRow(boardArray, i).concat(getColumn(boardArray, i)).concat(getBox(boardArray, i));
  }

  function allRowsValid(boardArray) {
    return [0, 9, 18, 27, 36, 45, 54, 63, 72].map(function (i) {
      return getRow(boardArray, i);
    }).reduce(function (validity, row) {
      return collectionIsValid(row) && validity;
    }, true);
  }

  function getRow(boardArray, i) {
    var startingEl = Math.floor(i / 9) * 9;
    return boardArray.slice(startingEl, startingEl + 9);
  }

  function allColumnsValid(boardArray) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (i) {
      return getColumn(boardArray, i);
    }).reduce(function (validity, row) {
      return collectionIsValid(row) && validity;
    }, true);
  }

  function getColumn(boardArray, i) {
    var startingEl = Math.floor(i % 9);
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (num) {
      return boardArray[startingEl + num * 9];
    });
  }

  function allBoxesValid(boardArray) {
    return [0, 3, 6, 27, 30, 33, 54, 57, 60].map(function (i) {
      return getBox(boardArray, i);
    }).reduce(function (validity, row) {
      return collectionIsValid(row) && validity;
    }, true);
  }

  function getBox(boardArray, i) {
    var boxCol = Math.floor(i / 3) % 3;
    var boxRow = Math.floor(i / 27);
    var startingIndex = boxCol * 3 + boxRow * 27;
    return [0, 1, 2, 9, 10, 11, 18, 19, 20].map(function (num) {
      return boardArray[startingIndex + num];
    });
  }

  function collectionIsValid(collection) {
    var numCounts = {};
    for(var i = 0; i < collection.length; i++) {
      if (collection[i] != "-") {
        if (numCounts[collection[i]] === undefined) {
          numCounts[collection[i]] = 1;
        } else {
          return false;
        }
      }
    }
    return true;
  }

  function toString(boardArray) {
    return [0, 9, 18, 27, 36, 45, 54, 63, 72].map(function (i) {
      return getRow(boardArray, i).join(" ");
    }).join("\n");
  }
