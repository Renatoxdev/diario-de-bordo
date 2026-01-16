const STORAGE_KEY = "diarioDeBordo:entradas:v1";

const form = document.getElementById("formEntrada");
const inputTitulo = document.getElementById("titulo");
const inputData = document.getElementById("data");
const inputDescricao = document.getElementById("descricao");
const btnLimpar = document.getElementById("btnLimpar");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");
const estadoVazio = document.getElementById("estadoVazio");
const statusEl = document.getElementById("status");
const btnInstalar = document.getElementById("btnInstalar");

let deferredPrompt = null;

function hojeISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function lerEntradas() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function salvarEntradas(entradas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entradas));
}

function ordenarPorDataDesc(a, b) {
  if (a.data === b.data) return b.criadoEm - a.criadoEm;
  return a.data < b.data ? 1 : -1;
}

function setStatus(msg) {
  statusEl.textContent = msg;
  if (!msg) return;
  window.clearTimeout(setStatus._t);
  setStatus._t = window.setTimeout(() => {
    statusEl.textContent = "";
  }, 2500);
}

function formatarDataBR(iso) {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

function criarItem(entrada) {
  const li = document.createElement("li");
  li.className = "item";
  li.dataset.id = entrada.id;

  const top = document.createElement("div");
  top.className = "item__top";

  const info = document.createElement("div");

  const h3 = document.createElement("h3");
  h3.className = "item__title";
  h3.textContent = entrada.titulo;

  const meta = document.createElement("p");
  meta.className = "item__meta";
  meta.textContent = `Data: ${formatarDataBR(entrada.data)}`;

  info.append(h3, meta);

  const actions = document.createElement("div");
  actions.className = "item__actions";

  const btnRemover = document.createElement("button");
  btnRemover.className = "btn btn--danger";
  btnRemover.type = "button";
  btnRemover.textContent = "Remover";
  btnRemover.addEventListener("click", () => removerEntrada(entrada.id));

  actions.append(btnRemover);
  top.append(info, actions);

  const desc = document.createElement("p");
  desc.className = "item__desc";
  desc.textContent = entrada.descricao;

  li.append(top, desc);
  return li;
}

function renderizar() {
  const entradas = lerEntradas().sort(ordenarPorDataDesc);

  lista.innerHTML = "";
  entradas.forEach((e) => lista.append(criarItem(e)));

  contador.textContent = String(entradas.length);
  estadoVazio.hidden = entradas.length > 0;
}

function limparFormulario() {
  inputTitulo.value = "";
  inputDescricao.value = "";
  inputData.value = hojeISO();
  inputTitulo.focus();
}

function adicionarEntrada({ titulo, descricao, data }) {
  const entradas = lerEntradas();

  const entrada = {
    id: uid(),
    titulo: titulo.trim(),
    descricao: descricao.trim(),
    data,
    criadoEm: Date.now()
  };

  entradas.push(entrada);
  salvarEntradas(entradas);
  renderizar();
  setStatus("Entrada adicionada.");
}

function removerEntrada(id) {
  const entradas = lerEntradas();
  const novas = entradas.filter((e) => e.id !== id);
  salvarEntradas(novas);
  renderizar();
  setStatus("Entrada removida.");
}

form.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const titulo = inputTitulo.value;
  const descricao = inputDescricao.value;
  const data = inputData.value;

  if (!titulo.trim() || !descricao.trim() || !data) {
    setStatus("Preencha título, descrição e data.");
    return;
  }

  adicionarEntrada({ titulo, descricao, data });
  limparFormulario();
});

btnLimpar.addEventListener("click", () => {
  limparFormulario();
  setStatus("Formulário limpo.");
});

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  btnInstalar.hidden = false;
});

btnInstalar.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  btnInstalar.hidden = true;
  deferredPrompt.prompt();

  try {
    await deferredPrompt.userChoice;
  } finally {
    deferredPrompt = null;
  }
});

window.addEventListener("appinstalled", () => {
  setStatus("Aplicativo instalado.");
  btnInstalar.hidden = true;
  deferredPrompt = null;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("./service-worker.js");
    } catch {
      setStatus("Não foi possível registrar o Service Worker.");
    }
  });
}

inputData.value = hojeISO();
renderizar();
