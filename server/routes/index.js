const Controller = require("../controller/controller");
const authentication = require("../middleware/auth");
const errorHandler = require("../middleware/handleErr");

const router = require("express").Router();

router.get("/", Controller.readCustomer);
router.get('/produk', Controller.readFavorite);

router.post("/createCustomer", Controller.createCustomer);
router.post("/createTransaction", Controller.createTransaction);
router.get("/:id", Controller.readCustomerById);
router.put("/updateTransaction/:id", Controller.updateTransaction);
router.put("/deleteCustomer/:id", Controller.deleteCustomer);
router.get("/transaction/:id", Controller.readTransactionById);
router.put("/updateCustomer/:id", Controller.updateCustomer);
// router.use(authentication)
router.use(errorHandler)
module.exports = router;