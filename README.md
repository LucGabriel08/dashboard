#  Dashboard de Manutenção de Ar-Condicionado

Sistema de gestão para técnico autônomo de refrigeração: controle de clientes,
equipamentos instalados, ordens de serviço e financeiro (faturamento, gastos e lucro),
com gráficos e relatórios automáticos.

Projeto desenvolvido como parte do meu portfólio na transição de carreira para
desenvolvimento Front-End, aplicando na prática o conteúdo do curso de
Desenvolvedor Full Stack Python (EBAC) e da graduação em Análise e
Desenvolvimento de Sistemas (UDF) — unindo isso à minha experiência real como
Técnico em Refrigeração.

##  Funcionalidades

- **Clientes** — cadastro completo (CRUD): nome, telefone (com máscara), endereço, e-mail
- **Equipamentos** — vinculados a um cliente, com tipo, marca, modelo e capacidade (BTUs)
- **Ordens de Serviço** — manutenção ou instalação, com status, valor cobrado e observações
- **Gastos** — controle de despesas por categoria (material, combustível, ferramenta, outro)
- **Financeiro** — dashboard com faturamento, gastos, lucro, resumo semanal do mês e
  gráficos interativos (Recharts)
- **Responsivo** — layout com sidebar (desktop) e menu hambúrguer (mobile)

##  Tecnologias

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — build tool
- [Redux Toolkit](https://redux-toolkit.js.org/) — gerenciamento de estado global
- [React Router DOM](https://reactrouter.com/) — navegação entre páginas
- [Styled Components](https://styled-components.com/) — estilização
- [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) — formulários e validação
- [Recharts](https://recharts.org/) — gráficos
- [Axios](https://axios-http.com/) — requisições HTTP
- [JSON Server](https://github.com/typicode/json-server) — API REST simulada para desenvolvimento

##  Como rodar o projeto

Pré-requisitos: [Node.js](https://nodejs.org/) instalado.

```bash
# Clone o repositório
git clone <url-do-seu-repositorio>
cd react-ts

# Instale as dependências
npm install

# Rode o front-end e a API fake juntos
npm run dev:all
```

O projeto abre em `http://localhost:5173`. A API fake (json-server) roda em
`http://localhost:3001`.

> **Sobre os dados:** este projeto usa uma API simulada (json-server) para fins de
> desenvolvimento e portfólio. Os dados ficam salvos localmente no arquivo `db.json`,
> no computador de quem estiver rodando o projeto — ou seja, cada pessoa que rodar
> o projeto localmente tem seus próprios dados, isolados dos demais.

## 📁 Estrutura do projeto 

src/
├── components/ # Componentes e estilos compartilhados entre telas
├── pages/ # Telas da aplicação (Clientes, Equipamentos, OrdensServico, Gastos, Financeiro)
├── redux/
│ ├── store.ts
│ ├── hooks.ts
│ └── slices/ # Um slice por entidade (clientes, equipamentos, ordensServico, gastos)
├── services/ # Comunicação com a API (um arquivo por entidade)
├── types/ # Interfaces e tipos TypeScript
├── routes/ # Configuração de rotas e layout (sidebar)
├── utils/ # Funções utilitárias (ex: máscara de telefone)
└── styles/ # Estilos globais

> ## 🔒 Nota sobre segurança

Este é um projeto de portfólio com API pública de demonstração (json-server), sem
autenticação — qualquer pessoa com o link pode ler e alterar os dados de exemplo.
Isso é intencional para fins de avaliação: qualquer recrutador pode acessar e testar
livremente, sem precisar de credenciais.

Numa versão para uso real (por exemplo, por um técnico autônomo e seus clientes), a
arquitetura evoluiria para um backend com autenticação por usuário e persistência de
dados isolada por conta — diferente do modelo atual, pensado apenas para demonstração.