// src/components/CardProductDetail.jsx
import { useState } from "react";
import AddToCartButton from "./ButtonAddToCard.jsx";
import GalleryImages from "./GalleryImages.jsx";

const CardProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="radial-gradient(circle, rgba(223, 204, 172, 0.63) 0%, rgba(223, 204, 172, 0) 40%) max-w-6xl w-full rounded-2xl p-8 flex gap-30 flex-col md:flex-row">
      <GalleryImages product={product} />

      <div className="flex-1 space-y-4">
        <h3 className="text-xs italic text-gray-400">ROSE CANDLE CO</h3>
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-gray-600 text-lg">{product.description}</p>

        {product.useForm?.length > 0 ? (
          <div className="flex flex-col gap-2">
            <h3 className="text-gray-400 ">Recomendaciones:</h3>
            {product.useForm.map((comp, i) => (
              <p key={i} className="text-sm text-black px-3 py-1">
                {comp.instruction}
              </p>
            ))}
          </div>
        ) : (
          <p>No hay instrucciones disponibles.</p>
        )}

        <p className="text-2xl font-semibold text-black pl-2">
          ${parseFloat(product.currentPrice).toFixed(2)} USD
        </p>

        <div className="flex flex-col items-center gap-4 pt-4 w-full max-w-sm">
          <span className="text-sm text-gray-600 self-start pl-2">Quantity</span>

          <div className="flex items-center justify-center gap-2 border rounded-2xl p-2 w-full">
            <button
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              className="text-black px-2 rounded hover:scale-90 hover:bg-gray-300 text-2xl transition-transform duration-200"
            >
              -
            </button>
            <span className="px-2">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="text-black px-2 rounded hover:scale-90 hover:bg-gray-300 text-2xl transition-transform duration-200"
            >
              +
            </button>
          </div>

          <AddToCartButton product={product} quantity={quantity} />
        </div>
      </div>
    </div>
  );
};

export default CardProductDetail;
