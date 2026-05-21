// Quiz principal — CyberAcademy

let perguntaAtual = 0      // era "pergutaAtual" (faltava o 'n')
let pontuacao     = 0
let acertos       = 0
let tempoPorPergunta = 30
let quizAtivo        = false
let timerInstancia   = null  // era "timerInstacia" (faltava o 'n')
let tempoResposta    = 0
const somAcerto = new Audio('assets/sounds/acerto.mp3')
const somErro = new Audio('assets/sounds/erro.mp3')

function embaralhar(arr) {
  const copia = [...arr]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

let perguntasDaRodada = []

function iniciarQuiz() {    // era "inicializarQuiz" — nome diferente do chamado no window.onload
  const usuario = verificarLogin()
  if (!usuario) return

  perguntasDaRodada = embaralhar(perguntas).slice(0, 10)
  perguntaAtual = 0
  pontuacao     = 0
  acertos       = 0
  quizAtivo     = true

  document.getElementById('resultado').classList.remove('show')
  document.getElementById('quiz-area').style.display = 'block'

  carregarPergunta()
}

function carregarPergunta() {
  const pergunta = perguntasDaRodada[perguntaAtual]

  document.getElementById('prog-atual').textContent = perguntaAtual + 1
  document.getElementById('prog-total').textContent = perguntasDaRodada.length
  document.getElementById('score-mini').textContent = pontuacao

  document.getElementById('badge-cat').textContent = pergunta.categoria
  document.getElementById('badge-dif').className   = 'badge badge-' + dificuldadeClasse(pergunta.dificuldade)
  document.getElementById('badge-dif').textContent = pergunta.dificuldade

  document.getElementById('pergunta-texto').textContent = pergunta.pergunta  // era 'pergunta-text0' (zero)

  const opcoesBox = document.getElementById('opcoes')
  opcoesBox.innerHTML = ''

  pergunta.opcoes.forEach((opcao, indice) => {
    const botao = document.createElement('button')
    botao.className   = 'opcao-btn'
    botao.textContent = opcao
    botao.onclick     = () => responder(indice)
    opcoesBox.appendChild(botao)
  })

  document.getElementById('feedback').classList.remove('show', 'acerto', 'erro')
  document.getElementById('btn-proximo').parentElement.classList.remove('show')

  if (timerInstancia) timerInstancia.parar()
  tempoResposta = tempoPorPergunta

  timerInstancia = new Timer({    // era "new timerInstacia" — o correto é "new Timer" (nome da classe)
    segundos: tempoPorPergunta,
    onTick: (r, t) => {           // era "ontick" (minúsculo) — o correto é "onTick"
      atualizarTimerUI(r, t)
      tempoResposta = r
    },
    onExpire: () => {
      if (quizAtivo) timeoutPergunta()
    }
  })

  timerInstancia.iniciar()
}

function dificuldadeClasse(d) {
  if (d === 'facil')   return 'easy'
  if (d === 'medio')   return 'medium'
  if (d === 'dificil') return 'hard'
  return 'easy'
}

function responder(indiceSelecionado) {
  if (!quizAtivo) return
  timerInstancia.parar()

  const pergunta   = perguntasDaRodada[perguntaAtual]
  const botoes     = document.querySelectorAll('.opcao-btn')
  const feedback   = document.getElementById('feedback')
  const usuario    = localStorage.getItem('usuario')
  const tempoUsado = tempoPorPergunta - tempoResposta

  botoes.forEach(b => b.disabled = true)

  if (indiceSelecionado === pergunta.respostaCorreta) {
    botoes[indiceSelecionado].classList.add('correta')
    somAcerto.play()

    const bonus = Math.floor((tempoResposta / tempoPorPergunta) * 50)
    const pts   = 100 + bonus
    pontuacao += pts
    acertos++

    feedback.className = 'feedback-box show acerto'
    feedback.innerHTML = `✓ Correto! +${pts} pts &nbsp;|&nbsp; ${pergunta.explicacao}`

    if (tempoUsado < 5) {
      const rapidas = parseInt(localStorage.getItem('rapidas_' + usuario) || '0')
      localStorage.setItem('rapidas_' + usuario, rapidas + 1)
    }
  } else {
    botoes[indiceSelecionado].classList.add('errada')
    botoes[pergunta.respostaCorreta].classList.add('correta')
    somErro.play()
    feedback.className = 'feedback-box show erro'
    feedback.innerHTML = `✗ Incorreto &nbsp;|&nbsp; ${pergunta.explicacao}`
  }

  document.getElementById('btn-proximo').parentElement.classList.add('show')
}

function timeoutPergunta() {
  const pergunta = perguntasDaRodada[perguntaAtual]
  const botoes   = document.querySelectorAll('.opcao-btn')
  const feedback = document.getElementById('feedback')

  botoes.forEach(b => b.disabled = true)
  botoes[pergunta.respostaCorreta].classList.add('correta')

  feedback.className = 'feedback-box show erro'
  feedback.innerHTML = `⏱ Tempo esgotado! &nbsp;|&nbsp; ${pergunta.explicacao}`

  document.getElementById('btn-proximo').parentElement.classList.add('show')
}

function proximaPergunta() {
  perguntaAtual++
  if (perguntaAtual < perguntasDaRodada.length) {
    carregarPergunta()
  } else {
    finalizarQuiz()
  }
}

function finalizarQuiz() {
  quizAtivo = false
  if (timerInstancia) timerInstancia.parar()

  const usuario = localStorage.getItem('usuario')
  const total   = perguntasDaRodada.length
  const pct     = Math.round((acertos / total) * 100)

  const pontosAtuais = parseInt(localStorage.getItem('pontos_' + usuario) || '0')
  const novoTotal    = pontosAtuais + pontuacao
  localStorage.setItem('pontos_' + usuario, novoTotal)

  const acertosAcumulados = parseInt(localStorage.getItem('acertos_' + usuario) || '0')
  localStorage.setItem('acertos_' + usuario, acertosAcumulados + acertos)

  const partidas = parseInt(localStorage.getItem('partidas_' + usuario) || '0') + 1
  localStorage.setItem('partidas_' + usuario, partidas)

  if (pct >= 70) {
    const seq = parseInt(localStorage.getItem('sequencia_' + usuario) || '0')
    localStorage.setItem('sequencia_' + usuario, seq + 1)
  } else {
    localStorage.setItem('sequencia_' + usuario, '0')
  }

  if (acertos === total) {
    const perfeitas = parseInt(localStorage.getItem('perfeitas_' + usuario) || '0')
    localStorage.setItem('perfeitas_' + usuario, perfeitas + 1)
  }

  const nivel = Math.floor(novoTotal / 500) + 1
  localStorage.setItem('nivel_' + usuario, nivel)

  salvarRanking(usuario, novoTotal, nivel)

  const novosBadges = verificarBadges(usuario)
  novosBadges.forEach(b => notificarBadge(b))

  document.getElementById('quiz-area').style.display = 'none'
  document.getElementById('resultado').classList.add('show')

  document.getElementById('res-acertos').textContent   = acertos
  document.getElementById('res-pontos').textContent    = pontuacao
  document.getElementById('res-pct').textContent       = pct + '%'
  document.getElementById('res-score-big').textContent = pontuacao

  const msg = pct >= 90 ? '🔥 Excelente! Você é um profissional de segurança!' :
              pct >= 70 ? '👍 Bom trabalho! Continue praticando.' :
              pct >= 50 ? '📚 Ainda há bastante pra aprender. Tente de novo!' :
              '💡 Não desanime! A segurança se aprende com prática.'

  document.getElementById('res-msg').textContent = msg

  atualizarTimerUI(30, 30)
}

function salvarRanking(usuario, pontos, nivel) {
  const ranking = JSON.parse(localStorage.getItem('ranking_global') || '[]')
  const idx     = ranking.findIndex(r => r.usuario === usuario)

  if (idx >= 0) {
    ranking[idx].pontos = pontos
    ranking[idx].nivel  = nivel
  } else {
    ranking.push({ usuario, pontos, nivel })
  }

  ranking.sort((a, b) => b.pontos - a.pontos)
  localStorage.setItem('ranking_global', JSON.stringify(ranking))
}

window.onload = () => {
  verificarLogin()
  iniciarQuiz()   // chama iniciarQuiz — precisa ter o mesmo nome da função definida acima
}