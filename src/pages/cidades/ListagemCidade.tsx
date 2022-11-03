import { useSearchParams } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import { BarraAcoesLista } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { CidadesService } from '../../shared/services/api/cidades/CidadeService';
import { useDebounce } from '../../shared/hooks';


export const ListagemCidade: React.FC = () => {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000);
  
  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  },[searchParams]);

  useEffect(() => {
    debounce(() => {
      CidadesService.getAll()
        .then((result) => {
          if(result instanceof Error){
            alert(result.message);
          }else{
            console.log(result);
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