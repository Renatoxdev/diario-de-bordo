# Diário de Bordo (PWA)

Aplicação Web Progressiva (PWA) chamada **Diário de Bordo**, feita para registrar atividades diárias com **persistência local**, funcionamento **offline** e possibilidade de **instalação na tela inicial** (Android/desktop).

## Funcionalidades

- Criar entradas com **título**, **descrição** e **data**
- Listar entradas já registradas
- Remover entradas
- Persistência com **localStorage** (os dados permanecem mesmo fechando o navegador)
- Suporte **offline** via **Service Worker**
- **Instalável** (captura do evento `beforeinstallprompt` e botão “Instalar” quando disponível)
- Interface **responsiva** (mobile e desktop)

## Tecnologias utilizadas

- **HTML5** (estrutura)
- **CSS3** (estilização e responsividade)
- **JavaScript (Vanilla)** (lógica da aplicação)
- **localStorage** (persistência de dados)
- **Web App Manifest** (`manifest.json`) para configuração de PWA
- **Service Worker** (`service-worker.js`) para cache e modo offline

## Estrutura do projeto

/
├─ index.html
├─ style.css
├─ script.js
├─ manifest.json
├─ service-worker.js
└─ icons/
├─ icon-192.png
└─ icon-512.png


## Como executar

> Importante: para o Service Worker funcionar corretamente, rode com um servidor local (não use `file://`).

### Opção 1) VS Code (Live Server)
1. Abra a pasta do projeto no VS Code
2. Instale a extensão **Live Server**
3. Clique em **Go Live**

### Opção 2) Node (serve)
1. No terminal, dentro da pasta do projeto:
   ```bash
   npx serve .
Abra o endereço informado no terminal (ex.: http://localhost:3000)

Como usar a aplicação
Preencha Título, Data e Descrição

Clique em Adicionar

As entradas aparecerão na lista

Para excluir uma entrada, clique em Remover

As entradas ficam salvas no navegador via localStorage

Instalação (PWA)
Em navegadores compatíveis, um botão Instalar aparece no topo quando o evento beforeinstallprompt é disparado.

Alternativamente, você pode instalar pelo menu do navegador:

Chrome/Edge (Desktop): menu ⋮ → Instalar app

Android (Chrome): menu ⋮ → Adicionar à tela inicial

Teste offline
Abra o DevTools (F12)

Aba Application → Service Workers (verifique se está registrado/ativo)

Aba Network → marque Offline

Recarregue a página: o app deve continuar abrindo e mostrando as entradas salvas

Auditoria com Lighthouse
No Chrome DevTools:

Aba Lighthouse

Selecione Progressive Web App

Execute a auditoria para verificar requisitos de PWA (manifest, service worker, offline, etc.)

Observações
Os dados são armazenados localmente no navegador (não há back-end).

Se você limpar os dados do site no navegador, as entradas serão apagadas.

Licença
Este projeto pode ser utilizado para fins educacionais.

