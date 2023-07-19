const Product = require("../models/product");

const getAllProductStatic = async (req, res) => {
  const search = "wo";
  const products = await Product.find({ name: {$regex: search, $options:"i"} });
  // throw new Error('testting error')

  res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, field } = req.query;
  console.log(sort)
  const queryObject = {};
  //this code ensures that query search for all items inputed by the user without breaking
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }
  // checks for any alphabet inputed for name
  if (name) {
    queryObject.name = {$regex: name, $options:"i"};
  }

  const resuilt =  Product.find(queryObject);
  if(sort){
    // this is to seprate the in put of sort from the user 
    const sortList = sort.split(",").join(' ')
    products = products.sort(sortList)
  }
  // sort based on time
  else{
    resuilt = resuilt.sort('createAt')
  }

  //field
  if(field){
    // this is to seprate the in put of sort from the user 
    const fieldList = field.split(",").join(' ')
    resuilt = resuilt.select(sortList)
  }

  //pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page-1) * limit
  resuilt = resuilt.skip(skip).limit(limit)
  const products = await result
  
  res.status(200).json({ products });
};

module.exports = {
  getAllProductStatic,
  getAllProducts,
};
