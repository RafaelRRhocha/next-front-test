import { motion } from 'framer-motion';
import Image from "next/image";
import useCart from '../utils/state';
import { storageService } from '../services/storage';
import { ShoppingBag } from '@phosphor-icons/react';
import { useEffect } from 'react';

export default function Products({ products }: { products: IProduct[] }) {
  const { cart, addToCart, createCart } = useCart();

  useEffect(() => {
    const storageCart = storageService.getItem('cart');

    if(storageCart) {
      createCart(storageCart)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleBuyClick = (product: IProduct) => {
    // add to zustand state
    addToCart(product);

    // add to cart
    storageService.setItem('cart', cart);
  };

  return (
    <div className="flex flex-wrap gap-5 justify-center px-4">
      {products.length > 0 && products.map((product) => (
        <motion.div
          key={product.id}
          className="relative flex flex-col w-100 items-center justify-center gap-4 bg-white p-4 rounded-lg shadow-md w-72"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={product.photo}
            alt={product.name}
            width={300}
            height={200}
            className="object-cover mb-4 rounded-md"
            priority={true}
          />

          <div className='flex items-center justify-between w-full'>
            <h2 className="text-xl font-semibold w-3/5 ">{product.name}</h2>
            <p className="text-gray-800 font-semibold">{formatter.format(Number(product.price))}</p>
          </div>

          <p className="text-gray-600 text-md mb-[3em]">{product.description}</p>

          <motion.button
            onClick={() => handleBuyClick(product)}
            className="absolute bottom-0 flex gap-2 items-center justify-center bg-blue-500 hover:bg-blue-600 w-full text-white px-4 py-2 rounded-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ShoppingBag size={20} />
            Comprar
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
}

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL' 
});
