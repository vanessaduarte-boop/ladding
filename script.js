  if(e.target === lightbox) lightbox.style.display = "none";


// Carrinho de Compras
let carrinho = [];

function atualizarCarrinho() {
  const lista = document.getElementById("itens-carrinho");
  const totalEl = document.getElementById("total");
  lista.innerHTML = "";
  let total = 0;
  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item.nome + " - R$ " + item.preco.toFixed(2);
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "X";
    btnRemover.style.marginLeft = "10px";
    btnRemover.onclick = () => {
      carrinho.splice(index, 1);
      atualizarCarrinho();
    };
    li.appendChild(btnRemover);
    lista.appendChild(li);
    total += item.preco;
  });
  totalEl.textContent = total.toFixed(2);
}

function adicionarCarrinho(nome, preco) {
  carrinho.push({nome, preco});
  atualizarCarrinho();
}

// Login e Cadastro (localStorage simples)
function mostrarCadastro() {
  document.getElementById("form-login").style.display = "none";
  document.getElementById("form-cadastro").style.display = "block";
}

function mostrarLogin() {
  document.getElementById("form-login").style.display = "block";
  document.getElementById("form-cadastro").style.display = "none";
}

function fazerCadastro() {
  const nome = document.getElementById("cadastro-nome").value.trim();
  const email = document.getElementById("cadastro-email").value.trim();
  const senha = document.getElementById("cadastro-senha").value;

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos.");
    return;
  }
  
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (usuarios.find(u => u.email === email)) {
    alert("E-mail já cadastrado.");
    return;
  }
  }
  
  const novoUsuario = {nome, email, senha};
  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  
  alert("Cadastro realizado com sucesso! Você já está logado.");
  localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));
  mostrarBemVindo(nome);

  
  usuarios.push({nome, email, senha});
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Cadastro realizado com sucesso!");
  mostrarLogin();


function fazerLogin() {
  const email = document.getElementById("login-email").value.trim();
  const senha = document.getElementById("login-senha").value;

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  let usuario = usuarios.find(u => u.email === email && u.senha === senha);
  
  if (!usuario) {
    alert("E-mail ou senha incorretos.");
    return;
  }
  
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
  mostrarBemVindo(usuario.nome);
}

function mostrarBemVindo(nome) {
  document.getElementById("form-login").style.display = "none";
  document.getElementById("form-cadastro").style.display = "none";
  document.getElementById("bemvindo").style.display = "block";
  document.getElementById("usuario-nome").textContent = nome;
}

function fazerLogout() {
  localStorage.removeItem("usuarioLogado");
  document.getElementById("bemvindo").style.display = "none";
  mostrarLogin();
}

window.onload = () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (usuario) {
    mostrarBemVindo(usuario.nome);
  }
  atualizarCarrinho();
  carregarPainelAdmin();
};

// Painel Administrativo (dados fictícios simples)
function mostrarAba(aba) {
  document.querySelectorAll(".aba-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".conteudo-aba").forEach(c => c.style.display = "none");
  
  document.getElementById(aba).style.display = "block";
  event.target.classList.add("active");
}

function carregarPainelAdmin() {
  // Simular mensagens
  const mensagens = [
    "Gostaria de saber o horário de atendimento.",
    "Tem disponível o produto X?",
    "Quero agendar uma visita."
  ];
  const ulMensagens = document.getElementById("lista-mensagens");
  mensagens.forEach(msg => {
    let li = document.createElement("li");
    li.textContent = msg;
    ulMensagens.appendChild(li);
  });

  // Simular pedidos
  const pedidos = [
    "Pedido #001 - Produto 1 - R$ 25,00",
    "Pedido #002 - Produto 2 - R$ 40,00",
  ];
  const ulPedidos = document.getElementById("lista-pedidos");
  pedidos.forEach(pedido => {
    let li = document.createElement("li");
    li.textContent = pedido;
    ulPedidos.appendChild(li);
  });

  // Usuários cadastrados
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const ulUsuarios = document.getElementById("lista-usuarios");
  ulUsuarios.innerHTML = "";
  usuarios.forEach(u => {
    let li = document.createElement("li");
    li.textContent = u.nome + " (" + u.email + ")";
    ulUsuarios.appendChild(li);
  });
}

// Chat suporte simples
const chatAbrir = document.getElementById("chat-abrir");
const chatFechar = document.getElementById("chat-fechar");
const chatSuporte = document.getElementById("chat-suporte");
const chatMensagens = document.getElementById("chat-mensagens");
const chatInput = document.getElementById("chat-input");
const chatEnviar = document.getElementById("chat-enviar");

chatAbrir.onclick = () => {
  chatSuporte.style.display = "flex";
  chatAbrir.style.display = "none";
};

chatFechar.onclick = () => {
  chatSuporte.style.display = "none";
  chatAbrir.style.display = "block";
};

chatEnviar.onclick = () => {
  enviarMensagem();
};
chatInput.addEventListener("keypress", (e) => {
  if(e.key === "Enter") enviarMensagem();
});

function enviarMensagem() {
  let msg = chatInput.value.trim();
  if(!msg) return;
  
  adicionarMsg("usuario", msg);
  chatInput.value = "";

  // Resposta simulada após 1.5 segundos
  setTimeout(() => {
    adicionarMsg("suporte", "Obrigado pela mensagem! Em breve responderemos.");
  }, 1500);
}

function adicionarMsg(tipo, msg) {
  let div = document.createElement("div");
  div.classList.add(tipo === "usuario" ? "msg-usuario" : "msg-suporte");
  let span = document.createElement("span");
  span.textContent = msg;
  div.appendChild(span);
  chatMensagens.appendChild(div);
  chatMensagens.scrollTop = chatMensagens.scrollHeight;
}
