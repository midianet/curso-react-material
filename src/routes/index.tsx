import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

export const AppRoutes = () =>  {
    return (<Routes>
        <Route path="/pagina-inicial" element={<p><Button variant="contained" color='primary'>Teste</Button></p>}/>
        <Route path="*" element={<Navigate to={"/pagina-inicial"} />} />
    </Routes>
    );
} 