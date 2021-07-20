'use strict'

const inputMoneySel = document.querySelector('.bill-input')
const numPeopleSel = document.querySelector('.num-people-input')
const tipAmountSel = document.querySelector('#tip-amount')
const totalAmountSel = document.querySelector('#total-amount')
const tipPercentageSels = document.querySelectorAll('.percent-item__radio')
const percentItemSels = document.querySelectorAll('.percent-item')
const customTipSel = document.querySelector('.custom-tip-input')
const errorPeopleSel = document.querySelector('.error-message')
const inputBoxPeople = document.querySelector('#input-box-people')

const resetBtn = document.querySelector('#reset-btn')

let tipPercentage = ''
let billAmount = 0
let people = 1

const updateBill = (money) => {
  billAmount = +money

  displayResults()
}

const updatePeople = (numPeople) => {
  people = +numPeople

  displayResults()
}

const updateTipPercentage = (tipValue) => {
  tipPercentage = +tipValue / 100
  displayResults()
}

const handleRadioPercent = (e, tipValue) => {
  // Resets custom selector display
  customTipSel.value = 'Custom'

  updateTipPercentage(tipValue)

  percentItemSels.forEach((item) => {
    item.classList.remove('clicked')
  })

  e.target.parentElement.classList.add('clicked')

  displayResults()
}

const handleCustomTip = (tipValue) => {
  updateTipPercentage(tipValue)

  percentItemSels.forEach((item) => {
    item.classList.remove('clicked')
  })
}

const displayResults = () => {
  resetBtn.classList.remove('disabled')

  if (people <= 0) {
    errorPeopleSel.classList.add('show')
    inputBoxPeople.classList.add('error')
    tipAmountSel.textContent = `${'--'}`
    totalAmountSel.textContent = `${'--'}`
  } else {
    errorPeopleSel.classList.remove('show')
    inputBoxPeople.classList.remove('error')
  }

  if (people > 0 && billAmount > 0) {
    const tipAmount = billAmount * tipPercentage
    const tipAmountPerPerson = tipAmount / people
    const totalAmount = (billAmount + tipAmount) / people

    tipAmountSel.textContent = `$${tipAmountPerPerson.toFixed(2)}`
    totalAmountSel.textContent = `$${totalAmount.toFixed(2)}`
  }
}

const reset = () => {
  if (!resetBtn.classList.contains('disabled')) {
    tipAmountSel.textContent = `${'--'}`
    totalAmountSel.textContent = `${'--'}`

    tipPercentage = ''
    billAmount = 0
    people = 1

    numPeopleSel.value = people
    inputMoneySel.value = billAmount
    customTipSel.value = tipPercentage

    percentItemSels.forEach((item) => {
      item.classList.remove('clicked')
    })

    resetBtn.classList.add('disabled')
  }
}

inputMoneySel.addEventListener('input', () => updateBill(inputMoneySel.value))
numPeopleSel.addEventListener('input', () => updatePeople(numPeopleSel.value))
tipPercentageSels.forEach((tipSel) => {
  tipSel.addEventListener('change', (e) => handleRadioPercent(e, tipSel.value))
})
customTipSel.addEventListener('input', () => handleCustomTip(customTipSel.value))
resetBtn.addEventListener('click', reset)
