var PlayerOne=prompt("Player One: Enter Your Name , you will be Blue");
var PlayerTwo=prompt("Player Two: Enter Your Name, you will be Red");

var circle={
  "background-color":"grey",
  "display":"inline-block",
  "height":"80px",
  "width":"80px",
  "border-radius":"50%",
  "border":"5px solid #000",
  "margin":"2px",
  "color":"#fff",
  "line-height":"50px",
  "text-align":"center"
}

var circleblue={
  "background-color":"blue",
  "display":"inline-block",
  "height":"80px",
  "width":"80px",
  "border-radius":"50%",
  "border":"5px solid #000",
  "margin":"2px",
  "color":"#fff",
  "line-height":"50px",
  "text-align":"center"
}

var circlered={
  "background-color":"red",
  "display":"inline-block",
  "height":"80px",
  "width":"80px",
  "border-radius":"50%",
  "border":"5px solid #000",
  "margin":"2px",
  "color":"#fff",
  "line-height":"50px",
  "text-align":"center"
}

$('td').css(circle);

var clicked=0;
var CrntPlayer=PlayerOne;
var crntcolor="Blue";
var instrction="It your turn, please pick a column to drops your ";

var columns=[".cloumn1",".cloumn2",".cloumn3",".cloumn4",".cloumn5",".cloumn6",".cloumn7"];
var row=['.row1','.row2','.row3','.row4','.row5','.row6','.row7'];

var PlayerWon=NaN;

function turn(){
  if (clicked%2!=0){
    CrntPlayer=PlayerTwo;
    crntcolor="Red";
    return circleblue;
  }
  else{
    CrntPlayer=PlayerOne;
    crntcolor="Blue";
     return circlered;
   }
}

function lastrow(item){
  for (var i = 6; i >=0 ; i--) {
    if ($(item).eq(i).css("background-color")=="rgb(128, 128, 128)"){
      return i;
    }
}}

$(".CurrentPlayer").text(CrntPlayer+":")
$(".Instructions").text(instrction+crntcolor+ " Chip.")

function colorfill(item){
  $(item).click(function(){
    clicked+=1;
    $(item).eq(lastrow(item)).css(turn());
    $(".CurrentPlayer").text(CrntPlayer+":")
    $(".Instructions").text(instrction+crntcolor+ " Chip.")
    if (HoriWinCheck() || VerWinCheck()|| RightDiaCheck()|| LeftDiaCheck()){
      console.log(PlayerWon+" Won!");
      $(".CurrentPlayer").text("");
      $(".Instructions").text("");
      $("h2").text(PlayerWon+" has Won ! Refresh your Browser to restart.");
      $(".Board").fadeOut(1200);
      $(".Board").fadeIn(1200);
    }
    // console.log(clicked);
  })
}

columns.forEach(colorfill);

function colormatch(one,two,three,four){
  if (one==two && one==three && one==four && one!="rgb(128, 128, 128)" && one!=undefined ){
    return true;
  }
}

function returncolor(row,col){
  return $(columns[col-1]).eq(row-1).css("background-color")
}

function HoriWinCheck(){
  for (var row = 1; row <= 7 ; row++) {
    for (var col = 1; col<5; col++) {
      if (colormatch(returncolor(row,col),returncolor(row,col+1),returncolor(row,col+2),returncolor(row,col+3))){
        if (returncolor(row,col)=="rgb(0, 0, 255)"){
          PlayerWon=PlayerOne;
        }
        else{
          PlayerWon=PlayerTwo;
        }
        console.log("HoriWon!");
        return true;
      }
    }
  }
}

function VerWinCheck(){
  for (var col = 1; col <= 7 ; col++) {
    for (var row = 1; row<5; row++) {
      if (colormatch(returncolor(row,col),returncolor(row+1,col),returncolor(row+2,col),returncolor(row+3,col))){
        if (returncolor(row,col)=="rgb(0, 0, 255)"){
          PlayerWon=PlayerOne;
        }
        else{
          PlayerWon=PlayerTwo;
        }
        console.log("VertiWon!");
        return true;
      }
    }
  }
}

function RightDiaCheck(){
  for (var col = 1; col <5 ; col++) {
    for (var row = 7; row>3; row--) {
      if (colormatch(returncolor(row,col),returncolor(row-1,col+1),returncolor(row-2,col+2),returncolor(row-3,col+3))){
        if (returncolor(row,col)=="rgb(0, 0, 255)"){
          PlayerWon=PlayerOne;
        }
        else{
          PlayerWon=PlayerTwo;
        }
        console.log("RightDiaWon!");
        return true;
      }
    }
  }
}

function LeftDiaCheck(){
  for (var col = 7; col >3 ; col--) {
    for (var row = 7; row>3; row--) {
      if (colormatch(returncolor(row,col),returncolor(row-1,col-1),returncolor(row-2,col-2),returncolor(row-3,col-3))){
        if (returncolor(row,col)=="rgb(0, 0, 255)"){
          PlayerWon=PlayerOne;
        }
        else{
          PlayerWon=PlayerTwo;
        }
        console.log("LeftDiaWon!");
        return true;
      }
    }
  }
}
