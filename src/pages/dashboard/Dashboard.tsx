import { BarraAcoesEdicao } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts/LayoutBase';

export const Dashboard = () => {
  return (
    <LayoutBase 
      titulo="Página Inicial" 
      toolbar={<BarraAcoesEdicao  
        rotuloNovo="Novo" 
        mostrarNovo
        prontoNovo
        mostrarDeletar
        prontoDeletar 
        mostrarSalvar
        prontoSalvar
      />} 
    >Testando</LayoutBase>
  );
};