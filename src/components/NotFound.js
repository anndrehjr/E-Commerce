import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Página Não Encontrada</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Desculpe, a página que você está procurando não existe.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Voltar para Início
        </Link>
      </div>
    </div>
  );
}

