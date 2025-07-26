import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectUsuarioEstado({ estadoSeleccionado }) {
  const [estado, setEstado] = React.useState(''); // Estado local del menú desplegable

  const handleChange = (event) => {
    const nuevoEstado = event.target.value;
    setEstado(nuevoEstado);           // ✅ Actualiza el valor visual del select
    estadoSeleccionado(nuevoEstado);        // ✅ Informa al padre el nuevo estado
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size='small'>
        <InputLabel id="estado-select-label">Estado</InputLabel>
        <Select
          labelId="estado-select-label"
          id="estado-select"
          value={estado}
          label="Estado"
          onChange={handleChange}
          size='small'
        >
          <MenuItem value="Todos">Todos</MenuItem>
          <MenuItem value="Activo">Activo</MenuItem>
            <MenuItem value="Bloqueado">Bloqueado</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}