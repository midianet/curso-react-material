
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, ListagemCidade, ListagemPessoa, DetalhePessoa} from '../pages';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () =>  {

  const { setDrawerOptions } = useDrawerContext();
  
  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página Inicial'
      },
      {
        icon: 'people',
        path: '/pessoas',
        label: 'pessoas'
      },
      {
        icon: 'location_city',
        path: '/cidades',
        label: 'Cidades'
      }
    ]);
  },[]); 

  return (<Routes>
    <Route path="/pagina-inicial" element={<Dashboard />}/>
    <Route path="/cidades" element={<ListagemCidade />}/>
    <Route path="/cidades/detalhe/:id" element={<ListagemCidade />}/>
    <Route path="/pessoas" element={<ListagemPessoa/>}/>
    <Route path="/pessoas/detalhe/:id" element={<DetalhePessoa />}/>
    <Route path="*" element={<Navigate to={'/pagina-inicial'} />} />
  </Routes>
  );
};