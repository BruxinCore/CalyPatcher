<div align="center">

  # 💜 CalyPatcher
  
  **A Solução Definitiva para Steam Tools & Millennium**
  
  [![Version](https://img.shields.io/badge/version-1.0.0-purple?style=for-the-badge&logo=appveyor)](https://github.com/BruxinCore/CalyPatcher)
  [![Status](https://img.shields.io/badge/status-STABLE-success?style=for-the-badge)](https://github.com/BruxinCore/CalyPatcher)
  [![Platform](https://img.shields.io/badge/platform-WINDOWS-blue?style=for-the-badge&logo=windows)](https://github.com/BruxinCore/CalyPatcher)
  [![License](https://img.shields.io/badge/license-BSAL-purple?style=for-the-badge)](https://github.com/BruxinCore/CalyPatcher/blob/main/LICENSE)

  <p align="center">
    Um utilitário <b>moderno, portátil e automatizado</b> para corrigir erros comuns de DLL, downloads travados e crashes do Millennium na Steam.
    <br />
    <i>Feito para quem não quer perder tempo digitando comandos.</i>
  </p>

  <img src="https://i.imgur.com/rZxAY3y.png" alt="CalyPatcher Dashboard" width="100%" style="border-radius: 10px; border: 2px solid #581c87;" />

</div>

<br />

## ⚡ Sobre o Projeto

O **CalyPatcher** nasceu da necessidade de simplificar a manutenção do ecossistema Steam Tools. Em vez de lidar com arquivos manualmente ou digitar comandos no PowerShell toda vez que um bug acontece, o CalyPatcher oferece uma interface gráfica **premium**, fluida e direta ao ponto.

Construído com tecnologias web de ponta rodando nativamente no desktop, ele é leve e não requer instalação.

---

## 🛠️ Funcionalidades Principais

O app é dividido em três módulos essenciais de correção:

### 1. 🟢 Correção de Download ("Comprar" Bug)
> *Resolve o problema onde o botão "Jogar" vira "Comprar" ou o download não inicia.*
* **O que faz:** Escaneia a pasta da Steam e **remove cirurgicamente** as DLLs conflitantes (`xinput1_4.dll` e `hid.dll`).
* **Diferencial:** Remove atributos de "Somente Leitura" antes de deletar, garantindo a limpeza.

### 2. 🟣 Forçar Modo Desenvolvedor (-dev)
> *Essencial para usuários do Millennium.*
* **O problema:** Às vezes, o Millennium trava a inicialização da Steam ou abre uma tela de console (CMD) preta.
* **A Solução:** O CalyPatcher encerra a Steam e a reinicia injetando a flag `-dev` de forma isolada (*detached process*), permitindo que a interface gráfica carregue corretamente sem erros de GPU.

### 3. 🔵 Reinstalação Automatizada
> *O "Botão de Pânico" quando nada mais funciona.*
* **O que faz:** Conecta-se diretamente aos servidores do Steam Tools e executa o script oficial de instalação/reparo (`irm steam.run | iex`).
* **Automação:** Tudo feito em background via PowerShell, sem que você precise abrir o terminal.

---

## 🚀 Como Usar

O CalyPatcher é **Portable** (Portátil). Não suja seu registro e não precisa de instalador.

1. **Baixe** a versão mais recente em "Releases".
2. Coloque o executável `CalyPatcher.exe` onde preferir (Área de Trabalho, Pen Drive, Pasta de Jogos).
3. **Execute** (Recomendado: Executar como Administrador para garantir acesso às pastas da Steam).
4. **Selecione o Caminho:** Se sua Steam não estiver no local padrão, use a aba lateral para apontar a pasta correta.
5. Clique na correção desejada e aguarde o status "Sucesso".

---

## 💻 Tech Stack (Tecnologias)

Desenvolvido com o que há de mais moderno em performance e UI:

* ![Electron](https://img.shields.io/badge/Electron-2B2E3A?style=flat&logo=electron&logoColor=9FEAF9) **Electron**: Core do sistema.
* ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) **React + Vite**: Interface reativa ultra-rápida.
* ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) **TailwindCSS**: Estilização e layout.
* ![PowerShell](https://img.shields.io/badge/PowerShell-%235391FE.svg?style=flat&logo=powershell&logoColor=white) **PowerShell Integration**: Para comandos profundos do sistema.

---

## ⚠️ Aviso Legal

Este software é uma ferramenta de terceiros desenvolvida pelo **BruxinCore** para automação de tarefas.
* Não possui vínculo oficial com a Valve ou Steam.
* Use com responsabilidade. Embora seguro, o uso de ferramentas que modificam arquivos de jogos é de responsabilidade do usuário.
