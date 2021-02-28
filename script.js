/*
      <li class="todo-item">
        <p>Lorem, ipsum dolor.</p>
        <i class="bi bi-check"></i> 
        <i class="bi bi-trash"></i>
      </li> 
  */

const todos = document.querySelector(".todos");
const add = document.querySelector(".add-input");
const container = document.querySelector(".todo-container");

container.addEventListener("click", evento => {
  evento.preventDefault() //não envia o form
  const elementoClicado = evento.target
  console.log(elementoClicado.tagName)
  
  
  if(elementoClicado.tagName === 'BUTTON' ||
    elementoClicado.classList[1] === 'bi-plus'

  ) {
  if (!add.value) {
    alert('Escreve no TODO')
    return
    
  }
  
  //criar o elemento p
  //jogar dentro do P o nome do novo todo que esta no input
  //cirar os dois icones
  //criar uma LI que eh o container
  //pegar o P e os dois icones e jogar dentro da LI
  //jogar a LI dentro do container
  
  let lista = document.createElement('li')
  lista.classList.add('todo-item')

  
  //criar p e os dos icones
  let p = document.createElement('p')
  p.textContent = add.value

  let lixeira = document.createElement('i')
  lixeira.classList.add('bi','bi-trash')

  let check = document.createElement('i')
  check.classList.add('bi','bi-check')
  
  lista.appendChild(p)
  lista.appendChild(lixeira)
  lista.appendChild(check)

  container.appendChild(lista)
    

  add.value = ''
  add.setAttribute('placeholder', '')
  }
  
  
})
