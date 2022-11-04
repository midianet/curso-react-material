import { LinearProgress } from '@mui/material';
import { Form } from '@unform/web';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BarraAcoesEdicao } from '../../shared/components';
import { VTextField } from '../../shared/forms';
import { LayoutBase } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

export const DetalhePessoa: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');
  
  useEffect(() => {
    if(id !== 'nova') {
      setIsLoading(true);      
      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
            navigate('/pessoas');
          }else{
            setNome(result.nome);
            console.log(result);
          }
        });
    }
  }, [id]);

  const handleSave = () => {
    console.log('save');
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente Deseja Apagar?')){
      PessoasService.deleteById(id)
        .then(result => {
          if(result instanceof Error){
            alert(result.message);
          }else{
            alert('Registro apagado com sucesso!');
            navigate('/pessoas');
          }
        });
    }
  };
    
  return (
    <LayoutBase 
      titulo={id === 'nova' ? 'Nova Pessoa' : nome}
      toolbar={
        <BarraAcoesEdicao
          rotuloNovo='Nova'
          mostrarNovo={id !== 'nova'}
          mostrarDeletar={id !== 'nova'}
          mostrarSalvar
          prontoSalvar={!isLoading}
          prontoNovo={!isLoading}
          prontoDeletar={!isLoading}
          eventoNovo = {() => navigate('/pessoas/detalhe/nova')}
          eventoVoltar = {() => navigate('/pessoas')}
          eventoSalvar = {handleSave}
          eventoDeletar = {() => handleDelete(Number(id))}
        />
      }
    >
      {isLoading &&(
        <LinearProgress variant='indeterminate' />
      )}
      <Form onSubmit={console.log} >
        <VTextField 
          name='nome'
          
        />
      </Form>
    </LayoutBase>
  );

};