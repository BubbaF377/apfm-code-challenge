import { createStyles, makeStyles } from '@material-ui/styles';
import { Button, Theme } from '@material-ui/core';
import React, { useState } from 'react';

import { GameQuestion } from 'components/GameQuestion';

import { Question } from '../helpers/apiUtils';
import { htmlDecode, shuffleStrings } from '../helpers/utils';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    btnQuit: {
      alignSelf: 'center',
      marginTop: '2rem',
    },
    game: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '50rem',
      width: '100%',
    },
    gameOver: {
      fontSize: '1.5rem',
      textAlign: 'center',
      marginTop: '2rem',
    },
    header: {
      alignSelf: 'center',
      fontSize: 'smaller',
    }
  }); 
});

export interface GameProps {
  questions: Question[],
  resetGame: () => void,
};

export const Game: React.FC<GameProps> = ({
  questions,
  resetGame,
}) => {
  const classes = useStyles();
  
  const [correctAnswer, setCorrectAnswer]  = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [gameLost, setGameLost] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const getNextQuestion = (answerIsCorrect: boolean, correctAnswer: string) => {
      if (!answerIsCorrect) {
        setGameLost(true);
        setCorrectAnswer(correctAnswer);
      } else if (currentQuestionIndex + 1 == questions.length) {
        setGameOver(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
  };

  const getQuestionElements = () => {
    const {category, correct_answer, difficulty, incorrect_answers, question, type} = questions[currentQuestionIndex];
    let arrAnswers: string[] = [];

    if (type === "multiple") {
      arrAnswers[0] = correct_answer;
      for (let i = 0; i < incorrect_answers.length; i++) {
        arrAnswers[i + 1] = incorrect_answers[i];
      }

      arrAnswers = shuffleStrings(arrAnswers);
    }

    const questionProps = {
      arrAnswers,
      category,
      correctAnswer: correct_answer,
      currentQuestionIndex,
      difficulty,
      getNextQuestion,
      numQuestions: questions.length,
      question: htmlDecode(question),
      type,
    };

    return <GameQuestion {...questionProps} />;
  };
  
  return (
    <div className={classes.game}>
      {
        gameLost
        ? (
            <div className={classes.gameOver}>
              <div>The correct answer was <em>{correctAnswer}</em></div>
              <div>Despair! You have been Defeated!</div>
            </div>
          )
        : (
            gameOver
            ? (
                <div className={classes.gameOver}>
                  <div>Rejoice! You are the Victor!</div>
                </div>
              )
            : getQuestionElements()
          )
      }
      <Button className={classes.btnQuit} variant="contained" onClick={resetGame}>
        {gameLost || gameOver ? "Try again" : "Surrender"}
      </Button>
    </div>
  );
};
