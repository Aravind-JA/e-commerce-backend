const Product = require('../Models/product-model');

async function SearchData(req, res) {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ message: "No queries found." });
    }

    try {
        const minPrice = Number(query) - 500;
        const maxPrice = Number(query) + 500;
        const searchResults = await Product.aggregate([
            {
                $match: {
                    $or: [
                        { name: { $regex: query, $options: "i" } },
                        { description: { $regex: query, $options: "i" } },
                        { price: { $gte: minPrice, $lte: maxPrice } }
                    ]
                }
            }
        ]);

        res.status(200).json(searchResults);
    } catch (error) {
        res.status(500).json({ message: "An error occurred during the search." });
    }
}


module.exports = { SearchData };



// async function SearchData(req, res) {
//     try {
//         const query = req.query.q.toString().trim();
//         if (!query) {
//             return res.status(404).json({ message: "No queries found" });
//         }
//         const products = await Product.find();
//         const searchReasult = products.filter(data => {
//             for (const field in data) {
//                 if (data[field].toString().toLowerCase().includes(query)) {
//                     return true;
//                 }
//             }
//             return false;
//         });
//         if (searchReasult.length === 0) {
//             return res.status(404).json({ message: "No results found..." });
//         }
//         res.status(200).json(searchReasult);
//     } catch (error) {
//         res.status(400).json(error);
//     }
// }


// const searchResult = await Product.aggregate([
//     {
//         $search: {
//             text: {
//                 query: query,
//                 path: ["name", "description", "price"]
//             }
//         }
//     }
// ]);

// const searchResults = await Product.find({ $text: { $search: query } }).exec();