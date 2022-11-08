import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BarraAcoesEdicao } from '../../shared/components';
import { VForm, VTextField, useVForm, IVFormErrors } from '../../shared/forms';
import { CidadeService } from '../../shared/services/api/cidades/CidadeService';
import { LayoutBase } from '../../shared/layouts';

import  * as yup  from 'yup';

interface IFormData {
  nome: string;
}
const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  nome: yup.string().required().min(3), 
});

export const CidadeEditor: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');
  const { formRef, save } = useVForm();
  
  useEffect(() => {
    if(id !== 'nova') {
      setIsLoading(true);      
      CidadeService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
            navigate('/cidades');
          }else{
            setNome(result.nome);
            formRef.current?.setData(result);
          }
        });
    }else{
      formRef.current?.setData({
        nome: ''
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData ) => {

    formValidationSchema.
      validate(dados, { abortEarly:false })
      .then((dadosValidos) =>{
        setIsLoading(true);
        if(id === 'nova'){
          CidadeService.create(dadosValidos)
            .then((result) => {
              setIsLoading(false);
              if(result instanceof Error){
                alert(result.message);
              }else{
                navigate('/cidades');
              }
            });
        }else{
          CidadeService.updateById(Number(id), {id: Number(id), ...dadosValidos})
            .then((result) => {
              setIsLoading(false);
              if(result instanceof Error){
                alert(result.message);
              }else{
                navigate('/cidades');
              }
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationsErrors: IVFormErrors = {};
        errors.inner.forEach(error => {
          if(!error.path) return;
          validationsErrors[error.path] = error.message;
        });
        formRef.current?.setErrors(validationsErrors);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente Deseja Apagar?')){
      CidadeService.deleteById(id)
        .then(result => {
          if(result instanceof Error){
            alert(result.message);
          }else{
            alert('Registro apagado com sucesso!');
            navigate('/cidades');
          }
        });
    }
  };
    
  return (
    <LayoutBase 
      titulo={id === 'nova' ? 'Nova Cidade' : nome}
      toolbar={
        <BarraAcoesEdicao
          rotuloNovo='Nova'
          mostrarNovo={id !== 'nova'}
          mostrarDeletar={id !== 'nova'}
          mostrarSalvar
          prontoSalvar={!isLoading}
          prontoNovo={!isLoading}
          prontoDeletar={!isLoading}
          eventoNovo = {() => navigate('/cidades/detalhe/nova')}
          eventoVoltar = {() => navigate('/cidades')}
          eventoSalvar = {save}
          eventoDeletar = {() => handleDelete(Number(id))}
        />
      }
    >
      <VForm ref={formRef}  onSubmit={handleSave} >
        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant = "outlined">
          <Grid container direction="column" padding={2} spacing={4} >
            {isLoading && (<Grid item>
              <LinearProgress variant="indeterminate"/>
            </Grid>
            )}
            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <VTextField
                  fullWidth
                  label="Nome"
                  disabled={isLoading}
                  placeholder="Nome" 
                  onChange={e => setNome(e.target.value)}
                  name="nome"/>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm> 
    </LayoutBase>
  );

};