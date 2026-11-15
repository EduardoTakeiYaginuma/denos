# denós

App mobile-first rodando no navegador. React + TypeScript + Vite + Tailwind 4.

## Rodar

```bash
npm install
npm run dev     # http://localhost:5173 (--host ligado, dá pra abrir do celular na mesma rede)
npm run build
npm run preview
```

Pra rodar no celular na feira: `npm run dev` imprime um endereço `Network:`
(tipo `http://192.168.0.12:5173`). Abra esse endereço no navegador do celular
com o notebook na mesma rede wi-fi.

## Modo demo (feira de TCC)

Ligado por padrão. Com ele, **campo vazio não trava o botão**: dá pra percorrer
login → cadastro → criar nó → nó criado só clicando em "continuar", sem digitar
nada. O que você de fato digitar continua sendo validado (e-mail mal formado,
senha com menos de 6 caracteres, senhas que não batem), então ainda dá pra
demonstrar a validação ao vivo.

Pra exigir todos os campos, como em produção:

```bash
VITE_DEMO=false npm run dev
VITE_DEMO=false npm run build
```

Controlado por [src/lib/config.ts](src/lib/config.ts).

## Telas

| Rota | Tela |
|---|---|
| `/login` | login (usuário + senha, Google, cadastre) |
| `/recuperar-senha` | pedir link de redefinição por e-mail |
| `/recuperar-senha/enviado` | confirmação de envio |
| `/cadastro` | criar conta (nome, sobrenome, e-mail, senha) |
| `/criar-no` | criar círculo (foto, nome, vínculo, cor, privacidade) |
| `/no-criado` | "nó apertado" — confirmação + convite |
| `/feed` | início do círculo: entre nós, pergunta do dia, memórias |
| `/mapa` | lugar salvo, quem está perto, convites |
| `/calendario` | mês, compromissos, marcar encontro |
| `/perfil` | estatísticas, laços, menu, logout |
| `/perfil/editar` | nome, foto, borda do ícone, conquistas visíveis |
| `/nova-memoria` | escolher a foto (galeria fake + arquivo do aparelho) |
| `/nova-memoria/editar` | filtros, cortar, ajustar e girar |
| `/nova-memoria/compartilhar` | legenda, marcar pessoas, local, calendário |
| `/memoria/:id` | ver a memória: curtir, salvar e comentar |

As quatro primeiras telas internas vivem dentro de `AppShell` (header + tab bar
flutuante). A tab bar tem 4 itens: início, mapa, câmera e calendário.

## Estrutura

```
src/
  components/   Screen, AppShell, AppHeader, TabBar, Logo, BackButton,
                TextField/PasswordField, Button, Select, PhotoPicker,
                ColorPicker, Avatar, Laco, MapaIlustrado, icons
  pages/        Login, RecuperarSenha, LinkEnviado, Cadastro, CriarNo,
                NoCriado, Feed, Mapa, Calendario, Perfil, EditarPerfil
  lib/no.ts         cores do nó, vínculos e privacidade
  lib/filtros.ts    presets de filtro (CSS filter) e proporções de recorte
  lib/demo-data.ts  TODO o conteúdo das telas internas (nomes, fotos, datas)
  lib/memorias.tsx  feed em memória + foto tirada pela câmera
  lib/perfil.tsx    estado do perfil compartilhado entre /perfil e /perfil/editar
  lib/config.ts     flag do modo demo
  index.css         tokens de cor e tipografia (@theme do Tailwind 4)
```

## Design

Tokens em [src/index.css](src/index.css):

- `cream` `#FCF4E4` — fundo
- `amber` `#E9AC4C` — botão primário e bordas de campo
- `ink` `#4B3426` / `ink-soft` `#6B5342` — texto
- `muted` `#A09A90` — texto terciário
- cores do nó: amarelo `#E9AC4C`, verde `#7A9440`, azul `#3B6CA8`,
  terracota `#C8481E`, rosa `#F0C4DF` — ver [src/lib/no.ts](src/lib/no.ts)
- Poppins 300–700

`Screen` usa `min-h-dvh` (altura real no mobile, sem o pulo da barra do Safari),
respeita `env(safe-area-inset-*)` e trava em `420px` no desktop.

## Conteúdo da demo

Tudo que aparece nas telas internas sai de
[src/lib/demo-data.ts](src/lib/demo-data.ts) — é o arquivo pra editar antes da
feira. Em especial:

- `CIRCULO` — nome do círculo no topo ("finilovers")
- `POSTS_INICIAIS` — memórias do feed
- `DEMO_HOJE` — fixado em **14/09/2026** pra o calendário bater com os
  compromissos; se mudar, atualize também os dias em `DIAS_COM_GENTE`,
  `COMPROMISSOS` e `ENCONTRO_SUGERIDO`
- `PERFIL`, `LACOS`, `PESSOAS_PERTO`, `LUGAR`

**Imagens**: as fotos do feed são SVGs ilustrados em
[public/assets/demo/](public/assets/demo/) e o mapa é desenhado em SVG
([MapaIlustrado](src/components/MapaIlustrado.tsx)) — nada depende de internet,
então a demo roda offline. Pra usar fotos de verdade, é só jogar os arquivos em
`public/assets/demo/` e apontar `POSTS_INICIAIS` pra eles.

**Avatares** não precisam de arquivo: sem foto, o componente
[Avatar](src/components/Avatar.tsx) desenha a inicial sobre uma cor derivada do
nome (a mesma pessoa tem sempre a mesma cor).

## Pendências de integração

- `src/pages/Login.tsx` — autenticação e OAuth do Google ainda são mocks (`TODO`)
- `src/pages/RecuperarSenha.tsx` — envio do link ainda é mock (`TODO`)
- `src/pages/Cadastro.tsx` — criação de conta ainda é mock (`TODO`)
- `src/pages/CriarNo.tsx` — criação do nó ainda é mock (`TODO`); a foto só vira
  preview local, não sobe pra lugar nenhum
- `src/pages/NoCriado.tsx` — link de convite é montado no client a partir do nome
  do nó; trocar pelo link que o backend devolver. "ir para o círculo" aponta pra
  `/criar-no` até a tela do círculo existir
- os dados entre `/criar-no` e `/no-criado` viajam pelo `state` do router, então
  recarregar `/no-criado` cai no texto genérico
- o feed, o perfil e os botões de convidar/confirmar/marcar guardam estado só em
  memória: recarregar a página volta tudo ao conteúdo de `demo-data.ts`
- a aba da câmera abre `/nova-memoria`; o "+" dessa tela abre a câmera ou a
  galeria do aparelho. A foto publicada vive só em memória, nada é enviado
- a edição é toda em CSS (`filter`, `transform`, `aspect-ratio`): a imagem
  original não é reprocessada, então o que for publicado guarda o estilo mas
  não gera um arquivo novo. Pra valer, isso vira um `<canvas>` no backend
- "adicionar ao calendário" guarda a escolha no rascunho, mas ainda não cria
  nada em `/calendario`
- não há rota pra "memórias salvas", "cápsulas do tempo", "ajuda" e
  "configurações" — os botões existem mas não navegam
- o sino de notificações e os cards "missão semanal" / "memória do mês" também
  ainda não levam a lugar nenhum
