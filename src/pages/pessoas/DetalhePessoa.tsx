import { useNavigate, useParams } from 'react-router-dom';
import { BarraAcoesEdicao } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';

export const DetalhePessoa: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const handleSave = () => {
    console.log('save');
  }

  const handleDelete = () => {
    console.log('delete');
  }
    
  return (
    <LayoutBase 
      titulo='Detalhe de pessoa'
      toolbar={
        <BarraAcoesEdicao
          rotuloNovo='Nova'
          mostrarNovo={id !== 'nova'}
          mostrarDeletar={id !== 'nova'}
          mostrarSalvar
          eventoNovo = {() => navigate('/pessoas/detalhe/nova')}
          eventoVoltar = {() => navigate('/pessoas')}
          eventoSalvar = {handleSave}
          eventoDeletar = {handleDelete}
        />
      }
    >
      <p>Detalhe Pessoa {id}</p>
    </LayoutBase>

  );
};