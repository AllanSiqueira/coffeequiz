import React, { useState } from 'react';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

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
        <Widget>
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
        <Widget>
          <Widget.Content>
            <h1>Quizes da galera</h1>
            <p>Dá uma olhada nesses quizes incríveis que o pessoal da Imersão React v2 fez:</p>
            <ul>
              {db.external.map((link) => (
                <li key={link}>
                  <Widget.Topic
                    href={link}
                  >
                    {link.match(/^https:\/\/(.+\..+)\.vercel.app\/?$/i)[1]}
                  </Widget.Topic>
                </li>
              ))}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/AllanSiqueira/coffeequiz" />
    </QuizBackground>
  );
}
