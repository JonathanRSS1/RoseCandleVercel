import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import Button from "./Button";



const DataGrid = ({ title,
    columns,
    rows,
    deleteRow,
    updateRow,
    loading,
    primaryBtnText,
    secondaryBtnText,
    onClickPrimaryBtn,
    onClickSecondaryBtn,
    editable = true }) => {
    //Obtenes los valores anidados
    //ejemplo: product.idCategory.name
    const getNestedValue = (obj, path) => {
        try {
            const value = path.split('.').reduce((acc, key) => {
                const arrayMatch = key.match(/^(\w+)\[(\d+|last)\]$/);
                if (arrayMatch) {
                    const [, arrKey, index] = arrayMatch;
                    const realIndex = index === "last" ? acc?.[arrKey]?.length - 1 : Number(index);
                    return acc?.[arrKey]?.[realIndex];
                }
                return acc?.[key];
            }, obj);

            // ✅ Si es Date, convertir a string
            if (value instanceof Date) return value.toLocaleDateString("en-GB");

            return value ?? "-";
        } catch {
            return "-";
        }
    };

    const StatusBadge = ({ status }) => {
        const map = {
            pending: ["bg-yellow-100", "text-yellow-600"],
            processing: ["bg-orange-100", "text-orange-600"],
            shipped: ["bg-blue-100", "text-blue-600"],
            delivered: ["bg-green-100", "text-green-600"],
            cancelled: ["bg-red-100", "text-red-600"],
        };

        const [bg, text] = map[status?.toLowerCase()] || ["bg-gray-100", "text-gray-600"];

        return (
            <span className={`px-4 py-1 rounded-full text-sm font-medium ${bg} ${text}`}>
                {status}
            </span>
        );
    };


    //Paginación de la tabla
    //Variables 
    const [currentPage, setCurrentPage] = useState(1);
    //Filas por página
    const rowsPerPage = 10;

    //Páginas totales
    const totalPages = Math.ceil(rows.length / rowsPerPage);

    const paginatedRows = rows.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div className="flex flex-col relative overflow-x-auto sm:rounded-lg bg-stone-50 text-[#333] shadow-xl">
            <div className="flex justify-between items-center">
                <h2 className="p-2 text-xl font-semibold">{title}</h2>
                <div className="flex gap-4 px-4">
                    {secondaryBtnText && (
                        <Button
                            buttonText={secondaryBtnText}
                            showIcon={true}
                            type={"button"}
                            onClick={onClickSecondaryBtn}
                        />
                    )}
                    {primaryBtnText && (
                        <Button
                            buttonText={primaryBtnText}
                            showIcon={true}
                            type={"button"}
                            onClick={onClickPrimaryBtn}
                        />
                    )}



                </div>

            </div>
            <div className="w-full shadow-md border border-gray-300 rounded-full"></div>

            <table className="w-full text-sm text-center rtl:text-right text-gray-500">
                <thead className="text-xs uppercase text-black bg-white">
                    <tr>
                        {Object.keys(columns).map((columnName) => (
                            <th key={columnName} className="px-4 py-2">{columnName}</th>
                        ))}
                        {editable && <th className="px-6 py-3">Acciones</th>}
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={Object.keys(columns).length + (editable ? 1 : 0)} className="text-center py-4">
                                Cargando...
                            </td>
                        </tr>
                    ) : (
                        paginatedRows.map((row, index) => (
                            <tr key={row._id || index} className="odd:bg-[#F0ECE6] even:bg-white">
                                {Object.entries(columns).map(([columnName, columnKey], colIndex) => {
                                    const value = getNestedValue(row, columnKey);
                                    const isBadgeColumn = columnName === "Estado" && typeof value === "string" && isNaN(value);

                                    return (
                                        <td key={colIndex} className="px-6 py-4">
                                            {isBadgeColumn ? <StatusBadge status={value} /> : String(value)}
                                        </td>
                                    );
                                })}
                                {editable && (
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center items-center gap-4">
                                            <Trash onClick={() => deleteRow(row)} className="cursor-pointer" />
                                            <Pencil onClick={() => updateRow(row)} className="cursor-pointer" />
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="flex justify-center items-center mt-4 mb-4 gap-4 text-sm text-[#333]">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Anterior
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>
        </div >
    );
};

export default DataGrid;