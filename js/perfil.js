// Perfil — CyberAcademy

window.onload = () => {
  const usuario = verificarLogin()
  if (!usuario) return

  renderizarPerfil(usuario)
  renderizarBadges(usuario, 'badges-container')
}

function renderizarPerfil(usuario) {
  const pontos   = parseInt(localStorage.getItem('pontos_' + usuario) || '0')
  const nivel    = parseInt(localStorage.getItem('nivel_' + usuario) || '1')
  const acertos  = parseInt(localStorage.getItem('acertos_' + usuario) || '0')
  const partidas = parseInt(localStorage.getItem('partidas_' + usuario) || '0')
  const badges   = JSON.parse(localStorage.getItem('badges_' + usuario) || '[]')

  const ptsParaProximo = nivel * 500
  const ptsNivelAtual  = (nivel - 1) * 500
  const progresso      = pontos - ptsNivelAtual
  const range          = ptsParaProximo - ptsNivelAtual
  const pct            = Math.min(100, Math.round((progresso / range) * 100))

  // Preenche campos
  document.getElementById('nome-usuario').textContent = usuario
  document.getElementById('nivel-num').textContent    = nivel
  document.getElementById('pontos-total').textContent = pontos.toLocaleString()
  document.getElementById('partidas-total').textContent = partidas
  document.getElementById('acertos-total').textContent  = acertos
  document.getElementById('badges-total').textContent   = badges.length

  // Avatar com inicial
  document.getElementById('avatar-inicial').textContent = usuario[0].toUpperCase()

  // XP bar
  document.getElementById('xp-fill').style.width = pct + '%'
  document.getElementById('xp-atual').textContent = progresso
  document.getElementById('xp-prox').textContent  = range

  // Taxa de acerto
  const taxa = partidas > 0 ? Math.round((acertos / (partidas * 10)) * 100) : 0
  document.getElementById('taxa-acerto').textContent = taxa + '%'
}