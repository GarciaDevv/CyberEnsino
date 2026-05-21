// Sistema de Badges — CyberAcademy

const BADGES = [
  { id: 'primeiro_acesso',  icone: '🛡️', nome: 'Recrutado',      descricao: 'Fez login pela primeira vez',       condicao: (stats) => stats.totalPartidas >= 1 },
  { id: 'primeiro_acerto',  icone: '🎯', nome: 'Primeira Hit',   descricao: 'Acertou a primeira pergunta',       condicao: (stats) => stats.totalAcertos >= 1 },
  { id: 'velocista',        icone: '⚡', nome: 'Velocista',      descricao: 'Respondeu em menos de 5 segundos',  condicao: (stats) => stats.respostaRapida >= 1 },
  { id: 'perfeito',         icone: '💎', nome: 'Perfeito',       descricao: '10/10 em uma rodada',               condicao: (stats) => stats.pontuacaoPerfeita >= 1 },
  { id: 'consistente',      icone: '🔥', nome: 'Consistente',    descricao: '3 partidas seguidas acima de 70%',  condicao: (stats) => stats.sequenciaboa >= 3 },
  { id: 'especialista',     icone: '🧠', nome: 'Especialista',   descricao: '50 acertos no total',               condicao: (stats) => stats.totalAcertos >= 50 },
  { id: 'veterano',         icone: '⭐', nome: 'Veterano',       descricao: '10 partidas completas',             condicao: (stats) => stats.totalPartidas >= 10 },
  { id: 'hacker_etico',     icone: '🔓', nome: 'Hacker Ético',   descricao: 'Atingiu nível 5',                   condicao: (stats) => stats.nivel >= 5 },
]

function pegarStats(usuario) {
  return {
    totalAcertos:     parseInt(localStorage.getItem('acertos_' + usuario) || '0'),
    totalPartidas:    parseInt(localStorage.getItem('partidas_' + usuario) || '0'),
    respostaRapida:   parseInt(localStorage.getItem('rapidas_' + usuario) || '0'),
    pontuacaoPerfeita: parseInt(localStorage.getItem('perfeitas_' + usuario) || '0'),
    sequenciaboa:     parseInt(localStorage.getItem('sequencia_' + usuario) || '0'),
    nivel:            parseInt(localStorage.getItem('nivel_' + usuario) || '1'),
  }
}

function verificarBadges(usuario) {
  const stats = pegarStats(usuario)
  const badgesAtivos = JSON.parse(localStorage.getItem('badges_' + usuario) || '[]')
  const novos = []

  BADGES.forEach(badge => {
    if (!badgesAtivos.includes(badge.id) && badge.condicao(stats)) {
      badgesAtivos.push(badge.id)
      novos.push(badge)
    }
  })

  localStorage.setItem('badges_' + usuario, JSON.stringify(badgesAtivos))
  return novos
}

function renderizarBadges(usuario, containerId) {
  const container = document.getElementById(containerId)
  if (!container) return

  const badgesAtivos = JSON.parse(localStorage.getItem('badges_' + usuario) || '[]')

  container.innerHTML = BADGES.map(badge => {
    const desbloqueado = badgesAtivos.includes(badge.id)
    return `
      <div class="badge-card ${desbloqueado ? 'unlocked' : 'locked'}" title="${badge.descricao}">
        <div class="badge-icon">${badge.icone}</div>
        <div class="badge-name">${badge.nome}</div>
      </div>
    `
  }).join('')
}

function notificarBadge(badge) {
  // Cria notificação visual de novo badge
  const notif = document.createElement('div')
  notif.style.cssText = `
    position: fixed; top: 80px; right: 20px; z-index: 9999;
    background: var(--panel); border: 1px solid var(--accent2);
    border-radius: 8px; padding: 1rem 1.25rem;
    font-family: var(--mono); font-size: 0.8rem;
    color: var(--accent2); max-width: 250px;
    animation: slideIn 0.3s ease;
    box-shadow: 0 4px 20px rgba(0,255,157,0.15);
  `
  notif.innerHTML = `
    <div style="font-size: 1.5rem; margin-bottom: 4px;">${badge.icone}</div>
    <div style="color: var(--warn); margin-bottom: 2px;">BADGE DESBLOQUEADO!</div>
    <div>${badge.nome}</div>
    <div style="color: var(--text3); font-size: 0.7rem; margin-top: 4px;">${badge.descricao}</div>
  `
  document.body.appendChild(notif)
  setTimeout(() => notif.remove(), 4000)
}