'use strict'

const inputMoneySel = document.querySelector('.bill-input')
const numPeopleSel = document.querySelector('.num-people-input')
const tipPercentageSels = document.querySelectorAll('.percent-item__radio')
const percentItemSels = document.querySelectorAll('.percent-item')

const resetBtn = document.querySelector('#reset-btn')

let tipPercentage = ''
let billAmount = 0
let people = 0

const updateBill = (money) => {
  billAmount = +money
}

const updatePeople = (numPeople) => {
  people = +numPeople
}

const updateTipPercentage = (tipValue) => {
  tipPercentage = +tipValue / 100
}

const handleRadioPercent = (e, tipValue) => {
  updateTipPercentage(tipValue)

  percentItemSels.forEach((item) => {
    item.classList.remove('clicked')
  })

  e.target.parentElement.classList.add('clicked')
}

inputMoneySel.addEventListener('input', () => updateBill(inputMoneySel.value))
numPeopleSel.addEventListener('input', () => updatePeople(numPeopleSel.value))
tipPercentageSels.forEach((tipSel) => {
  tipSel.addEventListener('change', (e) => handleRadioPercent(e, tipSel.value))
})
