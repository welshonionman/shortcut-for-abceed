interface PressedKeyStatus {
  [key: string]: boolean;
}
let keysPressed: PressedKeyStatus = {}
document.addEventListener('keydown', (event) => {
  keysPressed[event.key] = true

  if (keysPressed['Shift']) {
    switch (event.code) {
      case 'ArrowLeft':
        clickPrevCommentaryLink()
        break
      case 'ArrowRight':
        clickNextCommentaryLink()
        break
    }
  } else {
    switch (event.code) {
      case 'ArrowLeft':
        clickSoundControllerButton(1)
        break
      case 'ArrowRight':
        clickSoundControllerButton(3)
        break
      case 'ArrowUp':
        changeVoiceSpeedSelectBox(-1)
        break
      case 'ArrowDown':
        changeVoiceSpeedSelectBox(1)
        break
      case 'Space':
        clickSoundControllerButton(2)
        break
    }
  }
})

document.addEventListener('keyup', (event) => {
  delete keysPressed[event.key]
})

function clickSoundControllerButton(index: number) {
  const el = document.getElementsByClassName('sound-controller_item')[index]
  if (el) (el as HTMLElement).click()
}

function changeVoiceSpeedSelectBox(diff: number) {
  const selectEl = document.querySelector('select.playback-rate_select') as HTMLSelectElement
  const options = selectEl.options
  const currentSpeed = (document.getElementsByClassName('current-rate')[0] as HTMLElement).innerText
  const currentIndex = Array.from(options).findIndex(option => Number.parseFloat(option.value) === Number.parseFloat(currentSpeed.replace('×', '')))
  if (currentIndex < 0) return

  const newIndex = currentIndex + diff
  if (newIndex >= 0 && newIndex <= options.length - 1) {
    selectEl.selectedIndex = newIndex
    selectEl.dispatchEvent(new Event('change'))
  }
}


function clickNextCommentaryLink() {
  const el = document.querySelector('.commentary-nav-next')
  if (el) (el as HTMLElement).click()
}

function clickPrevCommentaryLink() {
  const el = document.querySelector('.commentary-nav-prev')
  if (el) (el as HTMLElement).click()
}
