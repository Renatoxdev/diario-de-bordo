# Diário de Bordo (PWA) — Otimização de Performance

Este repositório contém o **Diário de Bordo**, um PWA simples (HTML/CSS/JS) com funcionamento offline, instalação e persistência local.  
Nesta entrega, foram aplicadas **melhorias de performance** baseadas em métricas do **Lighthouse** (antes/depois), com foco em reduzir bytes transferidos, melhorar carregamento e manter estabilidade.

---

## 1) Sobre o projeto

**Funcionalidades**
- Criar entradas com **título**, **descrição** e **data**
- Listar entradas salvas
- Remover entradas
- Persistência com **localStorage**
- Suporte **offline** com **Service Worker**
- Instalação (PWA) com `manifest.json` e evento `beforeinstallprompt`

**Tecnologias**
- HTML5, CSS3, JavaScript (Vanilla)
- Web App Manifest (`manifest.json`)
- Service Worker (`service-worker.js`)
- Lighthouse (Chrome DevTools) para medição

---

## 2) Evidências (Lighthouse)

Os relatórios foram salvos em `docs/`:

**Antes**
- `docs/lighthouse-antes-mobile.html`
- `docs/lighthouse-antes-desktop.html`

**Depois**
- `docs/lighthouse-depois-mobile.html`
- `docs/lighthouse-depois-desktop.html`

> Observação: para relatórios mais “limpos”, recomenda-se rodar o Lighthouse em janela anônima (ou com extensões desativadas), evitando interferências de extensões do Chrome.

---

## 3) Gargalos identificados (antes)

Mesmo com o projeto já sendo leve, foram identificadas oportunidades típicas de otimização para melhorar entrega e eficiência:

- **Arquivos não minificados** (HTML/CSS/JS) — bytes extras transferidos.
- **Otimização de imagens** — ícones PNG do PWA e imagens/prints usados na documentação.
- **Código não utilizado** — pequenos trechos/estilos que poderiam ser removidos para reduzir manutenção e peso.

---

## 4) Melhorias aplicadas (depois)

### 4.1 Minificação de HTML/CSS/JS
Foi criado um processo de build para gerar uma versão otimizada em `dist/`:
- `index.html` minificado
- `style.css` minificado
- `script.js` minificado
- `service-worker.js` minificado
- cópia de `manifest.json` e `icons/` para `dist/`

Ferramentas usadas:
- `esbuild` (minificação de CSS/JS/SW)
- `html-minifier-terser` (minificação do HTML)

### 4.2 Otimização de imagens (ícones e documentação)
Foi implementado um script de otimização com `sharp`:
- Regrava os PNG de `icons/` com compressão
- Gera versões `.webp` (úteis para prints do README, se aplicável)

### 4.3 Remoção de código não utilizado
- Remoção de elementos/estilos claramente não utilizados (limpeza para reduzir peso e melhorar manutenção).
- Revisão geral para evitar redundâncias.

### 4.4 Dependências enxutas
O app permanece em **Vanilla JS**, evitando bibliotecas grandes e reduzindo tempo de parsing/execução.

---

## 5) Comparativo (antes vs depois)

Preencha aqui com os números do seu Lighthouse:

**Mobile**
- Antes: Performance __/100
- Depois: Performance __/100

**Desktop**
- Antes: Performance __/100
- Depois: Performance __/100

**Principais impactos observados**
- Redução de bytes transferidos com **minificação**
- Melhor eficiência de assets com **compressão de imagens**
- Projeto mais simples de manter com **limpeza de código**

---

## 6) Como executar (modo normal)

> Importante: Service Worker funciona corretamente apenas em servidor (não use `file://`).

Opções:
- VS Code (Live Server)
- `npx serve .`

---

## 7) Como executar a versão otimizada (dist)

### Pré-requisitos
- Node.js instalado

### Passo a passo
1. Instalar dependências:
   - `npm install`

2. Otimizar imagens (ícones):
   - `npm run images:opt`

3. Gerar a build minificada:
   - `npm run build`

4. Servir a pasta otimizada:
   - `npm run serve:dist`

A versão otimizada fica disponível em `dist/`.

---

## 8) Estrutura do projeto

```
/
├─ index.html
├─ style.css
├─ script.js
├─ manifest.json
├─ service-worker.js
├─ icons/
├─ docs/
├─ dist/
├─ package.json
├─ build.mjs
└─ images-opt.mjs
```

---

## 9) Checklist de entrega

- [ ] Repositório público no GitHub
- [ ] Código-fonte do projeto
- [ ] Relatórios “antes” e “depois” em `docs/` (HTML e/ou prints)
- [ ] README com gargalos, melhorias e comparativo
