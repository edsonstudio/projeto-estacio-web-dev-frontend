import Acao from "./acao.model";
import Cliente from "./cliente.model";

class Carteira {
  id: number = 0;
  quantidade: number = 0;
  idCliente: number = 0;
  idAcao: number = 0;

  Cliente: Cliente = new Cliente;
  Acao: Acao = new Acao;
}
export default Carteira;
