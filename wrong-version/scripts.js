/// массив названий кнопок

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec"
];

/// формируем кнопки месяцев и назначем кнопке текст

for (i = 0; i < months.length; i++) {
  $(".month_buttons").append('<button class="act">' + months[i] + "</button>");
}

/// получаем массив кнопок в качестве объектов

var monthbtns = document.getElementsByClassName("act");
var monthbtnstoArr = Array.from(monthbtns);

months.forEach(function(month, index) {
  monthbtns.item(index).textContent = month;
});

/// присоединяем listener к кнопкам , который при нажатии на кнопку с опреедленным месяцем :  очищает окно активностей, подгружает акивности  ,  передает кнопку  в функцию loadactivitytodocument()

monthbtnstoArr.forEach(function(monthbtn) {
  monthbtn.addEventListener("click", function() {
    console.log("clicked me");
    clearactivities();
    loadactivitytodocument(monthbtn);
  });
});

///----   получить  JSON как JS  Объект   (сделано с помощью JQuery т.к. было удобно)

var items = null;
var items2 = [];

$.getJSON(
  "<my-remote-source>",
  function(data) {
    items = data;
    items.forEach(function(item, index) {
      console.log(item);

      items2.push(item);
    });
  }
);

/// загружает данные на страничку в список  с id list

function loadactivitytodocument(monthbtn) {
  // если значение поля месяц совпадает с именем кнопки то перебираем любой массив из активностей, и присоединяем к списку новые строки li

  items2.forEach(function(item) {
    var space = " ";

    if (item["month"] === monthbtn.textContent) {
      for (var i = 0; i < item["activities"].length; i++) {
        var sumactivity =
          item.dates[i] + space + item.times[i] + space + item.activities[i];

        $("#list").append('<li class="activity">' + sumactivity + "</li>");
      }
    }
  });
}

/// мето очищающий лист активностей (при нажатии кнопки вызываем)

function clearactivities() {
  $(".activity").remove();
}
