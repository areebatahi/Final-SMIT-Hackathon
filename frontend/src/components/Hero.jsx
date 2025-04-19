import React from 'react'
import { useState, useEffect } from "react";

const images = [
	"https://provenreality.com/wp-content/uploads/2024/01/Augmented-Reality-Fashion-Ecommerce-A-Match-Made-in-Heaven.jpg",
	"https://storage.googleapis.com/mageplaza.com/media/2024/01/09104808/90.jpg",
	"https://media.istockphoto.com/id/1484799147/photo/hanging-clothes-on-sale-for-teens-and-kids-in-the-mall.jpg?s=612x612&w=0&k=20&c=ITHnJ3eyP3jck8fQCBks2KJtuTFi7-46FNdLll5V58g=",
];

const Hero = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((currentInd) => (currentInd === images.length - 1 ? 0 : currentInd + 1));
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	const prevSlide = () => {
		setCurrentIndex((previousImg) => (previousImg === 0 ? images.length - 1 : previousImg - 1));
	};

	const nextSlide = () => {
		setCurrentIndex((nextImg) => (nextImg === images.length - 1 ? 0 : nextImg + 1));
	};

	return (
		<>
			<div className="relative w-full h-auto mt-1 mx-auto">
				{/* Images */}
				<div className="overflow-hidden">
					<img
						src={images[currentIndex]}
						alt={`Slide ${currentIndex+1}`}
						className="w-full h-160 object-cover transition-transform duration-500"
					/>
				</div>

				{/* Left Arrow */}
				<button
					onClick={prevSlide}
					className="absolute top-1/2 left-4 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/80"
				>
					❮
				</button>

				{/* Right Arrow */}
				<button
					onClick={nextSlide}
					className="absolute top-1/2 right-4 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/80"
				>
					❯
				</button>

				{/* Dots */}
				<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
					{images.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentIndex(index)}
							className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-400"
								}`}
						/>
					))}
				</div>
			</div>
		</>
	)
}

export default Hero
