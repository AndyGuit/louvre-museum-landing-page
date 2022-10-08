import * as flsFunctions from './modules/functions.js'
import { datepicker } from '../components/datepicker/_datepicker.js'

const datepickerEl = document.querySelector('.datepicker');
datepickerEl.addEventListener('click', datepicker.open);


flsFunctions.isWebp();
