// Classe nó com atributo de prioridade para a fila
class No {
  valor;
  prioridade;

  constructor(valor, prioridade) {
    this.valor = valor;
    this.prioridade = prioridade;
  }
}

// Fila com prioridade, elemento com maior prioridade sempre ficará no topo.
class Fila {

  nos = [];

  // Adicionando nó à fila. Neste momento é realizado ordenação com base na prioridade
  addFila(prioridade, valor) {
    this.nos.push(new No(valor, prioridade));
    this.nos.sort(
      function (a, b) {
        return a.prioridade - b.prioridade;
      }
    )
  }

  // Removendo nó da fila
  removeFila() {
    return this.nos.shift().valor;
  }


  empty() {
    return !this.nos.length;
  }
}

class Grafo {

  // declarando o infinito e os vértices
  infinito = Infinity;
  vertices = {};

  // no construtor, populo os vértices de acordo com a matriz valorada dada (matriz.json)
  constructor(matrizValorada) {
    for (let vertice in matrizValorada) {
      // Aqui estou adicionado um vértice, o primeiro parâmetro é o nome da cidade, e o segundo, um objeto com as arestas
      this.addVertice(vertice, matrizValorada[vertice]);
    }
  }

  // método para adicionar vértice (nome e arestas)
  addVertice(nome, arestas) {
    this.vertices[nome] = arestas;
  }

  // Método para retornar o caminho mínimo, recebe a cidade origem e cidade destino.
  caminhoMinimo(origem, destino) {
    let nos = new Fila();
    let distancias = {};
    let anterior = {};
    let caminho = [];
    let menor;
    let vertice;
    let vizinho;
    let alt;

    // Inicializando as variáveis de distância e fila
    for (vertice in this.vertices) {
      if (vertice === origem) {
        distancias[vertice] = 0;
        nos.addFila(0, vertice);
      } else {
        distancias[vertice] = this.infinito;
        nos.addFila(this.infinito, vertice);
      }

      anterior[vertice] = null;
    }

    while (!nos.empty()) {
      menor = nos.removeFila();

      // Achou o último nó
      if (menor === destino) {

        // Adiciona este nó ao caminho
        while (anterior[menor]) {
          caminho.push(menor);
          menor = anterior[menor];
        }
        break;
      }

      // Não encontrou distância, pula (infinito)
      if (!menor || distancias[menor] === this.infinito) {
        continue;
      }

      // Calcula a distancia pra cada nó vizinho
      for (vizinho in this.vertices[menor]) {
        alt = distancias[menor] + this.vertices[menor][vizinho];

        if (alt < distancias[vizinho]) {
          distancias[vizinho] = alt;
          anterior[vizinho] = menor;
          nos.addFila(alt, vizinho);
        }
      }
    }

    // Caso o ponto de origem não esteja na solução e a solução seja do destino para a origem.
    return caminho.concat(origem).reverse();
  }

}

export default Grafo;