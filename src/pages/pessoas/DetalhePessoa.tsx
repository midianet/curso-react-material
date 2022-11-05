import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BarraAcoesEdicao } from '../../shared/components';
import { VTextField } from '../../shared/forms';
import { LayoutBase } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

interface IFormData {
  email: string;
  cidadeId: number;
  nome: string;
}

export const DetalhePessoa: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');
  const formRef = useRef<FormHandles>(null);
  
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
            formRef.current?.setData(result);
          }
        });
    }
  }, [id]);

  const handleSave = (dados: IFormData ) => {
    console.log(dados);
    setIsLoading(true);
    if(id === 'nova'){
      PessoasService.create(dados)
        .then((result) => {
          setIsLoading(false);
          if(result instanceof Error){
            alert(result.message);
          }else{
            navigate('/pessoas');
          }
        });
    }else{
      PessoasService.updateById(Number(id), {id: Number(id), ...dados})
        .then((result) => {
          setIsLoading(false);
          if(result instanceof Error){
            alert(result.message);
          }else{
            navigate('/pessoas');
          }
        });
    }
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
          eventoSalvar = {() => formRef.current?.submitForm()}
          eventoDeletar = {() => handleDelete(Number(id))}
        />
      }
    >
      <Form ref={formRef}  onSubmit={handleSave} >
        <VTextField placeholder="Nome" name="nome"/>
        <VTextField placeholder="Email" name="email"/>
        <VTextField placeholder="Cidade" name="cidadeId"/>
      </Form> 
    </LayoutBase>
  );

};