// Timer — CyberAcademy

class Timer {
  constructor({ segundos = 30, onTick, onExpire }) {
    this.total     = segundos
    this.restante  = segundos
    this.onTick    = onTick
    this.onExpire  = onExpire
    this.intervalo = null
    this.rodando   = false
  }

  iniciar() {
    if (this.rodando) return
    this.rodando = true

    this.intervalo = setInterval(() => {
      this.restante--

      if (this.onTick) this.onTick(this.restante, this.total)

      if (this.restante <= 0) {
        this.parar()
        if (this.onExpire) this.onExpire()
      }
    }, 1000)
  }

  parar() {
    clearInterval(this.intervalo)
    this.rodando = false
  }

  resetar(novosTempo) {
    this.parar()
    if (novosTempo) this.total = novosTempo
    this.restante = this.total
    if (this.onTick) this.onTick(this.restante, this.total)
  }

  get porcentagem() {
    return (this.restante / this.total) * 100
  }
}

// Atualiza UI do timer
function atualizarTimerUI(restante, total) {
  const display  = document.getElementById('timer-display')
  const barFill  = document.getElementById('timer-bar-fill')
  if (!display) return

  display.textContent = restante

  const pct = (restante / total) * 100
  if (barFill) {
    barFill.style.width = pct + '%'
    barFill.style.background =
      pct > 50 ? 'var(--accent)' :
      pct > 25 ? 'var(--warn)' :
      'var(--danger)'
  }

  display.className = ''
  if (restante <= 10) display.classList.add('danger')
  else if (restante <= 20) display.classList.add('warn')
}