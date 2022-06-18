const windows = {}

const users = {
  '1': { id: '1', name: 'Ksyusha Pohorila' },
  '-1': { id: '-1', name: 'BOT Gorilla' },
}

window.addEventListener('message', (e) => {
  const event = e.data

  if(event.type === 'WINDOW_LOADED') {
    const windowData = Object.entries(windows).find(w => w[1] === e.source)
    if(!windowData) throw new Error('Not existing window!')
    
    const [userId, wnd] = windowData
    wnd.postMessage({ type: 'SET_USER', payload: users[userId] }, '*')
  } else if(event.type === 'NEW_MESSAGE') {
    Object.values(windows)
      .filter(w => w !== e.source)
      .forEach(w => w.postMessage(event, '*'))
  }
})

function init() {
  Object.values(users).forEach(u => {
    if(windows[u.id]) windows[u.id].close()
    windows[u.id] = window.open('./index.html')
  })
}

document.querySelector('button').addEventListener('click', init)
