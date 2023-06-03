import Type "types";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";

actor Tswaanda {

  type Product = Type.Product;
  type ProductOrder = Type.Order;
  type Customer = Type.Customer;

  var mapOfOrders = HashMap.HashMap<Text, ProductOrder>(0, Text.equal, Text.hash);
  var mapOfCustomers = HashMap.HashMap<Text, Customer>(0, Text.equal, Text.hash);

  private stable var ordersEntries : [(Text, ProductOrder)] = [];
  private stable var customersEntries : [(Text, Customer)] = [];

  public shared func getProducts() : async [Product] {
    // 56r5t-tqaaa-aaaal-qb4gq-cai
    // vapn6-nyaaa-aaaak-aetgq-cai
    let productsInterface = actor ("56r5t-tqaaa-aaaal-qb4gq-cai") : actor {
      getAllProducts : shared query () -> async [Product];
    };

    let products = await productsInterface.getAllProducts();
    return products;
  };

  public shared func createProduct(order : ProductOrder) : async Text {
    let id = order.orderId;
    mapOfOrders.put(id, order);
    return id;
  };

  public shared func getOrders() : async [ProductOrder] {
    let ordersArray = Iter.toArray(mapOfOrders.vals());
    return ordersArray;
  };

  public shared func createKYCRequest(request : Customer) : async Text {
    let id = request.id;
    mapOfCustomers.put(id, request);
    return id;
  };

  public shared func getKYCRequest(id : Text) : async Result.Result<Customer, Text> {
    switch (mapOfCustomers.get(id)) {
      case (null) { return #err("Customer with the provided id not found") };
      case (?result) { return #ok(result) };
    };
  };

  public shared func updateKYCRequest(id : Text, request : Customer) : async Bool {
    switch (mapOfCustomers.get(id)) {
      case (null) { return false };
      case (?result) {
        ignore mapOfCustomers.replace(id, request);
        return true;
      };
    };
  };

  // Canister upgrade methods
  system func preupgrade() {
        ordersEntries := Iter.toArray(mapOfOrders.entries());
        customersEntries := Iter.toArray(mapOfCustomers.entries());
    };

    system func postupgrade() {
        mapOfOrders := HashMap.fromIter<Text, ProductOrder>(ordersEntries.vals(), 0, Text.equal, Text.hash);
        mapOfCustomers := HashMap.fromIter<Text, Customer>(customersEntries.vals(), 0, Text.equal, Text.hash);
    };

};
