import React from 'react';
import styles from './App.module.css';

import Radio from './Radio';
const pokemons = [
  {
    id: 1,

    pergunta:
      'Qual dos seguintes Pokémon é um dos três iniciais (Starters) da região de Kanto?',

    alternativas: ['Pidgey', 'Bulbasaur', 'Geodude', 'Rattata'],

    resposta: 'Bulbasaur',
  },

  {
    id: 2,

    pergunta: 'Qual é a forma evoluída final da linha do Charmander?',

    alternativas: ['Charmeleon', 'Arcanine', 'Moltres', 'Charizard'],

    resposta: 'Charizard',
  },

  {
    id: 3,

    pergunta:
      'Qual é o número do Pokédex Nacional do Pokémon mascote, Pikachu, na 1ª Geração?',

    alternativas: ['#006', '#025', '#133', '#151'],

    resposta: '#025',
  },

  {
    id: 4,

    pergunta: 'Qual é o tipo principal do Pokémon lendário Zapdos?',

    alternativas: ['Água', 'Fogo', 'Gelo', 'Elétrico'],

    resposta: 'Elétrico',
  },

  {
    id: 5,

    pergunta:
      'Qual Pokémon é notório por ser capaz de aprender o golpe "Transformação" e replicar outros Pokémon?',

    alternativas: ['Mew', 'Snorlax', 'Ditto', 'Metapod'],

    resposta: 'Ditto',
  },

  {
    id: 6,

    pergunta: 'Qual destes Pokémon NÃO pertence à 1ª Geração (Kanto)?',

    alternativas: ['Gyarados', 'Jynx', 'Togepi', 'Lapras'],

    resposta: 'Togepi',
  },

  {
    id: 7,

    pergunta:
      'O Professor que dá os Pokémon iniciais aos novos treinadores na região de Kanto é o Professor:',

    alternativas: ['Birch', 'Carvalho (Oak)', 'Sycamore', 'Elm'],

    resposta: 'Carvalho (Oak)',
  },

  {
    id: 8,

    pergunta:
      'Qual Pokémon do tipo Fantasma/Venenoso evolui de Haunter (que, por sua vez, evolui de Gastly)?',

    alternativas: ['Zubat', 'Weezing', 'Gengar', 'Muk'],

    resposta: 'Gengar',
  },

  {
    id: 9,

    pergunta:
      'Qual o nome da equipe vilã que atua em Kanto, liderada por Giovanni?',

    alternativas: [
      'Equipe Magma',

      'Equipe Aqua',

      'Equipe Rocket',

      'Equipe Galática',
    ],

    resposta: 'Equipe Rocket',
  },

  {
    id: 10,

    pergunta:
      'Qual Pokémon, conhecido por dormir e bloquear caminhos, tem o Pokédex #143?',

    alternativas: ['Chansey', 'Rhydon', 'Snorlax', 'Tauros'],

    resposta: 'Snorlax',
  },
];

const App = () => {
  const [respostas, setRespostas] = React.useState({});
  const [slide, setSlide] = React.useState(0);
  const [resultadoFinal, setResultadoFinal] = React.useState(null);

  const perguntaAtual = pokemons[slide];

  function handleChange({ target }) {
    setRespostas({ ...respostas, [perguntaAtual.id]: target.value });
  }

  // function calcularResultado() {
  //   const corretas = pokemons.filter(
  //     ({ id, resposta }) => respostas[id] === resposta,
  //   );
  //   setResultadoFinal(`Você acertou: ${corretas.length} de ${pokemons.length}`);
  // }

  function calcularResultado() {
    const corretas = pokemons.filter(
      ({ id, resposta }) => respostas[id] === resposta,
    );

    const numAcertos = corretas.length;
    const totalPerguntas = pokemons.length;

    const porcentagem = (numAcertos / totalPerguntas) * 100;

    let classificacao = '';
    let mensagem = '';

    if (porcentagem === 100) {
      classificacao = 'Campeão da Liga Pokémon!';
      mensagem = 'Sua Pokédex de conhecimento está completa. Você é imbatível!';
    } else if (porcentagem >= 80) {
      classificacao = 'Mestre Pokémon da Elite Four!';
      mensagem = 'Um desempenho excelente! Seu conhecimento é quase lendário.';
    } else if (porcentagem >= 50) {
      classificacao = 'Veterano de Ginásio! ';
      mensagem =
        'Você tem um bom conhecimento, mas ainda há alguns Pokémons para capturar.';
    } else {
      classificacao = 'Treinador Novato! ';
      mensagem =
        'Um começo modesto. Continue treinando para se tornar um Mestre Pokémon!';
    }

    setResultadoFinal({
      acertos: numAcertos,
      total: totalPerguntas,
      classificacao: classificacao,
      mensagem: mensagem, //
    });
  }

  function handleClickNext() {
    if (slide < pokemons.length - 1) {
      setSlide(slide + 1);
    } else {
      calcularResultado();
      setSlide(slide + 1);
    }
  }

  function handleClickPrev() {
    if (slide > 0) {
      setSlide(slide - 1);
    }
  }

  return (
    <div className={styles.appContainer}>
      <form
        className={styles.quizContent}
        onSubmit={(event) => event.preventDefault()}
      >
        {perguntaAtual && (
          <div className={styles.quizBox}>
            <h2 className={styles.animeLeft} key={slide}>
              {slide + 1}) {perguntaAtual.pergunta}
            </h2>
            <div className={styles.controlsContainer}>
              <Radio
                key={slide}
                pokebola={styles.optionText}
                className={`${styles.radio} ${styles.animeLeft}`}
                options={perguntaAtual.alternativas}
                value={respostas[perguntaAtual.id] || ''}
                onChange={handleChange}
              />

              <div className={styles.buttons}>
                <button type="button" onClick={handleClickNext}>
                  {slide < pokemons.length - 1 ? 'Próximo' : 'Finalizar'}
                </button>
                {slide > 0 && (
                  <button
                    type="button"
                    onClick={handleClickPrev}
                    style={{ marginRight: '10px' }}
                  >
                    Voltar
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        {!perguntaAtual && resultadoFinal && (
          <div className={styles.final}>
            <h2>Parabéns! Você Concluiu o Desafio! </h2>
            <p>
              <span>Classificação:</span> {resultadoFinal.classificacao}
            </p>
            <p>
              <span>Você acertou:</span> {resultadoFinal.acertos}/
              {resultadoFinal.total}
            </p>
            <p>{resultadoFinal.mensagem}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default App;
