import { useEffect, useState } from "react";

export const useOrigin = () => {
	const [mounted, setMounted] = useState<boolean>(false);
	/**
	 * Determina el origen de la ventana actual.
	 * Si la ventana no está definida, devuelve una cadena vacía.
	 * evita el error de windows no definido en el entorno del server
	 *
	 * @returns {string} El origen de la ventana actual o una cadena vacía si no está disponible.
	 */
	const origin =
		typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return "";

	return origin;
};
