import Swal from 'sweetalert2';

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'O campo de email está vazio.',
    });
    return false;
  }

  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Por favor, insira um email válido.',
    });
    return false;
  }

  Swal.fire({
    icon: 'success',
    title: 'Sucesso',
    text: 'O email é válido.',
  });
  return true;
}

export function validatePassword(password) {
  if (!password) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'O campo de senha está vazio.',
    });
    return false;
  }

  if (password.length < 6) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'A senha deve ter pelo menos 6 caracteres.',
    });
    return false;
  }

  Swal.fire({
    icon: 'success',
    title: 'Sucesso',
    text: 'A senha é válida.',
  });
  return true;
}

export function validatePasswordLogin(password) {
  if (!password) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'O campo de senha está vazio.',
    });
    return false;
  }

  return true; // Retorna true, pois o código original não tinha outra verificação.
}
