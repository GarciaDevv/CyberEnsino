// Ranking — CyberAcademy

window.onload = () => {
  verificarLogin()
  renderizarRanking()
}

function renderizarRanking() {
  const usuario = localStorage.getItem('usuario')
  const ranking = JSON.parse(localStorage.getItem('ranking_global') || '[]')

  // Se não há dados, cria dados de demonstração
  if (ranking.length === 0) {
    const demo = [
      { usuario: 'HackerElite', pontos: 4850, nivel: 10 },
      { usuario: 'CyberNinja',  pontos: 3200, nivel: 7  },
      { usuario: 'NetDefender', pontos: 2750, nivel: 6  },
      { usuario: 'CodeBreaker', pontos: 1900, nivel: 4  },
    ]
    if (usuario) {
      const pts = parseInt(localStorage.getItem('pontos_' + usuario) || '0')
      const lvl = parseInt(localStorage.getItem('nivel_' + usuario) || '1')
      demo.push({ usuario, pontos: pts, nivel: lvl })
    }
    demo.sort((a, b) => b.pontos - a.pontos)
    renderLista(demo, usuario)
    return
  }

  renderLista(ranking, usuario)
}

function renderLista(ranking, usuarioAtual) {
  const container = document.getElementById('ranking-lista')
  if (!container) return

  const iconesPodio = ['🥇', '🥈', '🥉']

  container.innerHTML = ranking.map((item, idx) => {
    const pos = idx + 1
    const ehEu = item.usuario === usuarioAtual
    const posClass = pos <= 3 ? `top${pos}` : ''
    const posContent = pos <= 3 ? iconesPodio[pos - 1] : `#${pos}`

    return `
      <div class="ranking-item ${ehEu ? 'meu-item' : ''}">
        <div class="ranking-pos ${posClass}">${posContent}</div>
        <div class="ranking-name ${ehEu ? 'eu' : ''}">${item.usuario} ${ehEu ? '<span style="font-size:0.7rem;color:var(--text3);font-family:var(--mono);">(você)</span>' : ''}</div>
        <div class="ranking-pts">${item.pontos.toLocaleString()} pts</div>
        <div class="ranking-lvl">LVL ${item.nivel}</div>
      </div>
    `
  }).join('')

  // Destaca posição do usuário atual
  if (usuarioAtual) {
    const minhaPos = ranking.findIndex(r => r.usuario === usuarioAtual) + 1
    if (minhaPos > 0) {
      document.getElementById('minha-pos').textContent = `#${minhaPos}`
    }
  }
}