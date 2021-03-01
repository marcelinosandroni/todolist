const todos = document.querySelector(".todos");
const add = document.querySelector(".add-input");
const container = document.querySelector(".todo-container");
const lixeiras = document.querySelectorAll('.bi-trash')

const {log, info, warn, error} = console

let listaDeTodos = []

listaGravada = localStorage.getItem('todos')

if (listaGravada) {
  log(typeof listaGravada)
  listaDeTodos.push(...listaGravada.split(','))
}


const criarTodos = item => {
  log(`criando: ${item}`)
  let lista = document.createElement('li')
  lista.classList.add('todo-item', 'aparecer')

  let p = document.createElement('p')
  p.textContent = item

  let lixeira = document.createElement('i')
  lixeira.classList.add('bi','bi-trash')

  let check = document.createElement('i')
  check.classList.add('bi','bi-check')
  
  lista.appendChild(p)
  lista.appendChild(check)
  lista.appendChild(lixeira)

  todos.appendChild(lista)

  add.placeholder = 'Mais uma?'
}

if (listaDeTodos.length) {
  log(`Achei TODOS gravados, recuperando...`)
  listaDeTodos.forEach(criarTodos)
}

container.addEventListener("click", evento => {
  evento.preventDefault() //não envia o form
  const elementoClicado = evento.target //apelido para o target
  const pai = elementoClicado.parentElement
  const {tagName, classList} = evento.target //descontruct do tagName e class
  
  
  //Se clicar no botao mais e input tiver algum texto
  if((tagName === 'BUTTON' ||
    Array.from(classList).includes('bi-plus')) &&
    add.value) {
  
    criarTodos(add.value)
    
    listaDeTodos.push(add.value)

    localStorage.setItem('todos',listaDeTodos)
    log(`Total de TODOS: ${listaDeTodos.length}`)

    add.value = ''
    add.placeholder = 'Mais uma?'
  }
  
  //Se o elemento clicado for a lixeira...
  if (Array.from(classList).includes('bi-trash')) {
    let listaAtual = pai.querySelector('p')
    
    //pai.classList.remove('aparecer')

    //adiciona na lista a classe excluir para ter efeito do css
    pai.classList.add('excluir')
    
    //evento para quando acabar a animacao do css
    pai.addEventListener('transitionend', evento => {
      //exclui o elemento pai da lixeira
      
      warn(`Terminou a transicao`)
      
      let altura = 60
      let margin = 10
      pai.style.height = '60px'
      pai.innerHTML = ''
      
      const id = setInterval(() => {
        if (altura <= 0) {
          pai.remove()
          clearInterval(id)
        }
        
        altura -= 2

        pai.style.height = altura + 'px'
        
        if (margin > 0) pai.style.margin = --margin + 'px 0'
      }, 15)
    })

    let valor = listaAtual.textContent
    let index = listaDeTodos.indexOf(listaAtual.textContent)
    listaDeTodos.splice(index,1)
    localStorage.setItem('todos',listaDeTodos)
    log(`Removendo TODO numero ${index+1} com conteudo: ${valor}`)
  }
  
  //Se o elemento clicado for o check
  if (Array.from(classList).includes('bi-check')) {
    //adiciona na lista a classe concluido para ter efeito do CSS
    pai.classList.toggle('concluido')
    
  }
})

lixeiras.forEach(lixeira => {
  lixeira.addEventListener('click', evento => {
    //let listaAtual = lixeira.parentElement
    log(`clicou na lixeira`)
    
    lixeira.parentElement.remove()
  })
  
})
