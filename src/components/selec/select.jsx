import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function MultipleSelect({ estadoSeleccionado }) {
  const [estado, setEstado] = React.useState(''); // Estado local del menú desplegable

  const handleChange = (event) => {
    const nuevoEstado = event.target.value;
    setEstado(nuevoEstado);           // ✅ Actualiza el valor visual del select
    estadoSeleccionado(nuevoEstado);        // ✅ Informa al padre el nuevo estado
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="estado-select-label">Estado</InputLabel>
        <Select
          labelId="estado-select-label"
          id="estado-select"
          value={estado}
          label="Estado"
          onChange={handleChange}
        >
          <MenuItem value="Todos">Todos</MenuItem>
          <MenuItem value="Atendido">Atendido</MenuItem>
          <MenuItem value="No atendido">No atendido</MenuItem> {/* Asegurate de que coincida con el string exacto del ticket */}
        </Select>
      </FormControl>
    </Box>
  );
}