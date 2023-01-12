require("dotenv").config();

const connectDB = require("./connect");
// models
const Country = require("./models/Country");
const Address = require("./models/Address");
const User = require("./models/User");
const BoughtProduct = require("./models/BoughtProduct");
const Order = require("./models/Order");
const Review = require("./models/Review");
const Product = require("./models/Product");

// mock data
const jsonCountries = require("./mockData/countries.json");
const jsonAddresses = require("./mockData/addresses.json");
const jsonUsers = require("./mockData/users.json");
const jsonProducts = require("./mockData/products.json");
const jsonBoughtProducts = require("./mockData/boughtProducts.json");
const jsonReviews = require("./mockData/rewiews.json");
const jsonOrders = require("./mockData/orders.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await deleteData(
      Country,
      Address,
      User,
      BoughtProduct,
      Order,
      Review,
      Product
    );

    const countries = await Country.create(jsonCountries);
    connectCorrespondingIds(
      countries,
      jsonAddresses,
      "name",
      "country",
      "countryId"
    );

    const addresses = await Address.create(jsonAddresses);
    connectCorrespondingIds(
      addresses,
      jsonUsers,
      "postalCode",
      "postalCode",
      "addressId"
    );
    const users = await User.create(jsonUsers);
    connectCorrespondingIds(users, jsonProducts, "email", "email", "createdBy");
    const products = await Product.create(jsonProducts);

    // boughtProducts
    connectCorrespondingIds(
      products,
      jsonBoughtProducts,
      "name",
      "name",
      "productId"
    );

    connectCorrespondingIds(
      users,
      jsonBoughtProducts,
      "email",
      "email",
      "buyer"
    );

    const boughtProducts = await BoughtProduct.create(jsonBoughtProducts);

    connectCorrespondingIds(users, jsonReviews, "email", "email", "writtenBy");

    connectCorrespondingIds(products, jsonReviews, "name", "name", "product");

    const reviews = await Review.create(jsonReviews);

    // orders
    connectCorrespondingIds(users, jsonOrders, "email", "buyer", "buyer");

    for (const order of jsonOrders) {
      console.log(order);
      for (const orderItem of order.orderItems) {
        const { _id: productId } = await Product.findOne({
          name: orderItem.name,
        }).select("_id");
        orderItem.productId = productId;
      }
    }
    const orders = await Order.create(jsonOrders);

    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

/*
  having mutual column between two tables 
  which have mutual column add ids of
  referenceTable to secondTable
*/
function connectCorrespondingIds(
  referenceTable,
  tableToAddNewColumn,
  referenceTableColumnName,
  secondTableColumnName,
  idSecondColumnName,
  idFirstColumnName = "_id"
) {
  tableToAddNewColumn.map((el) => {
    let correspondElement = referenceTable.find((element) => {
      return element[referenceTableColumnName] === el[secondTableColumnName];
    });
    el[idSecondColumnName] = correspondElement[idFirstColumnName];
    return el;
  });
}

// to clean database
async function deleteData(...rest) {
  for (const model of rest) {
    await model.deleteMany();
  }
}

start();
