const products = [
    {
      product_id: 6,
      user_id: 3,
      name: "Three Piece Suit",
      image_url:
        "https://images.pexels.com/photos/10040216/pexels-photo-10040216.jpeg?auto=compress&cs=tinysrgb&w=1600",
      brand: "Peter England",
      category: "Mens,New Season",
      description: "Mens 3 piece suit, custom fitting",
      num_reviews: "0",
      price: "936.89",
      count_in_stock: "5",
      created_at: "2023-04-30T18:34:52.256Z",
      avg_rating: null,
      count: "0",
    },
    {
      product_id: 22,
      user_id: 3,
      name: "Black Handbag",
      image_url:
        "https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=1600",
      brand: "Zara",
      category: "Womens,New Seaons",
      description: "Womens Black Handbag small",
      num_reviews: "0",
      price: "899.99",
      count_in_stock: "3",
      created_at: "2023-04-30T18:44:39.986Z",
      avg_rating: null,
      count: "0",
    },
    {
      product_id: 4,
      user_id: 3,
      name: "Hawaiian Shirt",
      image_url:
        "https://images.pexels.com/photos/14726363/pexels-photo-14726363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      brand: "Peter England",
      category: "Mens",
      description: "Hawaiian Shirt, Skinny Fit Medium Size",
      num_reviews: "0",
      price: "802.23",
      count_in_stock: "5",
      created_at: "2023-04-30T18:34:52.256Z",
      avg_rating: null,
      count: "0",
    },
    {
      product_id: 16,
      user_id: 3,
      name: "High Heels",
      image_url: "https://images.pexels.com/photos/10820105/pexels-photo-10820105.jpeg?auto=compress&cs=tinysrgb&w=1600",
      brand: "Zara",
      category: "SHoes,New Season",
      description: "High Blood Red Heels",
      num_reviews: "0",
      price: "867.05",
      count_in_stock: "3",
      created_at: "2023-04-30T18:34:52.256Z",
      avg_rating: null,
      count: "0",
    },
    {
      product_id: 9,
      user_id: 3,
      name: "Mens Watch",
      image_url:
        "https://images.pexels.com/photos/2442893/pexels-photo-2442893.jpeg?auto=compress&cs=tinysrgb&w=1600",
      brand: "Swiss",
      category: "Mens,New Seaons",
      description: "Swiss Watch for Men",
      num_reviews: "0",
      price: "606.2",
      count_in_stock: "3",
      created_at: "2023-04-30T18:44:39.986Z",
      avg_rating: null,
      count: "0",
    },
    {
      product_id: 14,
      user_id: 3,
      name: "Beanie Caps",
      image_url:
        "https://images.pexels.com/photos/5215985/pexels-photo-5215985.jpeg?auto=compress&cs=tinysrgb&w=1600",
      brand: "Hatzy",
      category: "Hats",
      description: "Beanie caps for winter",
      num_reviews: "0",
      price: "287.14",
      count_in_stock: "5",
      created_at: "2023-04-30T18:34:52.256Z",
      avg_rating: null,
      count: "0",
    },
    {
      product_id: 15,
      user_id: 3,
      name: "Nike Basketball Shoes",
      image_url:
        "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1600",
      brand: "Nike",
      category: "Shoes,New Season",
      description: "Nike Basketball Shoes",
      num_reviews: "0",
      price: "605",
      count_in_stock: "3",
      created_at: "2023-04-30T18:34:52.256Z",
      avg_rating: null,
      count: "0",
    },
    {
      product_id: 10,
      user_id: 3,
      name: "Birthday Hats",
      image_url:
        "https://images.pexels.com/photos/7600331/pexels-photo-7600331.jpeg?auto=compress&cs=tinysrgb&w=1600",
      brand: "Hatzy",
      category: "Hats,New Season",
      description: "Birthday Hats for kids",
      num_reviews: "0",
      price: "35.29",
      count_in_stock: "5",
      created_at: "2023-04-30T18:34:52.256Z",
      avg_rating: null,
      count: "0",
    },
    {
      product_id: 2,
      user_id: 3,
      name: "White T-Shirt",
      image_url:
        "https://images.pexels.com/photos/4101142/pexels-photo-4101142.jpeg?auto=compress&cs=tinysrgb&w=1600",
      brand: "Levis",
      category: "Mens",
      description: "A Plain White T-Shirt, Skinny Fit Medium Sizze",
      num_reviews: "0",
      price: "759.19",
      count_in_stock: "5",
      created_at: "2023-04-30T18:34:52.256Z",
      avg_rating: null,
      count: "0",
    },
    {
      product_id: 7,
      user_id: 3,
      name: "Hoodie",
      image_url:
        "https://images.pexels.com/photos/1661471/pexels-photo-1661471.jpeg?auto=compress&cs=tinysrgb&w=1600",
      brand: "Adidas",
      category: "Womens,New Season",
      description: "Adidas Hoodie, Loose Fit Large Size",
      num_reviews: "0",
      price: "897.34",
      count_in_stock: "5",
      created_at: "2023-04-30T18:34:52.256Z",
      avg_rating: null,
      count: "0",
    },
    {
      product_id: 11,
      user_id: 3,
      name: "Picnic Hat",
      image_url:
        "https://images.pexels.com/photos/9532878/pexels-photo-9532878.jpeg?auto=compress&cs=tinysrgb&w=1600",
      brand: "Hatzy",
      category: "Hats,Womens,New Season",
      description: "Womens Picnic Hat",
      num_reviews: "0",
      price: "135.72",
      count_in_stock: "3",
      created_at: "2023-04-30T18:34:52.256Z",
      avg_rating: null,
      count: "0",
    },
    {
      product_id: 13,
      user_id: 3,
      name: "Irishman cap",
      image_url:
        "https://images.pexels.com/photos/12074548/pexels-photo-12074548.jpeg?auto=compress&cs=tinysrgb&w=1600",
      brand: "Hatzy",
      category: "Hats,New Season",
      description: "Irishman cap from Peaky blinders",
      num_reviews: "0",
      price: "611.56",
      count_in_stock: "3",
      created_at: "2023-04-30T18:34:52.256Z",
      avg_rating: null,
      count: "0",
    },
  ];
module.exports = products  