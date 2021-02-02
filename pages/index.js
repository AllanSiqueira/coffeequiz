import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import Link from '../src/components/Link';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  const OnSubmit = (e) => {
    e.preventDefault();
    router.push(`/quiz?name=${name}`);
  };

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{ db.title }</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{ db.description }</p>
            <form
              onSubmit={OnSubmit}
            >
              <Input
                name="name"
                onChange={(e) => { setName(e.target.value); }}
                placeholder="Diz ai seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                { `Jogar ${name}` }
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da galera</h1>
            <p>Dá uma olhada nesses quizes incríveis que o pessoal da Imersão React v2 fez:</p>
            <ul>
              {db.external.map((link, index) => (
                <li key={link}>
                  <Widget.Topic
                    as={Link}
                    href={`/quiz/${index}`}
                  >
                    {link.match(/^https:\/\/(.+\..+)\.vercel.app\/?$/i)[1]}
                  </Widget.Topic>
                </li>
              ))}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/AllanSiqueira/coffeequiz" />
    </QuizBackground>
  );
}
