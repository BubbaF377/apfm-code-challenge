import { createStyles, makeStyles } from '@material-ui/styles';
import { Button, Input, InputLabel, MenuItem, Select, Theme, Typography } from '@material-ui/core';
import React from 'react';

import { Category } from '../helpers/apiUtils'

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    btn: {
      marginTop: '2rem',
    },
    description: {
      textAlign: 'center',
    },
    setup: {
      alignItems: 'center',
      display: 'flex',
      border: '1px solid #424242',
      borderRadius: '10px',
      flexDirection: 'column',
      maxWidth: '50rem',
      padding: '1rem',
      width: '100%',
    },
    row: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      marginTop: '1.5rem',
    }
  });
});

export interface SetupProps {
  categories: Category[],
  currentCategory: Category,
  defaultCategory: Category,
  numQuestions: number,
  playGame: () => void,
  setupIsVisible: boolean,
  updateCategory: (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }> | null) => void,
  updateNumQuestions: (newNum: number | null) => void,
}

export const Setup: React.FC<SetupProps> = ({
  categories,
  currentCategory,
  defaultCategory,
  numQuestions,
  playGame,
  updateCategory,
  updateNumQuestions,
}) => {
  const classes = useStyles();
  
  return (
    <form className={classes.setup}>
      
        <Typography variant='h6'>Prepare for battle!</Typography>
        <span className={classes.description}>Select a trivia category and the number of questions you dare to answer.<br />When you're ready, click Play Game.</span>
      
      <div className={classes.row}>
        <InputLabel id='select-category'>Select a category:</InputLabel>
        <Select name="category" labelId="select-category" id='select' value={currentCategory.id} onChange={(event) => updateCategory(event)}>
          <MenuItem key="mi-default" value={defaultCategory.id}>{defaultCategory.name}</MenuItem>
          {categories.map(category => (
            <MenuItem key={`mi-${category.id}`} value={category.id}>{category.name}</MenuItem>
          ))}
        </Select>
      </div>
      <div className={classes.row}>
        <InputLabel id='select-number'>Select number of questions:</InputLabel>
        <Input
          id='select-number'
          type='number'
          inputProps={{
            min: '1',
            max: '50',
          }}
          value={numQuestions}
          onChange={(e) => updateNumQuestions(parseInt(e.target.value))}
        />
      </div>
      <Button className={classes.btn} variant="contained" color="primary" onClick={(e) => {e.preventDefault(); return playGame()}}>
        Play Game
      </Button>
    </form>
  );
};