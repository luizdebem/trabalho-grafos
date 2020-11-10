import image from './mapa.png';
import matrizImg from './matrizValorada.png';
import Graph from './Grafo';
import { useState } from 'react';
import matrizValorada from './matriz.json';
import './App.css';
import { Button, Form } from 'react-bootstrap';

function App() {
  const [cidadeOrigem, setCidadeOrigem] = useState('1');
  const [cidadeDestino, setCidadeDestino] = useState('1');
  const [caminhoMinimo, setCaminhoMinimo] = useState([]);
  const [toggleImage, setToggleImage] = useState(false);
  const graph = new Graph(matrizValorada);

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = graph.caminhoMinimo(cidadeOrigem, cidadeDestino);
    setCaminhoMinimo(res);
  }

  const handleToggleImage = () => {
    setToggleImage(!toggleImage);
  }

  return (
    <div className="main center">
      <h1>AV2 - Programação Linear e Grafos</h1>
      <div className="enunciado">
        De forma a reduzir seus custos operacionais, uma empresa de transporte de
        cargas do estado, deseja oferecer aos motoristas de sua frota um mecanismo que os
        auxilie a selecionar o caminho de menor custo entre quaisquer duas cidades por ela
        servidas (as cidades são apresentadas na figura e os custos de transportes entre as duas
        cidades na <a href="#" onClick={() => { handleToggleImage() }}>matriz valorada</a>). <br />
        Desenvolver uma aplicação para mostrar o caminho de custo mínimo entre duas
        cidades quaisquer servidas pela empresa e as cidades pelas que o transporte deverá
        passar para chegar da cidade origem a cidade destino.
      </div>

      {toggleImage && <img src={matrizImg} alt="Matriz Valorada" className="image" />}

      <img src={image} alt="Mapa" className="image" />

      <Form onSubmit={handleSubmit} className="center">
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Cidade origem:</Form.Label>
          <Form.Control as="select" onChange={e => { setCidadeOrigem(e.target.value) }}>
            <option defaultValue value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Cidade destino:</Form.Label>
          <Form.Control as="select" onChange={e => { setCidadeDestino(e.target.value) }}>
            <option defaultValue value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
          </Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mb-3">Calcular o menor caminho</Button>

        {caminhoMinimo.length > 0 && <p>Resposta: {caminhoMinimo.map((aresta, indice, array) => {
          return array.length - 1 === indice ? aresta : aresta + ' -> ';
        })}</p>}

      </Form>
    </div>
  );
}

export default App;
