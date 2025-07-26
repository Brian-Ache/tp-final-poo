import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function MultipleSelectUsuarios({ rolSeleccionado }) {
  const [rol, setEstado] = React.useState(''); // Estado local del menú desplegable

  const handleChange = (event) => {
    const nuevoRol = event.target.value;
    setEstado(nuevoRol);           // ✅ Actualiza el valor visual del select
    rolSeleccionado(nuevoRol);        // ✅ Informa al padre el nuevo estado
  };

  return (
    <Box sx={{ minWidth: 0 }}>
      <FormControl fullWidth size='small'>
        <InputLabel id="rol-select-label">Rol</InputLabel>
        <Select
          labelId="rol-select-label"
          id="rol-select"
          value={rol}
          label="Rol"
          onChange={handleChange}
          size='small'
        >
          <MenuItem value="Todos">Todos</MenuItem>
          <MenuItem value="Trabajador">Trabajador</MenuItem>
          <MenuItem value="Tecnico">Tecnico</MenuItem>
          <MenuItem value="Administrador">Administrador</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}