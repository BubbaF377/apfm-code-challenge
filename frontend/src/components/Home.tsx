import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import React from 'react';
import { Setup } from 'components/Setup';

import { ICategory } from '../helpers/apiUtils'

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
  categories: ICategory[],
  currentCategory: ICategory,
  defaultCategory: ICategory,
  numQuestions: number,
  setupIsVisible: boolean,
  updateCategory: (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }> | null) => void,
  updateNumQuestions: (newNum: number | null) => void,
}

export const Home: React.FC<HomeProps> = ({
  categories,
  currentCategory,
  defaultCategory,
  numQuestions,
  setupIsVisible,
  updateCategory,
  updateNumQuestions,
}) => {
  const classes = useStyles();
  const setupProps = {
    categories,
    currentCategory,
    defaultCategory,
    numQuestions,
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
    </div>
  );
};
