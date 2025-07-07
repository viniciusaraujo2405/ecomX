import React from 'react';
import { Produto } from '../types';

export default function ProdutoCard({ produto }: { produto: Produto }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <span className="text-gray-500">Imagem do Produto</span>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">{produto.nome}</h3>
        <div className="flex justify-between items-center mt-auto">
           <span className="text-xl font-bold text-gray-900 dark:text-white">
             R$ {produto.preco.toFixed(2).replace('.', ',')}
           </span>
           <button className="py-1 px-3 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
             Comprar
           </button>
        </div>
      </div>
    </div>
  );
}
