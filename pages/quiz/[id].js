import React from 'react';
import PropTypes from 'prop-types';

export default function ExternalQuiz({ id }) {
  return (
    <div>{id}</div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.query.id,
    },
  };
}

ExternalQuiz.propTypes = {
  id: PropTypes.string.isRequired,
};
