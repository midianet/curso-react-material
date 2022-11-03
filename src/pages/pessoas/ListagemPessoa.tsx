import { useSearchParams } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import { BarraAcoesLista } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

export const ListagemPessoa: React.FC = () => {
  
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  },[searchParams]);

  useEffect(() => {
    PessoasService.getAll()
      .then((result) => {
        if(result instanceof Error){
          alert(result.message);
        }else{
          console.log(result);
        }
      });
  },[busca]);


  return (
    <LayoutBase titulo="Listagem de Pessoas" toolbar= {
      <BarraAcoesLista
        mostrarPesquisa={true}
        mostrarNovo={true}
        rotuloNovo='Nova'
        textoPesquisa={busca}
        eventoPesquisa={texto => setSearchParams({busca:texto})}
      />
    }>

    </LayoutBase>
  );
};