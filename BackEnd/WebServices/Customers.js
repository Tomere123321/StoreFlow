const axios = require("axios");
const CustomersModel = require("../Model/CustomersModel");

const fetchCustomers = async () => {
  try {
    const existingCustomersCount = await CustomersModel.countDocuments();

    if (existingCustomersCount > 0) {
      console.log("Customers already exist in the database");
      return;
    }
    const response = await axios.get("https://dummyjson.com/users");
    const customersData = response.data.users.map((customer) => {
      return {
        firstName: customer.firstName,
        lastName: customer.lastName,
        city: customer.address?.city,
      };
    });

    await CustomersModel.insertMany(customersData);
    console.log(`${customersData.length} customers inserted successfully`);
  } catch (error) {
    console.error("Error fetching customers data:", error.message);
  }
};

module.exports = {fetchCustomers};
