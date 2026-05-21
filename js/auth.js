// Autenticação — CyberAcademy

function logar() {
  const usuario = document.getElementById('username').value.trim()
  const errorEl = document.getElementById('error-msg')

  // Corrrigido: era "lenght" (typo) e "localStorage;setItem" (ponto e vírgula errado)
  if (usuario.length < 3) {
    errorEl.textContent = '> Nome muito curto. Mínimo 3 caracteres.'
    errorEl.classList.add('show')
    return
  }

  // Salva usuário e inicializa pontos se novo
  localStorage.setItem('usuario', usuario)

  if (!localStorage.getItem('pontos_' + usuario)) {
    localStorage.setItem('pontos_' + usuario, '0')
    localStorage.setItem('nivel_' + usuario, '1')
    localStorage.setItem('badges_' + usuario, JSON.stringify([]))
    localStorage.setItem('historico_' + usuario, JSON.stringify([]))
  }

  window.location.href = 'index.html'
}

function sair() {
  localStorage.removeItem('usuario')
  window.location.href = 'login.html'
}

// Protege páginas que precisam de login
function verificarLogin() {
  const usuario = localStorage.getItem('usuario')
  if (!usuario) {
    window.location.href = 'login.html'
    return null
  }
  return usuario
}

// Permite pressionar Enter no input
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('username')
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') logar()
    })
  }
})