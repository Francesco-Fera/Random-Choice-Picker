let choiceArray = []
const textArea = document.querySelector('#choice-input')
const choiceList = document.querySelector('.choice-container')
const tags = document.querySelectorAll('.tag')

const clearButton = document.querySelector('#clear-all-button')
const startButton = document.querySelector('#start-button')

function getValue() {
  choiceArray.push(textArea.value.trim())
  displayValue()
  textArea.value = null
}

textArea.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && textArea.value.trim() !== '') {
      getValue()
    }
})

function displayValue() {
    const newValue = document.createElement('span')
    newValue.classList.add('tag')
    newValue.setAttribute("onclick", "remove(this)");
    newValue.innerText = textArea.value.trim()
    choiceList.appendChild(newValue)
}

function remove(elem) {
  let element = elem
  let toRemove = choiceArray.indexOf(element.innerHTML)
  choiceArray.splice(toRemove, 1)
  element.remove();
}

function clearAll() {
  let allTags = document.querySelectorAll('.tag')
  allTags.forEach(e => e.remove());
  allTags = null
  choiceArray = []
}


function startRandom() {
  let allTags = document.querySelectorAll('.tag')
  const totTime = 30

  const animationInterval = setInterval(() => {
    let randomChoice = pickRandom()

    if (randomChoice !== undefined) {
      addPickedTag(randomChoice)
      setTimeout(() => {
        removePickedTag(randomChoice)
      }, 100)
    }
  }, 100)

  setTimeout(() => {
    clearInterval(animationInterval)

    setTimeout(() => {
      let randomChoice = pickRandom()
      addPickedTag(randomChoice)
    }, 100)
  }, 100 * totTime + 1)
}

function pickRandom() {
  const allTags = document.querySelectorAll('.tag')
  return allTags[Math.floor(Math.random() * allTags.length)]
}


function addPickedTag(nextTag) {
  nextTag.classList.add('picked-tag')
}

function removePickedTag(actualTag) {
  actualTag.classList.remove('picked-tag')
}

clearButton.addEventListener('click', clearAll)
startButton.addEventListener('click', startRandom)
