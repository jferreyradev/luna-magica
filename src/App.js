import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputForm from './components/InputForm';
import Card from './components/Card';
import { useState } from 'react';


function random(min, max, exclude = []) {
  let num = Math.round(min + Math.random() * (max - min));

  while (exclude.includes(num)) {
    num = Math.round(min + Math.random() * (max - min));
  }
  return num;
}

function getTrivia(min, max) {
  const x = random(min, max);
  const y = random(min, max, [x]);
  const z = random(min, max, [x, y]);
  console.log(x,y,z)
  return [x, y, z]
}

function App() {

  const [trivia, setTrivia] = useState([]);
  const [pasado, setPasado] = useState({})
  const [presente, setPresente] = useState({})
  const [futuro, setFuturo] = useState({})

  const handleCards = () => {
    setTrivia(getTrivia(1, 22));
    fetch("https://luna-magica-api.deno.dev/cartas")
            .then(res => res.json())
            .then((result) => {
                setPasado(result[trivia[0]])
                setPresente(result[trivia[1]])
                setFuturo(result[trivia[2]])
                console.log(result[trivia[0]])
                }, (error) => {console.log(error);
            });
  }

  return (
    <div className="bg-secondary text-white w-50 align-items-center"  >
      <InputForm />
      <input type="button" className='btn btn-primary' value="consultar" onClick={handleCards} />
      {pasado && <div className="d-flex justify-content-center">
        {pasado && <Card title={pasado["nombre"]} desc={pasado["significado"]} img={`./img/cartas/${trivia[0]}.jpg`} /> }
        {presente && <Card title={presente["nombre"]} desc={presente["significado"]} img={`./img/cartas/${trivia[1]}.jpg`} /> }
        {futuro && <Card title={futuro["nombre"]} desc={futuro["significado"]} img={`./img/cartas/${trivia[2]}.jpg`} /> } 
      </div> }

    </div>
  );
}

export default App;
