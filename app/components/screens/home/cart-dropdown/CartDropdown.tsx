import Image from 'next/image'
import { FC } from 'react'
import { BsCart, BsTrash, BsX } from 'react-icons/bs'
import { useOutside } from '../../../../hooks/useOutside'
import PlaceOrder from './PlaceOrder'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useActions } from './../../../../hooks/useActions';


const CartDropdown: FC = () => {
	const { ref, isShow, setIsShow } = useOutside(false)
	const { cart } = useTypedSelector((state) => state)
	const { removeProduct } = useActions()

	return (
		<>
			<button
				className='bg-green-800 rounded-full text-white p-2 block'
				onClick={() => setIsShow(!isShow)}
			>
				{isShow ? <BsX /> : <BsCart />}
			</button>

			{isShow && (
				<div
					className='bg-white rounded-t-xl shadow-2xl fixed bottom-0 left-0 anim-cart z-10 py-7 px-5 w-full'
					style={{ minHeight: '45%' }}
					ref={ref}
				>
					{cart.length ? (
						<>
							{cart.map((product) => (
								<div
									key={`Cart item: ${product.id}`}
									className='flex items-center justify-between bg-green-100 rounded-lg p-4 mb-4'
								>
									<div className='w-3/4 flex items-center'>
										<div className='mr-4'>
											<Image
												src={product.image}
												alt={product.title}
												width='33'
												height='48'
												className='rounded-lg'
												layout='fixed'
											/>
										</div>
										<div className='text-sm mr-4 w-3/4 '>
											<div className='overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-green-900 mb-1'>
												{product.title}
											</div>
											<div className='text-green-800'>${product.price}</div>
										</div>
									</div>
									<button onClick={() => removeProduct({id: product.id})}>
										<BsTrash className='text-green-600' />
									</button>
								</div>
							))}
							<PlaceOrder />
						</>
					) : (
						<div>Cart is empty</div>
					)}
				</div>
			)}
		</>
	)
}

export default CartDropdown
