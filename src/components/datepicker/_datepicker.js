import flatpickr from 'flatpickr';

const options = {
  dateFormat: 'l, F d',
  minDate: 'today',
  onChange(selectedDates, dateString, instance) {
    const formatedDate = dateString
      .split(' ')
      .map((word, i) => i === 0 ? word.slice(0, 3) + ',' : word.slice(0, 3))
      .join(' ');

    instance.input.value = formatedDate;

    // TODO:
    // send dateString to ticket form
  },
  "disable": [
    function(date) {
      // disable tuesdays
      return (date.getDay() === 2);
    }
  ],
};

const datepickerEl = '.datepicker > input';

export const datepicker = flatpickr(datepickerEl, options);