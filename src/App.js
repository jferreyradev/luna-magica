import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import ContainerBox from './components/ContainerBox';
import Card from './components/Card';
import Background from './components/Background/Background';
import html2canvas from 'html2canvas';
import { MainInfo } from './components/MainInfo';

function obtieneSigno(dia, mes) {
  dia = Number(dia);
  mes = Number(mes);
  if ((dia >= 21 && mes === 3) || (dia <= 20 && mes === 4))
    return 'Aries';
  if ((dia >= 24 && mes === 9) || (dia <= 23 && mes === 10))
    return 'Libra';
  if ((dia >= 21 && mes === 4) || (dia <= 21 && mes === 5))
    return 'Tauro';
  if ((dia >= 24 && mes === 10) || (dia <= 22 && mes === 11))
    return 'Escorpio';
  if ((dia >= 22 && mes === 5) || (dia <= 21 && mes === 6))
    return 'Géminis';
  if ((dia >= 23 && mes === 11) || (dia <= 21 && mes === 12))
    return 'Sagitario';
  if ((dia >= 21 && mes === 6) || (dia <= 23 && mes === 7))
    return 'Cáncer';
  if ((dia >= 22 && mes === 12) || (dia <= 20 && mes === 1))
    return 'Capricornio';
  if ((dia >= 24 && mes === 7) || (dia <= 23 && mes === 8))
    return 'Leo';
  if ((dia >= 21 && mes === 1) || (dia <= 19 && mes === 2))
    return 'Acuario';
  if ((dia >= 24 && mes === 8) || (dia <= 23 && mes === 9))
    return 'Virgo';
  if ((dia >= 20 && mes === 2) || (dia <= 20 && mes === 3))
    return 'Piscis';
}

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
  return [x, y, z]
}

function nroSuerte(cadena) {
  cadena = cadena.replace(" ", "");
  let acum = 0;
  for (let index = 0; index < cadena.length; index++) {
    acum < 9 ? acum++ : acum = 0;
  }
  return acum;
}

function App() {

  const [trivia, setTrivia] = useState();
  const [pasado, setPasado] = useState();
  const [presente, setPresente] = useState();
  const [futuro, setFuturo] = useState();

  const [data, setData] = useState();
  const [formvalues, setFormvalues] = useState();

  const [visible, setVisible] = useState(false);
  const [visibleFut, setVisibleFut] = useState(false);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (formvalues) {
      fetch("https://luna-magica-api.deno.dev/signos")
        .then(res => res.json())
        .then((result) => {
          setData(result[formvalues.signo]);
          setVisible(true);
        }, (error) => {
          console.log(error);
        });
    }
  }, [formvalues]);

  useEffect(() => {
    if (trivia) {
      fetch("https://luna-magica-api.deno.dev/cartas")
        .then(res => res.json())
        .then((result) => {
          setPasado(result[trivia[0]]);
          setPresente(result[trivia[1]]);
          setFuturo(result[trivia[2]]);

        }, (error) => {
          console.log(error);
        });
    }
  }, [trivia]);

  const handleCards = () => {
    setVisibleFut(false);
    // Obtiene tres numeros distintos y al azar para referenciar las cartas
    setTrivia(getTrivia(1, 22));
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setVisibleFut(true);
    }, 2000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target["nombre"].value.trim()) {
      alert("Falta llenar el campo nombre");
      e.target["nombre"].focus();
      return;
    };
    if (!e.target["nac"].value) {
      alert("Falta elegir una fecha de nacimiento");
      e.target["nac"].focus();
      return;
    };
    if (!e.target["sexo"].value) {
      alert("Falta llenar el campo sexo");
      e.target["sexo"].focus();
      return;
    };

    const [y, m, d] = (e.target["nac"].value).split('-');
    setFormvalues({
      "nombre": e.target["nombre"].value,
      "nac": { "dia": d, "mes": m, "anio": y },
      "sexo": e.target["sexo"].value,
      "edad": "",
      "signo": obtieneSigno(d, m),
      "nroSuerte": nroSuerte(e.target["nombre"].value)
    });
  }

  function exportar(e) {

    html2canvas(document.querySelector('#main-content')).then((canvas) => {

      let img = canvas.toDataURL("img/pdf");
      let link = document.createElement('a');
      link.download = "tarjeta.pdf";
      link.href = img;
      link.click();
    });

  }

  return (
    // <div className="container rounded bg-dark bg-gradient text-white"  >
    <div className="container rounded text-white"  >
      <Background />
      <div className='row'>
        <div className='col-10'>
          <h1><span className="badge bg-secondary">Luna mágica - Prueba tu suerte </span></h1>
        </div>
      </div>

      <div className='row'>
        <div className='col-10'>
          <MainInfo />
        </div>
        <div className='col-4'>
          <form onSubmit={handleSubmit} >
            <div className=''>
              <label className="form-label">Nombre completo </label>
              <input className='form-control' type="text" name="nombre" />
            </div>
            <div className=''>
              <label className="form-label" htmlFor="nac">Fecha de nacimiento</label>
              <input className='form-control' type="date" id="nac" name="nac" min="1930-01-01" max="2010-01-01" ></input>
            </div>
            <div className=''>
              <label className="form-label">Sexo </label>
              <select className='form-control' name='sexo'>
                <option value=""  >Seleccione una opción</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
            <input type="submit" className='btn btn-primary' value="Enviar" />
          </form>
        </div>

        <div id="main-content">
          {visible &&
            <>
              <div className='row'>
                <div className='col'>
                  <h2><span className="badge bg-secondary">{formvalues.nombre}</span></h2>
                  <h3><span className="badge bg-secondary">Nro de la suerte: {formvalues.nroSuerte}</span></h3>
                  <ContainerBox title={formvalues.signo} text={data.Descripcion} imgpath={`./img/signos/${String(formvalues.signo).toLowerCase()}.jpg`} />
                  <input data-html2canvas-ignore type="button" className='btn btn-primary' value="Consultar suerte" onClick={handleCards} />
                </div>
              </div>
            </>
          }
          {cargando &&
            <div><h2>cargando...</h2></div>
          }
          {visibleFut &&
            <div className='row' >
              <div className='col'>
                <Card header={"Pasado"} title={pasado["nombre"]} desc={pasado["significado"]} img={`./img/cartas/${trivia[0]}.jpg`} />
              </div>
              <div className='col'>
                <Card header={"Presente"} title={presente["nombre"]} desc={presente["significado"]} img={`./img/cartas/${trivia[1]}.jpg`} />
              </div>
              <div className='col'>
                <Card header={"Futuro"} title={futuro["nombre"]} desc={futuro["significado"]} img={`./img/cartas/${trivia[2]}.jpg`} />
              </div>
              <input data-html2canvas-ignore type="button" className='btn btn-primary' value="Exportar contenido" onClick={exportar} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
