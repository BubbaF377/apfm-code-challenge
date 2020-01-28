import { createStyles, makeStyles } from '@material-ui/styles';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Theme } from '@material-ui/core';
import React , { useState } from 'react';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    btn: {
      alignSelf: 'center',
      margin: '2rem auto',
    },
    category: {

    },
    info: {
      fontSize: 'smaller',
      textAlign: 'center',
    },
    question: {
      border: '1px solid #424242',
      borderRadius: '10px',
      marginTop: '2rem',
      padding: '1rem',
    },
    questionText: {
      fontWeight: 'bold',
      marginTop: '1rem',
    }
  }); 
});

export interface GameQuestionProps {
  arrAnswers: string[],
  category: string,
  correctAnswer: string,
  currentQuestionIndex: number,
  getNextQuestion: (answerIsCorrect: boolean, correctAnswer: string) => void,
  numQuestions: number,
  question: string | null,
  type: string,
};

export const GameQuestion: React.FC<GameQuestionProps> = ({
  arrAnswers,
  category,
  correctAnswer,
  currentQuestionIndex,
  getNextQuestion,
  numQuestions,
  question,
  type,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const classes = useStyles();

  const handleChange = (val: string) => {
      setSelectedAnswer(val);
  };

  const answerIsCorrect = (selected: string, correct: string) => {
    return selected.toUpperCase() === correct.toUpperCase();
  }

  const submitAnswer = () => {
    const isCorrect = answerIsCorrect(selectedAnswer, correctAnswer);

    setSelectedAnswer('');
    getNextQuestion(isCorrect, correctAnswer);
  }

  const getQuestionLayout = () => {
    if (type === "multiple") {
      return (
        <RadioGroup aria-label="multiple-choice" name="multiple" onChange={(e) => handleChange(e.target.value)} value={selectedAnswer}>
          {
            arrAnswers.map((answer, index) => <FormControlLabel key={`fcl-${index}`} value={answer} control={<Radio />} label={answer} />)
          }
        </RadioGroup>
      );
    }

    return (
      <RadioGroup aria-label="true-or-false" name="boolean" onChange={(e) => handleChange(e.target.value)} value={selectedAnswer}>
        <FormControlLabel  key='fcl-true' value="True" control={<Radio />} label="True" />
        <FormControlLabel  key='fcl-false' value="False" control={<Radio />} label="False" />
      </RadioGroup>
    );
  }
  
  return (
    <FormControl className={classes.question} component="fieldset">
      <FormLabel className={classes.questionText} component="legend">{question}</FormLabel>
      {getQuestionLayout()}
      <Button className={classes.btn} variant="contained" color="primary" onClick={submitAnswer}>Submit Answer</Button>
      <span className={classes.info}>[ Question number {currentQuestionIndex + 1} of {numQuestions} is from the realm of <em>{category}</em> ]</span> 
    </FormControl>
  );
};