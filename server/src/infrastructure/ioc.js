const { ContainerBuilder } = require("node-dependency-injection");
const ShopRepository = require("./repositories/shop.repository");

const container = new ContainerBuilder();

container.register("shop.repository", ShopRepository);

module.exports = container;