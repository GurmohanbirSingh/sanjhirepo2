"use client";
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react'

const properties = [
  {
    id: 1,
    title: "",
    address: "123 Main St, Cityville",
    price: "$250,000",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,200 sqft",
    images: [
    ]
  },
  {
    id: 2,
    title: "",
    address: "456 Oak Ave, Suburbia",
    price: "$15,000",
    bedrooms: 3,
    bathrooms: 2.5,
    area: "1,800 sqft",
    images: ["Home/Pictures/Screenshots/house.png"
     
    ]
  },
  {
    id: 3,
    title: "",
    address: "789 Palm Rd, Beachtown",
    price: "$200,000",
    bedrooms: 5,
    bathrooms: 4,
    area: "4,500 sqft",
    images: [
    ]
  }
]

function PropertyCard({ property }) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-48">
        <img
          src={property.images[currentImage]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-white mb-2">{property.title}</h2>
        <p className="text-gray-400 mb-2">{property.address}</p>
        <p className="text-purple-400 font-bold mb-2">{property.price}</p>
        <div className="flex justify-between text-gray-400 mb-4">
          <span>{property.bedrooms} beds</span>
          <span>{property.bathrooms} baths</span>
          <span>{property.area}</span>
        </div>
        <button className="w-full bg-purple-600 text-white py-2 rounded-md flex items-center justify-center">
          <Phone size={20} className="mr-2" />
          Call Agent
        </button>
      </div>
    </div>
  )
}

export default function PropertyListing() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Properties in 143001</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  )
}