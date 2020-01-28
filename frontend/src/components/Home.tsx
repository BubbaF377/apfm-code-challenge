import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import React from 'react';
import { Game } from 'components/Game';
import { Setup } from 'components/Setup';

import { Category, Question } from '../helpers/apiUtils'

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    home: {
      alignContent: 'stretch',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      marginTop: '2rem',
      padding: `0 ${theme.spacing(4)}px`,
    }
  });
});

export interface HomeProps {
  categories: Category[],
  currentCategory: Category,
  defaultCategory: Category,
  gameIsVisible: boolean,
  numQuestions: number,
  playGame: () => void,
  questions: Question[],
  resetGame: () => void,
  setupIsVisible: boolean,
  updateCategory: (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }> | null) => void,
  updateNumQuestions: (newNum: number | null) => void,
}

export const Home: React.FC<HomeProps> = ({
  categories,
  currentCategory,
  defaultCategory,
  gameIsVisible,
  numQuestions,
  playGame,
  questions,
  resetGame,
  setupIsVisible,
  updateCategory,
  updateNumQuestions,
}) => {
  const classes = useStyles();
  const gameProps = {
    questions,
    resetGame,
  };
  const setupProps = {
    categories,
    currentCategory,
    defaultCategory,
    numQuestions,
    playGame,
    setupIsVisible,
    updateCategory,
    updateNumQuestions,
  };
  
  return (
    <div className={classes.home}>
      {
        setupIsVisible
          ? <Setup {...setupProps} />
          : null
      }
      {
        gameIsVisible
          ? <Game {...gameProps} />
          : null
      }
    </div>
  );
};
