import { useSearchParams } from 'react-router-dom';
import { useMemo, useEffect, useState } from 'react';
import { BarraAcoesLista } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { CidadesService, IListagemCidade } from '../../shared/services/api/cidades/CidadeService';
import { useDebounce } from '../../shared/hooks';


export const ListagemCidade: React.FC = () => {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(1000);
  
  const [rows, setRows] = useState<IListagemCidade[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);


  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  },[searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      CidadesService.getAll()
        .then((result) => {
          setIsLoading(false);
          if(result instanceof Error){
            alert(result.message);
          }else{
            console.log(result);
            setRows(result.data);
            setTotalCount(result.totalCount);
          }
        });
    });
  },[busca]);

  return (
    <LayoutBase titulo="Listagem de Cidades" toolbar= {
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