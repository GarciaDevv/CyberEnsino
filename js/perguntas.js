// Banco de perguntas — CyberAcademy

const perguntas = [
  {
    categoria: 'Phishing',
    dificuldade: 'facil',
    pergunta: 'O que é phishing?',
    opcoes: [
      'Ataque de engenharia social para roubar dados',
      'Tipo de antivírus',
      'Protocolo de firewall',
      'Banco de dados criptografado'
    ],
    respostaCorreta: 0,
    explicacao: 'Phishing é um ataque onde o criminoso se passa por entidade confiável para roubar dados como senhas e cartões.'
  },
  {
    categoria: 'Redes',
    dificuldade: 'medio',
    // Corrigido: "autamaticamente" → "automaticamente"
    pergunta: 'O que o protocolo DHCP faz?',
    opcoes: [
      'Criptografa os dados da rede',
      'Distribui endereços IP automaticamente',
      'Remove vírus da rede',
      'Bloqueia hackers no roteador'
    ],
    respostaCorreta: 1,
    explicacao: 'DHCP (Dynamic Host Configuration Protocol) atribui endereços IP automaticamente aos dispositivos na rede.'
  },
  {
    categoria: 'Criptografia',
    dificuldade: 'medio',
    pergunta: 'O que é criptografia de ponta a ponta?',
    opcoes: [
      'Criptografia apenas no servidor',
      'Somente o remetente e o destinatário conseguem ler a mensagem',
      'Bloqueio de vírus em e-mails',
      'Protocolo de backup de dados'
    ],
    respostaCorreta: 1,
    explicacao: 'Criptografia de ponta a ponta garante que apenas remetente e destinatário possam ler as mensagens — nem mesmo o servidor intermediário.'
  },
  {
    categoria: 'Senhas',
    dificuldade: 'facil',
    pergunta: 'Qual das opções abaixo é a senha mais segura?',
    opcoes: [
      '123456',
      'senha2024',
      'T#9kLm!2vQ@w',
      'meuaniversario'
    ],
    respostaCorreta: 2,
    explicacao: 'Senhas fortes combinam letras maiúsculas, minúsculas, números e símbolos, com comprimento mínimo de 12 caracteres.'
  },
  {
    categoria: 'Malware',
    dificuldade: 'medio',
    pergunta: 'O que é um ransomware?',
    opcoes: [
      'Um tipo de antivírus pago',
      'Software que monitora o tráfego de rede',
      'Malware que criptografa arquivos e exige resgate',
      'Protocolo de segurança para servidores'
    ],
    respostaCorreta: 2,
    explicacao: 'Ransomware é um malware que sequestra seus arquivos criptografando-os e exige pagamento (ransom = resgate) para devolvê-los.'
  },
  {
    categoria: 'Redes',
    dificuldade: 'facil',
    pergunta: 'O que é um firewall?',
    opcoes: [
      'Antivírus para dispositivos móveis',
      'Sistema que monitora e filtra o tráfego de rede',
      'Protocolo de criptografia de disco',
      'Software de backup automático'
    ],
    respostaCorreta: 1,
    explicacao: 'Firewall é um sistema de segurança que monitora e controla o tráfego de rede com base em regras predefinidas.'
  },
  {
    categoria: 'Phishing',
    dificuldade: 'dificil',
    pergunta: 'Qual técnica de phishing usa chamadas de voz ao invés de e-mails?',
    opcoes: [
      'Spear phishing',
      'Smishing',
      'Vishing',
      'Whaling'
    ],
    respostaCorreta: 2,
    explicacao: 'Vishing (voice phishing) usa chamadas telefônicas para enganar vítimas. Smishing usa SMS, Spear phishing é direcionado, e Whaling mira executivos.'
  },
  {
    categoria: 'Criptografia',
    dificuldade: 'dificil',
    pergunta: 'O que diferencia algoritmos simétricos de assimétricos?',
    opcoes: [
      'Simétrico usa duas chaves diferentes; assimétrico usa uma só',
      'Simétrico usa uma chave compartilhada; assimétrico usa par de chaves pública/privada',
      'Assimétrico é mais rápido que simétrico',
      'Simétrico só funciona em redes locais'
    ],
    respostaCorreta: 1,
    explicacao: 'Criptografia simétrica usa a mesma chave para cifrar e decifrar. Assimétrica usa um par: chave pública (cifrar) e privada (decifrar).'
  },
  {
    categoria: 'Malware',
    dificuldade: 'facil',
    pergunta: 'O que faz um keylogger?',
    opcoes: [
      'Acelerador de teclado para gamers',
      'Registra todas as teclas digitadas pelo usuário',
      'Remove vírus do teclado',
      'Criptografa as entradas do teclado'
    ],
    respostaCorreta: 1,
    explicacao: 'Keylogger é um malware que registra secretamente tudo que o usuário digita, capturando senhas e dados sensíveis.'
  },
  {
    categoria: 'Redes',
    dificuldade: 'dificil',
    pergunta: 'O que é um ataque Man-in-the-Middle (MitM)?',
    opcoes: [
      'Ataque que sobrecarrega um servidor com requisições',
      'Invasão física ao datacenter',
      'Interceptação de comunicação entre duas partes sem que saibam',
      'Técnica de força bruta em senhas'
    ],
    respostaCorreta: 2,
    explicacao: 'MitM ocorre quando um atacante se posiciona entre duas partes que se comunicam, podendo interceptar, ler e até modificar os dados.'
  }
]