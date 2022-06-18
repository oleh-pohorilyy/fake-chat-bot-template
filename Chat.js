class Chat {
  constructor(options) {
    this.user = options.user
    this.server = options.server
    this.input = options.input
    this.buttonSend = options.buttonSend
    this.chat = options.chat

    document.addEventListener('keydown', (event) => {
      if(event.code !== 'Enter') return
    
      this.sendMessage(input.value)
    })

    this.buttonSend.addEventListener('click', (event) => {
      this.sendMessage(input.value)
    })

    window.addEventListener('message', (e) => {
      const event = e.data

      if(event.type === 'SET_USER') {
        this.user = event.payload
        options.onUserConnect(this.user)
      } else if(event.type === 'NEW_MESSAGE') {
        this.onReceiveMessage(event.payload)

        if(this.user.id !== '-1') return
        options.onReceiveMessage(event.payload)
      }
    })

    this.server.postMessage({ type: 'WINDOW_LOADED' }, '*')
  }

  formatTime(date) {
    const hours = date.getHours()
    const minutes = date.getMinutes()
  
    return `${(hours < 10 ? '0' : '') + hours}:${(minutes < 10 ? '0' : '') + minutes}`
  }
  
  createMessage(message) {
    const messageContainer = document.createElement('div')
    messageContainer.className = 'chat__message-container'
    messageContainer.setAttribute('data-sender', message.sender.id === this.user.id ? 'me' : 'companion')
  
    const messageElement = document.createElement('div')
    messageElement.className = 'chat__message-text'
    messageElement.textContent = message.text
  
    const messageTime = document.createElement('div')
    messageTime.className = 'chat__message-time'
    messageTime.textContent = this.formatTime(message.date)
  
    messageContainer.append(messageElement, messageTime)
  
    return messageContainer
  }

  appendMessage(data) {
    const message = this.createMessage(data)
  
    this.chat.append(message)
    this.chat.parentElement.scrollTop = this.chat.parentElement.scrollHeight
  }

  sendMessage(text) {
    if(text.length === 0 || !this.user) return

    const data = { text, date: new Date(), sender: this.user }
    this.appendMessage(data)
    this.server.postMessage({ type: 'NEW_MESSAGE', payload: data }, '*')
    input.value = ''
  }

  onReceiveMessage(data) {
    if(!this.user) return
    
    this.appendMessage(data)
  }
}
