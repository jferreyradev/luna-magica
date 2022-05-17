import { useState } from 'react';
import Card from './Card';

function obtieneSigno(dia, mes) {
    if ((dia >= 21 && mes == 3) || (dia <= 20 && mes == 4))
        return 'Aries';
    if ((dia >= 24 && mes == 9) || (dia <= 23 && mes == 10))
        return 'Libra';
    if ((dia >= 21 && mes == 4) || (dia <= 21 && mes == 5))
        return 'Tauro';
    if ((dia >= 24 && mes == 10) || (dia <= 22 && mes == 11))
        return 'Escorpio';
    if ((dia >= 22 && mes == 5) || (dia <= 21 && mes == 6))
        return 'Géminis';
    if ((dia >= 23 && mes == 11) || (dia <= 21 && mes == 12))
        return 'Sagitario';
    if ((dia >= 21 && mes == 6) || (dia <= 23 && mes == 7))
        return 'Cáncer';
    if ((dia >= 22 && mes == 12) || (dia <= 20 && mes == 1))
        return 'Capricornio';
    if ((dia >= 24 && mes == 7) || (dia <= 23 && mes == 8))
        return 'Leo';
    if ((dia >= 21 && mes == 1) || (dia <= 19 && mes == 2))
        return 'Acuario';
    if ((dia >= 24 && mes == 8) || (dia <= 23 && mes == 9))
        return 'Virgo';
    if ((dia >= 20 && mes == 2) || (dia <= 20 && mes == 3))
        return 'Piscis';
}


const InputForm = () => {

    const [signo, setSigno] = useState("");
    const [data, setData] = useState({});
    const [formvalues, setFormvalues] = useState([]);

    function isRequired(value) {
        console.log(value)
        return value !== null && value.trim().length > 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let arr = [];

        for (let index = 0; index < e.target.length - 1; index++) {

            //if ((e.target[index].value) !== null && (e.target[index].value.trim())>0 ){
            arr.push({ [(e.target[index]).name]: e.target[index].value });
            //}
            //else{
            //  arr = [];
            //  break;
            //}      
        }
        if (arr.length > 0) {
            setFormvalues(arr);
        } else {
            return 'Faltan completar datos en el formulario.';
        }
        //let d = new Date(e.target["nac"].value);
        let [y, m, d] = (e.target["nac"].value).split('-');
        setSigno(obtieneSigno(d,m));

        fetch("https://luna-magica-api.deno.dev/signos")
            .then(res => res.json())
            .then((result) => {
                setData(result[signo])
                }, (error) => {console.log(error);
            });
    }

    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className='mb-3'>
                    <label className="form-label">Nombre completo </label>
                    <input className='form-control' type="text" name="nombre" />
                </div>
                <div className='mb-3'>
                    <label className="form-label" htmlFor="nac">Fecha de nacimiento</label>
                    <input className='form-control' type="date" id="nac" name="nac" min="1930-01-01" max="2010-01-01" ></input>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Sexo </label>
                    <select className='form-control' name='sexo'>
                        <option disabled value="" selected >Seleccione una opción</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                </div>
                <input type="submit" className='btn btn-primary' value="Enviar" />
            </form>
            <div id="output">
                {signo && <Card title={signo} desc={data.Descripcion} img={`./img/signos/${signo.toLowerCase()}.jpg`} /> }
            </div>
        </>
    )
}

export default InputForm;