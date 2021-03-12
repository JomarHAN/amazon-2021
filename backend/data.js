import bcrypt from 'bcrypt'

const data = {
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
            image: '/images/p1.jpg',
            name: "Nike Slim Shirt",
            rating: 4,
            numReviews: 10,
            price: 100,
            countInStock: 10,
            description: "Best Sell",
        },
        {
            image: '/images/p2.jpg',
            name: "Adidas Spangled Shirt",
            rating: 3.5,
            numReviews: 20,
            price: 80,
            countInStock: 10,
            description: "Best Sell",
        },
        {
            image: '/images/p3.jpg',
            name: "Puma Blue Shirt",
            rating: 5,
            numReviews: 160,
            price: 65,
            countInStock: 10,
            description: "Very Good",
        },
        {
            image: '/images/p4.jpg',
            name: "Adidas White Kaki Pants",
            rating: 4,
            numReviews: 10,
            price: 70,
            countInStock: 10,
            description: "Best Sell",
        },
        {
            image: '/images/p5.jpg',
            name: "Nike Black Pants",
            rating: 5,
            numReviews: 0,
            price: 120,
            countInStock: 8,
            description: "Very Good",
        },
        {
            image: '/images/p6.jpg',
            name: "Puma Gray Pants",
            rating: 4.5,
            numReviews: 40,
            price: 110,
            countInStock: 10,
            description: "Best Sell",
        },
    ]
}

export default data;