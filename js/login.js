$.getJSON('../js/usuarios/usuarios.json', function (usuarios) {
  setUsuarios(usuarios);
});

function setUsuarios(usuarios) {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

var crypt = {
  secret: 'CIPHERKEY',

  encrypt: function (clear) {
    var cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
    cipher = cipher.toString();
    return cipher;
  },

  decrypt: function (cipher) {
    var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    return decipher;
  },
};

function login() {
  let user = document.getElementById('email_field').value;
  let pwd = document.getElementById('password_field').value;

  if (user != '' && pwd != '') {
    let listaUsuarios = getUsuarios();

    for (let i = 0; i < listaUsuarios.length; i++) {
      let decrip = crypt.decrypt(listaUsuarios[i].senha);
      if (listaUsuarios[i].email === user && pwd === decrip) {
        localStorage.setItem('usuarioLogado', JSON.stringify(listaUsuarios[i]));
        alert('Login realizado com sucesso');
        window.location.href = 'index.html';
      } else {
        alert('Usuário e/ou senha inválidos!');
      }
    }
  }
}

function getUsuarios() {
  let usuarios = localStorage.getItem('usuarios');
  return JSON.parse(usuarios);
}

function abrirFormRegistrar() {
  document.querySelector('.login-form').style.display = 'none';
  document.querySelector('.register-form').style.display = 'flex';
}

function registrarUsuario() {
  let senha = document.getElementById('senha').value;
  let repetirSenha = document.getElementById('repetirSenha').value;

  if (senha === repetirSenha) {
    let nome = document.getElementById('nomeCompleto').value;
    let cpf = document.getElementById('cpfMask').value;
    let telefone = document.getElementById('telefoneMask').value;
    let email = document.getElementById('email').value;
    let endereco = document.getElementById('endereco').value;
    let complemento = document.getElementById('complemento').value;
    let cep = document.getElementById('cepMask').value;
    let uf = document.getElementById('estado').value;
    let cidade = document.getElementById('cidade').value;
    let bairro = document.getElementById('bairro').value;

    let lista = getUsuarios();
    let proxId = lista[lista.length - 1].id + 1;

    senha = crypt.encrypt(senha);

    const usuarioNovo = {
      id: proxId,
      nome,
      cpf,
      telefone,
      email,
      endereco,
      complemento,
      cep,
      uf,
      cidade,
      bairro,
      senha,
    };

    for (var obj in usuarioNovo) {
      if (usuarioNovo[obj] == '') {
        return false;
      }
    }

    lista.push(usuarioNovo);

    console.log(lista);

    $.ajax({
      type: 'POST',
      url: './usuarios/usuarios.json',
      contentType: 'application/json',
      data: { data: JSON.stringify(lista) },
      success: function () {
        alert('Thanks!');
      },
      failure: function () {
        alert('Error!');
      },
    });
  } else {
    alert('As senhas não batem, favor tente novamente!');
  }
}
