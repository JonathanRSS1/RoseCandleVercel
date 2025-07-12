import { useState, useEffect } from "react";
import PrincipalDiv from "../../global/components/PrincipalDiv";
import DataGrid from "../../global/components/DataGrid";
import FormOneInput from "../../global/components/FormOneInput";
import Dialog from "../../global/components/Dialog";
import { useForm } from "react-hook-form";
import useCollections from "./hooks/useCollections";

const PageCollections = () => {
  const [openDialogCollections, setOpenDialogCollections] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);

  // Inicializa react-hook-form con valores por defecto
  const methods = useForm({
    defaultValues: selectedCollection || {},
  });

  const {
    register,
    handleSubmit,
    errors,
    reset,
    collections,
    createCollection,
    updateCollection,
    deleteCollection,
  } = useCollections(methods);

  // Sincroniza formulario con la colección seleccionada para edición
  useEffect(() => {
    if (selectedCollection) {
      reset(selectedCollection);
    } else {
      reset({ name: "" });
    }
  }, [selectedCollection, reset]);

  // Abrir diálogo para agregar nueva colección
  const handleAdd = () => {
    setSelectedCollection(null);
    setOpenDialogCollections(true);
  };

  // Abrir diálogo para editar colección existente
  const handleEdit = (collection) => {
    setSelectedCollection(collection);
    setOpenDialogCollections(true);
  };

  // Confirmar y eliminar colección seleccionada
  const handleDelete = async (collection) => {
    if (confirm(`¿Eliminar la colección "${collection.name}"?`)) {
      await deleteCollection(collection._id);
    }
  };

  // Enviar formulario para crear o actualizar colección
  const onSubmit = async (data) => {
    if (selectedCollection) {
      await updateCollection(selectedCollection._id, data);
    } else {
      await createCollection(data);
    }
<<<<<<< HEAD
    // ✅ Cierra el modal después de guardar
    setOpenDialogCollections(false);
    // ✅ Limpia selección
    setSelectedCollection(null);
=======
    setOpenDialogCollections(false);
>>>>>>> d4edfd826307944dc9993c81feb3f4d3ddb7b3cf
  };

  const columns = {
    Nombre: "name",
  };

  const rows = collections;

  return (
    <PrincipalDiv>
      {/* Tabla para md+ */}
      <div className="hidden md:block overflow-x-auto">
        <DataGrid
          title="Colecciones"
          columns={columns}
          rows={rows}
          primaryBtnText="Agregar Colección"
          onClickPrimaryBtn={handleAdd}
          updateRow={handleEdit}
          deleteRow={handleDelete}
        />
      </div>

      {/* Vista cards para móviles */}
      <div className="md:hidden pt-13 space-y-4 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Colecciones</h2>
          <button
            onClick={handleAdd}
            className="bg-[#C2A878] text-white px-4 py-2 rounded-md text-sm shadow-md hover:bg-[#a98c6a] transition"
          >
            Agregar
          </button>
        </div>

        {collections.map((collection) => (
          <div
            key={collection._id}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800">{collection.name}</h3>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleEdit(collection)}
                className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(collection)}
                className="text-sm px-3 py-1 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {openDialogCollections && (
<<<<<<< HEAD
        <Dialog
          open={openDialogCollections}
          onClose={() => {
            setOpenDialogCollections(false);
            setSelectedCollection(null);
          }}
        >
=======
        <Dialog open={openDialogCollections} onClose={() => setOpenDialogCollections(false)}>
>>>>>>> d4edfd826307944dc9993c81feb3f4d3ddb7b3cf
          <FormOneInput
            headerLabel={selectedCollection ? "Editar Colección" : "Agregar Colección"}
            onSubmit={handleSubmit(onSubmit)}
            name="name"
            label="Colección"
            register={register}
            onClose={() => {
              setOpenDialogCollections(false);
              setSelectedCollection(null);
            }}
            error={errors.name?.message}
            btnTxt={selectedCollection ? "Guardar Cambios" : "Agregar Colección"}
          />
        </Dialog>
      )}
    </PrincipalDiv>
  );
};

export default PageCollections;
