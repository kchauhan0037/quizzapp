let alldata;
$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", function (response) {
  alldata = response;

  quizdata(alldata);
});

var body = $("#bodyqz");
$("body").css({ "background-color": "rgb(84,195,239)" });
var appheading = $("<h1>");
body.append(appheading);
appheading.text("The Quiz App");
appheading.addClass("heading");
var container = $("<div>");
body.append(container);
container.addClass("wrapper");
var forms = $("<form>");
container.append(forms);
forms.addClass("forms");

function quizdata(data) {
  var optionclicked = [];
  for (var i = 0; i < data.length; i++) {
    var ques = $("<p>");
    forms.append(ques);
    ques.html("Q" + (i + 1) + " " + data[i].question);
    $("p").addClass("questions");

    for (var j = 0; j < data.length - 1; j++) {
      var option = $("<input>").attr({
        type: "radio",
        id: j,
        name: data[i].question,
      });

      option.click(function (e) {
        var answr = parseInt(e.target.id) + 1;

        optionclicked.push(answr);
      });
      var labl = $("<label>");
      var breakline = $("<br>");
      forms.append(option);
      forms.append(labl);
      $("label").addClass("options");
      forms.append(breakline);

      labl.html(data[i].options[j]);

      function answrvalidate(optionclicked) {
        score = 0;
        for (let i = 0; i < data.length; i++) {
          if (optionclicked[i] == data[i].answer) {
            score += 1;
          }
        }
        return score;
      }
    }
    forms.append($("<hr>").addClass("question-divider"));
  }
  var btndiv = $("<div>");
  btndiv.addClass("btnwrapper");
  forms.append(btndiv);
  var submitbtn = $("<button>").attr({
    type: "submit",
  });
  submitbtn.text("SUBMIT");
  btndiv.append(submitbtn);
  submitbtn.addClass("btn");

  submitbtn.click(function (e) {
    e.preventDefault();
    answrvalidate(optionclicked);
    actualscore.html(answrvalidate(optionclicked));
  });

  var scorecard = $("<div>");
  container.append(scorecard);
  scorecard.text("score");
  scorecard.addClass("scorediv");
  scorecard.append($("<br>"));
  var actualscore = $("<span>");
  scorecard.append(actualscore);

  var outof = $("<span>");
  outof.text("/5");
  scorecard.append(outof);
}



