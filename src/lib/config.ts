/**
 * Modo demo (ligado por padrão, pensado pra apresentação da feira de TCC).
 *
 * Com ele ligado, campo vazio não trava o botão: dá pra ir
 * login → cadastro → criar nó → nó criado só clicando em "continuar".
 * O que ainda é checado é o conteúdo que você de fato digitou — e-mail
 * mal formado, senha curta, senhas diferentes — então a validação continua
 * demonstrável ao vivo.
 *
 * Pra exigir todos os campos (comportamento de produção):
 *   VITE_DEMO=false npm run dev
 */
export const DEMO = import.meta.env.VITE_DEMO !== "false";

/** Campo vazio bloqueia o envio? */
export const CAMPO_OBRIGATORIO = !DEMO;
