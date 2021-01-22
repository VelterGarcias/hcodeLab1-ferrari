import firebase from './firebase-app'
import { appendTemplate, formatCurrency, getFormValues, getQueryString, getQueryStringFromJSON, onSnapshotError, setFormValues } from './utils'

let serviceSummary = []

const renderServicesOptions = (context, serviceOptions) => {

    const optionsEl = context.querySelector('.options');
    optionsEl.innerHTML = ""

    serviceOptions.forEach(item => {
        const label = appendTemplate(optionsEl, 'label', `
        <input type="checkbox" name="service" value="${item.id}">
        <div class="square">
            <div></div>
        </div>
        <div class="content">
            <span class="name">${item.name}</span>
            <span class="description">${item.description}</span>
            <span class="price">${formatCurrency(item.price)}</span>
        </div>
        `)

        label.querySelector('[type=checkbox]').addEventListener('change', (e) => {
            const {checked, value } = e.target

            if (checked) {

                const service = serviceOptions.filter(option => {
                    return (Number(option.id) === Number(value))
                })[0]

                serviceSummary.push(service.id)
            } else {
                serviceSummary = serviceSummary.filter(id => {
                    return +id !== +value
                    //Caso seja diferente, retorna true, isso faz com que fique.
                })
            }

            renderServicesSummary(context, serviceOptions)
            
        })
    })
}

const renderServicesSummary = (context, serviceOptions) => {
    // console.log(context, serviceOptions)
    const tbodyEl = context.querySelector('aside tbody')
    tbodyEl.innerHTML = ""

    // const result = serviceSummary.map( id => {
    //     return serviceOptions.filter( item => {
    //         return +item.id === +id
    //     })[0]
        
    // })
    // result.forEach(item => {
    //     return appendTemplate(tbodyEl, 'tr', `
    //     <td>${item.name}</td>
    //     <td class="price">${formatCurrency(item.price)}
    //     </td>
    //     `)
    
    // })

    serviceSummary
    .map( id => serviceOptions
        .filter( item => +item.id === +id)[0])
        .sort((a,b) => {
            console.log(a.name, b.name)
            if(a.name > b.name) {
                return 1;
            } else if (a.name < b.name) {
                return -1;
            } else {
                return 0
            }
        })

    .forEach(item => appendTemplate(tbodyEl, 'tr', `
        <td>${item.name}</td>
        <td class="price">${formatCurrency(item.price)}
        </td>
        `))


    const totalEl = context.querySelector('footer .total')

    // const result = serviceSummary.map(id => {
    //     return serviceOptions.filter(item =>{
    //         return (+item.id === +id)
    //     })[0]
    // })
    
    // const total = result.reduce((totalResult, item) => {
    //     return +totalResult + +item.price
    // }, 0)

    const total = serviceSummary
        .map(id => serviceOptions.filter(item => (+item.id === +id))[0])
        .reduce((totalResult, item) => +totalResult + +item.price, 0)
    
    totalEl.innerHTML = formatCurrency(total)
}

document.querySelectorAll('#schedules-services').forEach( page => {
        const db = firebase.firestore()
        db.collection('services').onSnapshot(snapshot => {
            const services = []

            snapshot.forEach(item => {
               services.push(item.data())
            })

            renderServicesOptions(page, services)
        }, onSnapshotError)

        const params = getQueryString()

        const form = page.querySelector('form')

        setFormValues(form, params)

        const buttonSummary = page.querySelector('#btn-summary-toggle')

        buttonSummary.addEventListener('click', (e) =>{
            page.querySelector('aside').classList.toggle('open')
        })

        // form.addEventListener('submit', (e) =>{
        //     e.preventDefault()
        //     const values = getFormValues(form)
            
        //     window.location.href = `/schedules-payment.html?${getQueryStringFromJSON(values)}`

        // })
})