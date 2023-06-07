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

  var mapOfOrders = HashMap.HashMap<Principal, ProductOrder>(0, Principal.equal, Principal.hash);
  var mapOfCustomers = HashMap.HashMap<Principal, Customer>(0, Principal.equal, Principal.hash);

  private stable var ordersEntries : [(Principal, ProductOrder)] = [];
  private stable var customersEntries : [(Principal, Customer)] = [];

  public shared func getProducts() : async [Product] {
    let productsInterface = actor ("56r5t-tqaaa-aaaal-qb4gq-cai") : actor {
      getAllProducts : shared query () -> async [Product];
    };

    let products = await productsInterface.getAllProducts();
    return products;
  };

  public shared func createProduct(order : ProductOrder) : async Bool {
    let id = order.orderOwner;
    mapOfOrders.put(id, order);
    return true;
  };

  public shared func getOrders() : async [ProductOrder] {
    let ordersArray = Iter.toArray(mapOfOrders.vals());
    return ordersArray;
  };

  public shared func createKYCRequest(request : Customer) : async Bool {
    let id = request.userId;
    mapOfCustomers.put(id, request);
    return true;
  };

  public shared func getKYCRequest(id : Principal) : async Result.Result<Customer, Text> {
    switch (mapOfCustomers.get(id)) {
      case (null) { return #err("Customer with the provided id not found") };
      case (?result) { return #ok(result) };
    };
  };

  public shared func updateKYCRequest(id : Principal, request : Customer) : async Bool {
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
        mapOfOrders := HashMap.fromIter<Principal, ProductOrder>(ordersEntries.vals(), 0, Principal.equal, Principal.hash);
        mapOfCustomers := HashMap.fromIter<Principal, Customer>(customersEntries.vals(), 0, Principal.equal, Principal.hash);
    };

};
