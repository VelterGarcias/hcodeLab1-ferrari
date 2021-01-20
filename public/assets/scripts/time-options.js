import { format, parse } from "date-fns";
import {ptBR} from 'date-fns/locale';
import firebase from './firebase-app';
import { appendTemplate, getFormValues, getQueryString, setFormValues } from "./utils";

// const data = [
//   {
//     id: 1,
//     value: "9:00",
//   },
//   {
//     id: 2,
//     value: "10:00",
//   },
//   {
//     id: 3,
//     value: "11:00",
//   },
//   {
//     id: 4,
//     value: "12:00",
//   },
//   {
//     id: 5,
//     value: "13:00",
//   },
//   {
//     id: 6,
//     value: "14:00",
//   },
//   {
//     id: 7,
//     value: "15:00",
//   },
// ];



const renderTimeOptions = (context, timeOptions) => {
  console.log("renderTimeOptions");
    const targetElement = context.querySelector('.options')
    targetElement.innerHTML = ""

    timeOptions.forEach(item => {

        appendTemplate(targetElement, 'label', `
        <input type="radio" name="option" value="${item.value}">
        <span>${item.value}</span>`)
        
    })
}
const validateSubmitForm = context => {

    const button = context.querySelector('[type=submit]')

    const checkValue = () => {
        if (context.querySelector('[name=option]:checked')) {
            button.disabled = false
        } else {
            button.disabled = true
        }
    }

    window.addEventListener('load', e => checkValue())
    console.log("addEventListener radios")
    context.querySelectorAll('[name=option]').forEach( input => {
        input.addEventListener('change', (e) => {
            checkValue()
        })
    })

    context.querySelector('form').addEventListener('submit', e => {
        if (!context.querySelector('[name=option]:checked')) {
            button.disabled = true
            e.preventDefault()
        }
    })

    
}

document.querySelectorAll("#time-options").forEach((page) => {

    const db = firebase.firestore();

    db.collection('time-options').onSnapshot(snapshot => {

      const timeOptions = []
      snapshot.forEach(item => {
        timeOptions.push(item.data());
        console.log(item.data());
      })

      renderTimeOptions(page, timeOptions)

      validateSubmitForm(page)
    })


    const params = getQueryString()
    const title = page.querySelector('h3')
    const form = page.querySelector('form')
    const scheduleAt = parse(params.schedule_at, "yyyy-MM-dd", new Date())

    // page.querySelector('[name=schedule_at]').value = params.schedule_at
    setFormValues(form, params)

    console.log(getFormValues(form));

    title.innerHTML = format(scheduleAt, "EEEE, d 'de' MMMM 'de' yyyy ", { locale: ptBR})
});
