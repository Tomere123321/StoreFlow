const customerModel = require("../Model/CustomersModel");

const getAllCustomers = async () => {
  return await customerModel.find({});
};

const getCustomerById = async (id) => {
  return await customerModel.findById(id);
};

const addCustomer = async (Customer) => {
  const newCustomer = new customerModel(Customer);
  await newCustomer.save();
  return "Customer added successfully";
};

const updateCustomer = async (id, Customer) => {
  await customerModel.findByIdAndUpdate(id, Customer);
  return "Customer updated successfully";
};

const deleteCustomer = async (id) => {
  await customerModel.findByIdAndDelete(id);
  return "Customer deleted successfully";
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
