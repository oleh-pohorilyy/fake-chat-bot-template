// Поле ввода
const input = document.querySelector('.input > input[type="text"]')
// Кнопка отправки
const buttonSend = document.querySelector('#button-send')
// Контейнер чата
const chatContainer = document.querySelector('.content__chat')
// Статус
const statusBar = document.querySelector('.content__profile')

const chat = new Chat({
  server: window.opener,
  input: input,
  buttonSend: buttonSend,
  onUserConnect: (user) => {
    statusBar.querySelector('.profile__name').textContent = user.name
  },
  onReceiveMessage: onReceiveMessage,
  chat: chatContainer
})

/*
  MESSAGE {
    user {
      id : string
      name : string
    }
    text : string
    date : Date
  }
*/

// Функция которая вызывается когда бот получает сообщение
function onReceiveMessage(message) {
  const user = message.sender // Юзер
  const text = message.text // Текст сообщения
  const date = message.date // Дата отправки

  const userName = user.name // Имя юзера
  const userId = user.id // Айди юзера

  // Отправить смс
  if(text === 'привет') chat.sendMessage(`Здарова, ${user.name}!`)
  else if(text === 'баланс') chat.sendMessage(`${user.name}, твой баланс - ${Math.random() * 2000}$!`)
  else if(Number(text) === 2022) chat.sendMessage('Это текущий год!');
}
