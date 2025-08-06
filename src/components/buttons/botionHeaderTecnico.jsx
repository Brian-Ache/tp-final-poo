import React, { useState, useRef, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function BotonHeaderTecnico() {
  const [visible, setVisible] = useState(false);
  const panelRef = useRef(null);

  // Cierra el panel si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setVisible(false);
      }
    }

    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible]);

  return (
    <div className="relative inline-block">
      <IconButton
        onClick={() => setVisible(!visible)}
        size="large"
        aria-label="mostrar panel"
        color="inherit"
      >
        <AccountCircle />
      </IconButton>

      {visible && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-2 w-48 rounded-md bg-white p-4 shadow-lg border border-gray-300 z-50"
        >
          Hola mundo
        </div>
      )}
    </div>
  );
}