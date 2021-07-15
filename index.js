'use strict'

const inputMoneySel = document.querySelector('.bill-input')
const numPeopleSel = document.querySelector('.num-people-input')
const tipAmountSel = document.querySelector('#tip-amount')
const totalAmountSel = document.querySelector('#total-amount')
const tipPercentageSels = document.querySelectorAll('.percent-item__radio')
const percentItemSels = document.querySelectorAll('.percent-item')
const customTipSel = document.querySelector('.custom-tip-input')

const resetBtn = document.querySelector('#reset-btn')

let tipPercentage = ''
let billAmount = 0
let people = 0

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
  if (people > 0 && billAmount > 0) {
    const tipAmount = billAmount * tipPercentage
    const totalAmount = (billAmount + tipAmount) / people

    tipAmountSel.textContent = `$${tipAmount.toFixed(2)}`
    totalAmountSel.textContent = `$${totalAmount.toFixed(2)}`
  }
}

inputMoneySel.addEventListener('input', () => updateBill(inputMoneySel.value))
numPeopleSel.addEventListener('input', () => updatePeople(numPeopleSel.value))
tipPercentageSels.forEach((tipSel) => {
  tipSel.addEventListener('change', (e) => handleRadioPercent(e, tipSel.value))
})

customTipSel.addEventListener('input', () => handleCustomTip(customTipSel.value))
