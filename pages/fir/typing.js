function TypingWordNew(txt, str, timewait) {
  var i = 0;
  setTimeout(function () {
    // alert("hello")
    var TimerIn = setInterval(function () {
      if (i < str.length) {
        txt.innerHTML = str.slice(0, ++i) + '|';
      } else {
        txt.innerHTML = str;
        clearInterval(TimerIn);
      }
    }, 200)
  }, timewait);
}

var text1 = page.getElementById("text");
var str1 = 'Welcome!';
TypingWordNew(text1, str1, 0);
$(page).ready(function () {
  setTimeout(function () {
    $("#inner").fadeOut(1000, function () {
      $("#LoadingAnimation").remove();
    });
  }, 3600)
})