import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import localDb from '../../db.json';
import QuizScreen from '../../src/screens/Quiz';

export default function ExternalQuiz({ db }) {
  return (
    <ThemeProvider theme={db.theme}>
      <QuizScreen db={db} />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const externalId = context.query.id;
  const url = `${localDb.external[externalId]}api/db`;
  const dbExterno = await fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Fail fetching server data');
    })
    .then((jsonResponse) => jsonResponse)
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err));
  return {
    props: {
      db: dbExterno,
    },
  };
}

ExternalQuiz.propTypes = {
  db: PropTypes.shape({
    bg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        answer: PropTypes.number.isRequired,
        alternatives: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      }).isRequired,
    ).isRequired,
    external: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    theme: PropTypes.shape({
      colors: PropTypes.shape({
        primary: PropTypes.string.isRequired,
        secondary: PropTypes.string.isRequired,
        mainBg: PropTypes.string.isRequired,
        contrastText: PropTypes.string.isRequired,
        wrong: PropTypes.string.isRequired,
        success: PropTypes.string.isRequired,
      }),
    }),
    borderRadius: PropTypes.string.isRequired,
  }).isRequired,
};
