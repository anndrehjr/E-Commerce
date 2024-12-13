import React, { useState } from 'react';
import { useCart } from '../context/CartContext';


export function PaymentProcessor({ onSuccess, onError }) {
  const { cartTotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [loading, setLoading] = useState(false);
  const [pixCode, setPixCode] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Simula o processamento do pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (paymentMethod === 'pix') {
        // Em uma aplicação real, isso viria do seu backend
        setPixCode('00020126580014BR.GOV.BCB.PIX0136123e4567-e12b-12d1-a456-426655440000');
      }
      
      onSuccess();
    } catch (error) {
      onError('Falha no processamento do pagamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="space-y-6">
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Método de Pagamento</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Selecione como deseja pagar</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="radio"
              id="pix"
              name="paymentMethod"
              value="pix"
              checked={paymentMethod === 'pix'}
              onChange={() => setPaymentMethod('pix')}
              className="sr-only"
            />
            <label
              htmlFor="pix"
              className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer ${
                paymentMethod === 'pix'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                  : 'border-gray-200 bg-white dark:bg-gray-700'
              }`}
            >
              <span className="font-medium text-gray-900 dark:text-white">PIX</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Pagamento instantâneo</span>
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="card"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
              className="sr-only"
            />
            <label
              htmlFor="card"
              className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer ${
                paymentMethod === 'card'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                  : 'border-gray-200 bg-white dark:bg-gray-700'
              }`}
            >
              <span className="font-medium text-gray-900 dark:text-white">Cartão</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Crédito ou Débito</span>
            </label>
          </div>
        </div>

        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Número do Cartão</label>
              <input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Validade</label>
                <input
                  id="expiry"
                  type="text"
                  placeholder="MM/AA"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 dark:text-gray-300">CVC</label>
                <input
                  id="cvc"
                  type="text"
                  placeholder="123"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'pix' && pixCode && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-center break-all text-gray-800 dark:text-gray-200">{pixCode}</p>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(pixCode)}
              className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Copiar código PIX
            </button>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-900 dark:text-white">Total:</span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">R$ {cartTotal.toFixed(2)}</span>
        </div>

        {(!pixCode || paymentMethod === 'card') && (
          <button 
            onClick={handlePayment} 
            className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Finalizar Pagamento'}
          </button>
        )}
      </div>
    </div>
  );
}

