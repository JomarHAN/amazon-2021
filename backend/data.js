import bcrypt from 'bcrypt'

const data = {
    fields: [
        "Fashion",
        "Athletic",
        "Vehicle",
        "Appliances",
        "Phones"
    ],
    users: [
        {
            name: "Jomar",
            email: "jomar123@gmail.com",
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true
        },
        {
            name: "Theresa",
            email: "Theresa123@gmail.com",
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false
        },
    ],
    products: [
        {
            imageAlbum: {
                image1: "/images/p1.jpg",
                image2: "/images/p2.jpg",
                image3: "/images/p3.jpg",
                image4: "/images/p4.jpg",
            },
            name: "Nike Slim Shirt",
            rating: 4,
            numReviews: 10,
            price: 100,
            countInStock: 10,
            description: "Best Sell",
            brand: "Nike",
            category: "Shirt",
            seller: "60499da7da870c0ba5ad3f1a",
            fields: "Fashion",
        },
        {
            imageAlbum: {
                image1: "/images/p2.jpg",
                image2: "/images/p3.jpg",
                image3: "/images/p4.jpg",
                image4: "/images/p5.jpg",
            },
            name: "Adidas Spangled Shirt",
            rating: 3.5,
            numReviews: 20,
            price: 80,
            countInStock: 10,
            description: "Best Sell",
            brand: "Adidas",
            category: "Shirt",
            seller: "60499da7da870c0ba5ad3f1a",
            fields: "Fashion",
        },
        {
            imageAlbum: {
                image1: "/images/p3.jpg",
                image2: "/images/p4.jpg",
                image3: "/images/p5.jpg",
                image4: "/images/p6.jpg",
            },
            name: "Puma Blue Shirt",
            rating: 5,
            numReviews: 160,
            price: 65,
            countInStock: 10,
            description: "Very Good",
            brand: "Puma",
            category: "Shirt",
            seller: "60512065aaac0114d8b0d7b2",
            fields: "Fashion",
        },
        {
            imageAlbum: {
                image1: "/images/p4.jpg",
                image2: "/images/p5.jpg",
                image3: "/images/p6.jpg",
                image4: "/images/p1.jpg",
            },
            name: "Adidas White Kaki Pants",
            rating: 4,
            numReviews: 10,
            price: 70,
            countInStock: 10,
            description: "Best Sell",
            brand: "Adidas",
            category: "Pants",
            seller: "60499da7da870c0ba5ad3f1a",
            fields: "Fashion",
        },
        {
            imageAlbum: {
                image1: "/images/p5.jpg",
                image2: "/images/p6.jpg",
                image3: "/images/p1.jpg",
                image4: "/images/p2.jpg",
            },
            name: "Nike Black Pants",
            rating: 5,
            numReviews: 0,
            price: 120,
            countInStock: 8,
            description: "Very Good",
            brand: "Nike",
            category: "Pants",
            seller: "60512065aaac0114d8b0d7b2",
            fields: "Fashion",
        },
        {
            imageAlbum: {
                image1: "/images/p6.jpg",
                image2: "/images/p1.jpg",
                image3: "/images/p2.jpg",
                image4: "/images/p3.jpg",
            },
            name: "Puma Gray Pants",
            rating: 4.5,
            numReviews: 40,
            price: 110,
            countInStock: 10,
            description: "Best Sell",
            brand: "Puma",
            category: "Pants",
            seller: "60512065aaac0114d8b0d7b2",
            fields: "Fashion",
        },
    ]
}

export default data;