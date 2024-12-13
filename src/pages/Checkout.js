import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PaymentProcessor } from '../components/PaymentProcessor';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { BsMoon, BsSun } from 'react-icons/bs';
import { useTheme } from '../context/ThemeContext';

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    cep: '',
  });
  const [error, setError] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((field) => field.trim() === '')) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    setIsFormSubmitted(true);
    setError('');
  };


  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} py-12`}>
      <nav className={`fixed top-0 left-0 right-0 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} shadow-md z-50`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
              <FaArrowLeft size={20} className="mr-2" />
              <span>Voltar</span>
            </Link>
            <button onClick={() => navigate('/products/cadernos')} className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
              Cadernos
            </button>
            <button onClick={() => navigate('/products/presente')} className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
              Presentes
            </button>
            <button onClick={() => navigate('/products/canecas')} className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
              Canecas
            </button>
            <button onClick={() => navigate('/products/adesivos')} className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
              Adesivos
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
              <FaShoppingCart size={24} />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {items.length}
                </span>
              )}
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-200"
              aria-label="Alternar modo escuro"
            >
              {isDarkMode ? <BsSun size={20} className="text-yellow-400" /> : <BsMoon size={20} className="text-gray-600" />}
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
          <h2 className="text-2xl font-semibold mb-6">Informações de Entrega</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campos do formulário */}
            {Object.entries(formData).map(([key, value]) => (
              <div key={key}>
                <label htmlFor={key} className="block text-sm font-medium capitalize">
                  {key.replace('_', ' ')}
                </label>
                <input
                  id={key}
                  name={key}
                  type="text"
                  value={value}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100' : ''}`}
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              Continuar para o Pagamento
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
            <h2 className="text-2xl font-semibold mb-6">Resumo do Pedido</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr className="border-gray-200 dark:border-gray-700" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>R$ {cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {isFormSubmitted && (
            <PaymentProcessor 
              onSuccess={() => {
                clearCart();
                navigate('/confirmation', { state: { orderDetails: formData } });
              }}
              onError={(error) => setError(error)}
            />
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Erro!</strong> {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

