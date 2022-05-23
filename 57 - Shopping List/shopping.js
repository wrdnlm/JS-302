const formHook = document.querySelector('.shopping');
const listHook = document.querySelector('.list');
let items = JSON.parse(localStorage.getItem('items')) || [];

function logLocal() {
  console.log(localStorage.getItem('items'));
  console.log(items)
}

formHook.addEventListener('submit', e => {
  e.preventDefault();

  let fields = [...e.currentTarget.elements];
  let item;

  fields.forEach(field => {
    if (field.tagName === 'INPUT') {
      item = {
        name: field.value,
        id: Math.floor(Math.random() * 1000),
        checked: false
      }
      items.push(item);
    }
  });

  localStorage.setItem('items', JSON.stringify(items));
  e.target.reset();

  listHook.dispatchEvent(new CustomEvent('itemsUpdate'));
});

function renderList() {
  const template = items.map(item => {
    return `
    <li class="shopping-item">
      <input value="${item.id}" type="checkbox" ${item.checked ? 'checked' : ''}>
      <span class="itemName">${item.name}</<span>
      <button aria-label="Remove item" value="${item.id}">X</button>
    </li>
    `;
  }).join('');
  listHook.innerHTML = template;
}

function updateLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}
renderList();

listHook.addEventListener('itemsUpdate', renderList);
listHook.addEventListener('itemsUpdate', updateLocalStorage);
listHook.addEventListener('click', e => {
  const itemId = +e.target.value;
  
  if (e.target.matches('input[type="checkbox"]')) {
    const itemSearch = items.find(item => item.id === itemId);
    console.log(itemSearch)
    itemSearch.checked = !itemSearch.checked;
    listHook.dispatchEvent(new CustomEvent('itemsUpdate'));
  }

  if (e.target.matches('button')) {
    items = items.filter(item => item.id !== itemId);
    listHook.dispatchEvent(new CustomEvent('itemsUpdate'));
  }
});