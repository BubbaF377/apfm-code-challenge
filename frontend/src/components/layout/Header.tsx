import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    description: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '1.25rem',
      marginTop: '.75rem',
    },
    logo: {
      marginRight: theme.spacing(),
    },
    header: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(3),
    }
  });
});

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = (props) => {
  const classes = useStyles({});
  return (
    <header className={classes.header} data-test="Header">
      <Typography color='primary' variant='h3'>Trivia Empire</Typography>
      <span className={classes.description}>Answer Questions. Vanquish Your Foes. Build Your Empire.</span>
    </header>
  );
};
