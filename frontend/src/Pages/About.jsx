import React from 'react';

const About = () => {
	return (
		<div className='container mx-auto my-28 px-4'>
			<div className='flex flex-col md:flex-row items-center justify-between'>
				{/* Text Content */}
				<div className='w-full md:w-1/2 mb-8 md:mb-0'>
					<h1 className='text-4xl md:text-5xl font-bold mb-6 text-gray-900'>Welcome to Glamora</h1>
					<p className='text-lg text-gray-800 leading-relaxed'>
						At <span className='font-semibold text-[#e57312]'>Glamora</span>, we believe that makeup is more than just a
						product—it's a way to express yourself, enhance your natural beauty, and feel confident in your own skin.
					</p>
					<p className='text-lg text-gray-800 leading-relaxed mt-4'>
						Our mission is to provide you with the highest quality makeup products from trusted brands around the world.
						From bold lipsticks to flawless foundations, we've curated a collection that caters to every style, skin
						tone, and occasion.
					</p>
					<p className='text-lg text-gray-800 leading-relaxed mt-4'>
						But we're more than just a store—we're a community of beauty enthusiasts. Whether you're a makeup pro or
						just starting your beauty journey, we're here to inspire, guide, and help you find the perfect products for
						your unique look.
					</p>
					<p className='text-lg text-gray-800 leading-relaxed mt-4'>
						Thank you for choosing <span className='font-semibold text-[#4bf6d4]'>Glamora</span>. Let's create something
						beautiful together!
					</p>
				</div>

				{/* Image or Illustration */}
				<div className='w-full md:w-1/2 flex justify-center md:justify-end'>
					<img
						src='https://via.placeholder.com/500' // Replace with your image URL
						alt='About Glamora'
						className='rounded-lg shadow-lg w-full max-w-md'
					/>
				</div>
			</div>
		</div>
	);
};

export default About;
