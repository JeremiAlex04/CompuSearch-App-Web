import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useCategorias } from "../../features/navigation/hooks/useCategorias";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const { categorias } = useCategorias();

    const navigate = useNavigate();
    const searchRef = useRef(null);
    const timerRef = useRef(null);

    // LÓGICA DE BÚSQUEDA "DEBOUNCED"
    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        if (query.trim().length < 2) {
            setSuggestions([]);
            setTotalResults(0);
            setLoading(false);
            setIsDropdownVisible(false);
            return;
        }

        setLoading(true);
        setIsDropdownVisible(true); // Mostrar dropdown al buscar

        timerRef.current = setTimeout(async () => {
            try {
                const res = await axios.get(
                    `/componentes/buscar`,
                    {
                        params: {
                            nombre: query,
                            page: 0,
                            size: 5
                        }
                    }
                );

                setSuggestions(res.data.content || []);
                setTotalResults(res.data.totalElements || 0);

            // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setSuggestions([]);
                setTotalResults(0);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };

    }, [query]);

    // CERRAR DROPDOWN AL HACER CLIC FUERA
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                // Simplemente oculta el dropdown
                setIsDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // MANEJADOR DEL SUBMIT (Enter o botón 'Ver más')
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() !== "" || selectedCategory !== "") {
            let url = '/componentes';
            const params = new URLSearchParams();
            if (query.trim()) params.append('search', query);
            if (selectedCategory) params.append('categoria', selectedCategory);
            
            navigate(`${url}?${params.toString()}`);
            setQuery("");
            setSuggestions([]);
            setTotalResults(0);
            setIsDropdownVisible(false);
        }
    };

    // Función para limpiar al hacer clic en un item
    const handleSuggestionClick = () => {
        setQuery("");
        setSuggestions([]);
        setTotalResults(0);
        setIsDropdownVisible(false);
    };

    // Mostrar dropdown si se hace foco en el input
    const handleInputFocus = () => {
        if (query.trim().length > 1) {
            setIsDropdownVisible(true);
        }
    };

    return (
        <div
            className="d-flex col-12 col-lg-6 mx-auto mt-3 mt-lg-0 order-lg-2"
            ref={searchRef}
            style={{ position: 'relative' }}
        >
            <form
                className="w-100"
                role="search"
                onSubmit={handleSubmit}
            >
                <div className="input-group search-bar-group">
                    <select 
                        className="form-select search-category-select ps-3 pe-4 d-none d-md-block" 
                        style={{borderRight: '1px solid #e2e8f0'}}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Todas las categorías</option>
                        {categorias.map(cat => (
                            <option key={cat.idCategoria || cat.id} value={cat.nombre}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                    <input
                        className="form-control search-input"
                        type="search"
                        placeholder="¿Qué estás buscando?"
                        aria-label="Buscar"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={handleInputFocus}
                        autoComplete="off"
                    />
                    <button className="btn search-btn text-white" type="submit">
                        <i className="bi bi-search me-2"></i>Buscar
                    </button>
                </div>
            </form>

            {isDropdownVisible && query.length > 1 && (
                <div
                    className="list-group search-autocomplete-dropdown"
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        maxHeight: '400px',
                        overflowY: 'auto',
                    }}
                >
                    {loading && (
                        <span className="list-group-item search-autocomplete-item text-muted">
                            Buscando...
                        </span>
                    )}

                    {!loading && suggestions.length > 0 && (
                        <>
                            {suggestions.map((item) => (
                                <Link
                                    key={item.idProductoTienda}
                                    to={`/producto/${encodeURIComponent(item.nombreProducto)}`}
                                    className="list-group-item list-group-item-action search-autocomplete-item d-flex align-items-center"
                                    onClick={handleSuggestionClick}
                                >
                                    <img
                                        src={item.urlImagen || 'https://via.placeholder.com/50'}
                                        alt={item.nombreProducto}
                                        style={{ width: '50px', height: '50px', objectFit: 'contain', marginRight: '15px', borderRadius: '6px', border: '1px solid #f1f5f9' }}
                                    />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p className="mb-0 text-dark text-truncate fw-semibold">
                                            {item.nombreProducto.split(new RegExp(`(${query})`, 'gi')).map((part, i) => 
                                                part.toLowerCase() === query.toLowerCase() ? <span key={i} className="bg-warning text-dark px-1 rounded">{part}</span> : part
                                            )}
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center mt-1">
                                            <span className="badge bg-light text-secondary border">{item.categoria || "Componente"}</span>
                                            <strong className="text-primary">S/ {item.precio?.toFixed(2) || "0.00"}</strong>
                                        </div>
                                    </div>
                                </Link>
                            ))}

                            {totalResults > 5 && (
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="list-group-item list-group-item-action text-center text-primary fw-bold"
                                >
                                    Ver más ({totalResults - 5} resultados)
                                </button>
                            )}
                        </>
                    )}

                    {!loading && suggestions.length === 0 && (
                        <span className="list-group-item list-group-item-action text-muted">
                            No se encontraron resultados para "{query}"
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;