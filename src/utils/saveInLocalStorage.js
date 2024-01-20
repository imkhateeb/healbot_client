const saveInLocalStorage = (text, response) => {
  const chatsArray = !localStorage.getItem('chats') ? [] : JSON.parse(localStorage.getItem('chats'));

  // Push the new chat to the chatsArray
  chatsArray.push({ text, response });

  // Save the updated chatsArray back to localStorage
  localStorage.setItem('chats', JSON.stringify(chatsArray));

  window.location.reload();

}

export default saveInLocalStorage;