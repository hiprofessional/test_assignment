$(function() {
  const useFakeData = false;

  function start() {
    initMonthClick();
    showSelectMonthMessage(true);
    // getCurrentMonthEvents();
  }

  function showSelectMonthMessage(show) {
    const message = $('.message__select_moth');
    show ? message.show() : message.hide();
  }

  function initMonthClick() {
    $('.month').on('click', function() {
      const monthId = $(this).data('id');
      showEventsForMonth(monthId);
    })
  }
  function getCurrentMonthEvents() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    showEventsForMonth(currentMonth);
  }

  function showEventsForMonth(monthId) {
    showSelectMonthMessage(false);
    useFakeData ? getFakeEventsByMonth(monthId, drawEvents) :
      getEventsByMonth(monthId, drawEvents);
  }

  function getFakeEventsByMonth(monthId, callback) {
    const data = [
      {
        activity: 'Drink coffee',
        id: 1,
        dateTime: `01.${monthId}.2020 12:00`
      }
    ]
    callback(monthId, data);
  }
  function getEventsByMonth(monthId, callback) {
    $.get('calendardata.json', function(data) {
      const filtered = data.filter(function(el) {
        return (el.id - 1) == monthId;
      });
      callback(monthId, filtered);
    })
  } 
  function drawEvents(monthId, events) {
    selectCurrentMonth(monthId);
    renderEvents(events);
  } 
  function selectCurrentMonth(monthId) {
    $('.month').removeClass('active');
    $(`.month[data-id="${monthId}"]`).addClass('active');
  }
  function renderEvents(events) {
    const messageNoEvents = $('.message__no_events');
    const list = $('.events__list');
    list.empty();

    if (events.length > 0) {
      messageNoEvents.hide();
      const items = events.map(function(el) {
        return `<li> ${el.dateTime} - ${el.activity}</li>`
      }).join('');
      let result = `<ul> ${items} </ul>`;
      console.log(result);
      list.append(result);
    } else {
      messageNoEvents.show();
    }
  }

  start();
})