import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { calculateShipping } from '../utils/shipping';

export default function CartDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, cartTotal } = useCart();
  const [cep, setCep] = useState('');
  const [shippingCost, setShippingCost] = useState(null);

  const handleShippingCalculation = async () => {
    const cost = await calculateShipping(cep, cartTotal);
    setShippingCost(cost);
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    } z-50`}>
      <div className="h-full flex flex-col">
        <div className="px-4 py-6 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Carrinho</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Seu carrinho está vazio</p>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
                      >
                        -
                      </button>
                      <span className="mx-2 text-gray-700 dark:text-gray-300">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-4 py-6 border-t dark:border-gray-700">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Calcular Frete
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                placeholder="Digite seu CEP"
                className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
              <button
                onClick={handleShippingCalculation}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md"
              >
                Calcular
              </button>
            </div>
            {shippingCost && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Frete: R$ {shippingCost.toFixed(2)}
              </p>
            )}
          </div>

          <div className="flex justify-between mb-4">
            <span className="text-gray-700 dark:text-gray-300">Subtotal</span>
            <span className="font-medium text-gray-900 dark:text-white">
              R$ {cartTotal.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => {
              onClose();
              navigate('/checkout');
            }}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-100"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}