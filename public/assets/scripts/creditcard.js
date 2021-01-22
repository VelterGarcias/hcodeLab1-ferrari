import IMask from 'imask'
import { getQueryString, setFormValues } from './utils';

document.querySelectorAll('#schedules-payment').forEach( page => {

    const form = page.querySelector('form')
    const number = page.querySelector('#number');
    const expiry = page.querySelector('#expiry');
    const inputCvv = page.querySelector('#cvv');
    const creditCard = page.querySelector('#credit-card')
    const svgCvv = page.querySelector('svg .cvv')
    const svgName = page.querySelector('svg .name')
    const svgNumeber1 = page.querySelector('svg .number-1')
    const svgNumeber2 = page.querySelector('svg .number-2')
    const svgNumeber3 = page.querySelector('svg .number-3')
    const svgNumeber4 = page.querySelector('svg .number-4')
    const svgExpiry = page.querySelector('svg .expiry')
    
    setFormValues(form, getQueryString())

    number.addEventListener('keyup', e => {
        const numberString = number.value.replace(/ /g, '')
        svgNumeber1.innerHTML = numberString.substring(0, 4)
        svgNumeber2.innerHTML = numberString.substring(4, 4)
        svgNumeber3.innerHTML = numberString.substring(8, 4)
        svgNumeber4.innerHTML = numberString.substring(12, 4)
    })

    svgName.addEventListener('keyup', e => {
        svgExpiry.innerHTML = svgName.value
    })

    inputCvv.addEventListener('keyup', (e) => {
        svgCvv.innerHTML = inputCvv.value
    })

    creditCard.addEventListener('click', () => {
        creditCard.classList.toggle('flipped')
    })

    inputCvv.addEventListener('focus', e => {
        creditCard.classList.add('flipped')
    })
    inputCvv.addEventListener('blur', e => {
        creditCard.classList.remove('flipped')
    })

    new IMask(number, {
        mask: '0000 0000 0000 0000'
    })
    new IMask(expiry, {
        mask: '00/00'
    })
    new IMask(inputCvv, {
        mask: '000[0]'
    })

})