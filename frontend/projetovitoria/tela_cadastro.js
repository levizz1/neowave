document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.registration-form');
    const nomeCompletoInput = document.getElementById('nome-completo');
    const dataNascimentoInput = document.getElementById('data-nascimento');
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const emailInput = document.getElementById('email');
    const emailConfirmInput = document.getElementById('email-confirm');
    const senhaInput = document.getElementById('senha');
    const senhaConfirmInput = document.getElementById('senha-confirm');

    
    function showError(input, message) {
        const formGroup = input.parentElement;
        let errorText = formGroup.querySelector('.error-text');
        if (!errorText) {
            errorText = document.createElement('small');
            errorText.className = 'error-text';
            formGroup.appendChild(errorText);
        }
        errorText.textContent = message;
        input.classList.add('invalid');
    }

   
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorText = formGroup.querySelector('.error-text');
        if (errorText) {
            formGroup.removeChild(errorText);
        }
        input.classList.remove('invalid');
    }

    
    function validateNomeCompleto() {
        if (nomeCompletoInput.value.trim() === '') {
            showError(nomeCompletoInput, 'Por favor, digite seu nome completo.');
            return false;
        } else {
            clearError(nomeCompletoInput);
            return true;
        }
    }

    
    function validateDataNascimento() {
        if (dataNascimentoInput.value.trim() === '') {
            showError(dataNascimentoInput, 'Por favor, digite sua data de nascimento.');
            return false;
        } else {
            clearError(dataNascimentoInput);
            return true;
        }
    }

   
    function validateCpf() {
        const cpf = cpfInput.value.replace(/\D/g, ''); 
        if (cpf.length !== 11) {
            showError(cpfInput, 'CPF inválido. Deve conter 11 dígitos.');
            return false;
        } else {
            clearError(cpfInput);
            return true;
        }
    }

   
    function validateTelefone() {
        const telefone = telefoneInput.value.replace(/\D/g, '');
        if (telefone.length < 10) {
            showError(telefoneInput, 'Telefone inválido. Mínimo de 10 dígitos (com DDD).');
            return false;
        } else {
            clearError(telefoneInput);
            return true;
        }
    }

    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'Por favor, digite um e-mail válido.');
            return false;
        } else {
            clearError(emailInput);
            return true;
        }
    }

    
    function validateEmailConfirm() {
        if (emailConfirmInput.value.trim() === '') {
            showError(emailConfirmInput, 'Por favor, confirme seu e-mail.');
            return false;
        } else if (emailConfirmInput.value.trim() !== emailInput.value.trim()) {
            showError(emailConfirmInput, 'E-mails não coincidem.');
            return false;
        } else {
            clearError(emailConfirmInput);
            return true;
        }
    }

    
    function validateSenha() {
        const senha = senhaInput.value;
        if (senha.length < 6) {
            showError(senhaInput, 'A senha deve ter pelo menos 6 caracteres.');
            return false;
        } else {
            clearError(senhaInput);
            return true;
        }
    }

    
    function validateSenhaConfirm() {
        if (senhaConfirmInput.value.trim() === '') {
            showError(senhaConfirmInput, 'Por favor, confirme sua senha.');
            return false;
        } else if (senhaConfirmInput.value !== senhaInput.value) {
            showError(senhaConfirmInput, 'Senhas não coincidem.');
            return false;
        } else {
            clearError(senhaConfirmInput);
            return true;
        }
    }

    
    nomeCompletoInput.addEventListener('blur', validateNomeCompleto);
    dataNascimentoInput.addEventListener('blur', validateDataNascimento);
    cpfInput.addEventListener('blur', validateCpf);
    telefoneInput.addEventListener('blur', validateTelefone);
    emailInput.addEventListener('blur', validateEmail);
    emailConfirmInput.addEventListener('blur', validateEmailConfirm);
    senhaInput.addEventListener('blur', validateSenha);
    senhaConfirmInput.addEventListener('blur', validateSenhaConfirm);

   
    emailInput.addEventListener('keyup', validateEmail);
    emailConfirmInput.addEventListener('keyup', validateEmailConfirm);
    senhaInput.addEventListener('keyup', validateSenha);
    senhaConfirmInput.addEventListener('keyup', validateSenhaConfirm);

    
    cpfInput.addEventListener('input', function() {
        let cpf = this.value.replace(/\D/g, ''); 
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        this.value = cpf.substring(0, 14); 
    });

   
    telefoneInput.addEventListener('input', function() {
        let telefone = this.value.replace(/\D/g, ''); 
        if (telefone.length > 0) {
            telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2'); 
            telefone = telefone.replace(/(\d)(\d{4})$/, '$1-$2');
        }
        this.value = telefone.substring(0, 15);
    });

    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        
        const isNomeCompletoValid = validateNomeCompleto();
        const isDataNascimentoValid = validateDataNascimento();
        const isCpfValid = validateCpf();
        const isTelefoneValid = validateTelefone();
        const isEmailValid = validateEmail();
        const isEmailConfirmValid = validateEmailConfirm();
        const isSenhaValid = validateSenha();
        const isSenhaConfirmValid = validateSenhaConfirm();

       
        if (isNomeCompletoValid && isDataNascimentoValid && isCpfValid && isTelefoneValid &&
            isEmailValid && isEmailConfirmValid && isSenhaValid && isSenhaConfirmValid) {

          
            const formData = {
                nomeCompleto: nomeCompletoInput.value.trim(),
                dataNascimento: dataNascimentoInput.value.trim(),
                cpf: cpfInput.value.trim(),
                telefone: telefoneInput.value.trim(),
                email: emailInput.value.trim(),
                senha: senhaInput.value 
            };

            console.log('Dados do formulário para envio:', formData);
            alert('Cadastro realizado com sucesso! (Verifique o console para os dados)');
            window.location.href = "projetov.html"
           
            
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });
});