# Tablete da Criação - Jogo de Perguntas Matemáticas

Um jogo interativo de perguntas e respostas baseado em cálculo matemático, com uma narrativa envolvente sobre o Tablete da Criação.

## Como Jogar

1. Abra o arquivo `index.html` em um navegador web.
2. Clique em "▶ Iniciar Jornada" para começar.
3. Responda às perguntas matemáticas apresentadas.
4. Se errar uma pergunta principal, resolva o desafio secundário para estabilizar o Tablete e tentar novamente.
5. Se errar duas vezes a pergunta principal, o jogo termina (game over).
6. Complete todos os 5 desafios para vencer.

## Desafios

### 🧩 Desafio 1 — A Porta de Pedra
- **Principal**: Calcule P'(m) para P(m) = m² + 3m.
- **Secundário**: Derive P(m) = 2m².

### 🌉 Desafio 2 — Ponte Viva
- **Principal**: Calcule ∫ 2x · (x² + 1)³ dx.
- **Secundário**: Calcule ∫ 2x(x²) dx.

### 🌿 Desafio 3 — Jardim do Tempo
- **Principal**: Calcule ∫ x e^x dx.
- **Secundário**: Calcule ∫ x dx.

### 🌀 Desafio 4 — O Portal dos Limites
- **Principal**: Calcule ∫₀² (2x + 1) dx.
- **Secundário**: Calcule ∫₀¹ x dx.

### 🏛️ Desafio 5 — Câmara da Luz
- **Principal**: Calcule a área sob f(x)=x² em [0,2].
- **Secundário**: Calcule a área sob f(x)=x em [0,2].

## Recursos

- **Gráfico Interativo**: Visualize as funções corretas e suas respostas centralizadas nas imagens dos desafios (sobre o tablete desenhado em cada imagem).
- **Imagens Temáticas**: Cada desafio tem uma imagem de fundo real da pasta Imagens, mostrando a imagem completa sem sobreposições.
- **Sistema de Estabilização**: Desafios secundários para recuperar tentativas.
- **Interface Responsiva**: Funciona em desktop e dispositivos móveis.
- **Game Over Imersivo**: Tela inicial adaptada para mostrar falha com visual da Tela Inicial.png.
- **Tela Inicial Personalizada**: Fundo com imagem da Tela Inicial.png para maior imersão desde o início.

## Personalização

Para alterar as imagens do jogo, substitua os arquivos na pasta `Imagens/` mantendo os mesmos nomes:

- `Desafio 1.png` até `Desafio 5.png`: Fundos dos desafios
- `Tablete da Criação.png`: Imagem do tablete no gráfico
- `Tela Inicial.png`: Fundo da tela inicial e game over

**Dicas para imagens:**
- Use resolução alta (1920x1080 ou superior) para melhor qualidade
- Mantenha proporção adequada para evitar distorções
- As imagens são exibidas com `background-size: contain` para mostrar completamente

## Requisitos

- Navegador web moderno com suporte a Canvas 2D.
- JavaScript habilitado.

## Notas Técnicas

- As respostas são validadas comparando valores em pontos específicos.
- Expressões matemáticas suportam sintaxe JavaScript (ex: `Math.exp(x)`, `x**2`).
- O gráfico é renderizado em tempo real usando Canvas API.
- Todas as imagens são carregadas da pasta Imagens/ localmente.
- Os fundos temáticos usam `background-size: contain` para mostrar imagens completas.
- O gráfico está posicionado absolutamente no centro da tela, sobrepondo o tablete nas imagens dos desafios.
- A tela inicial tem fundo personalizado com a imagem Tela Inicial.png aplicada via JavaScript.
- Pseudo-elementos (::before/::after) removidos para evitar sobreposições visuais.

## Personalização

Para alterar as imagens do jogo, substitua os arquivos na pasta `Imagens/` mantendo os mesmos nomes:

- `Desafio 1.png` até `Desafio 5.png`: Fundos dos desafios
- `Tablete da Criação.png`: Imagem do tablete no gráfico
- `Tela Inicial.png`: Fundo da tela inicial e game over

**Dicas para imagens:**
- Use resolução alta (1920x1080 ou superior) para melhor qualidade
- Mantenha proporção adequada para evitar distorções
- As imagens são exibidas com `background-size: contain` para mostrar completamente</content>
<parameter name="filePath">c:\Users\vitor\Desktop\Codes Facul\Sérios Game\README.md