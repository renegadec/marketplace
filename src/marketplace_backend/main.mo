import Type "types";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Bool "mo:base/Bool";
import List "mo:base/List";
import Array "mo:base/Array";

actor Tswaanda {

  type Product = Type.Product;
  type ProductOrder = Type.Order;
  type Customer = Type.Customer;
  type CartItem = Type.CartItem;

  var mapOfOrders = HashMap.HashMap<Text, ProductOrder>(0, Text.equal, Text.hash);
  var mapOfCustomers = HashMap.HashMap<Principal, Customer>(0, Principal.equal, Principal.hash);
  var customerCartItems = HashMap.HashMap<Principal, List.List<CartItem>>(0, Principal.equal, Principal.hash);
  var customerFavouriteItems = HashMap.HashMap<Principal, List.List<Text>>(0, Principal.equal, Principal.hash);

  private stable var ordersEntries : [(Text, ProductOrder)] = [];
  private stable var customersEntries : [(Principal, Customer)] = [];
  private stable var cartItemsEntries : [(Principal, List.List<CartItem>)] = [];
  private stable var favouriteItemsEntries : [(Principal, List.List<Text>)] = [];

  // Product methods

  let productsInterface = actor ("56r5t-tqaaa-aaaal-qb4gq-cai") : actor {
    getAllProducts : shared query () -> async [Product];
    filterProducts : shared [Text] -> async [Product];
  };

  public shared func getProducts() : async [Product] {
    let products = await productsInterface.getAllProducts();
    return products;
  };

  // Orders methods

  public shared func createOrder(order : ProductOrder) : async Bool {
    let id = order.orderId;
    mapOfOrders.put(id, order);
    return true;
  };

  public shared func getAllOrders() : async [ProductOrder] {
    let ordersArray = Iter.toArray(mapOfOrders.vals());
    return ordersArray;
  };

  public shared query func getMyOrders(userId : Principal): async [ProductOrder] {
    let ordersArray = Iter.toArray(mapOfOrders.vals());
    let myOrders = Array.filter<ProductOrder>(ordersArray, func order = order.orderOwner == userId);
    return myOrders;
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

  public shared func addToCart(userId : Principal, cartItem : CartItem) : async Bool {
    var cartItems : List.List<CartItem> = switch (customerCartItems.get(userId)) {
      case (?value) { value };
      case (null) { List.nil<CartItem>() };
    };
    cartItems := List.push(cartItem, cartItems);
    customerCartItems.put(userId, cartItems);
    return true;
  };

  public shared func getMyCartItemsProducts(userId : Principal) : async [Product] {

    var cartItems : List.List<CartItem> = switch (customerCartItems.get(userId)) {
      case (?value) { value };
      case (null) { List.nil<CartItem>() };
    };
    var itemsIds: List.List<Text> = List.nil<Text>();
    let items = List.toArray(cartItems);
    for(item in items.vals()) {
      itemsIds := List.push(item.id, itemsIds);
    };
    let products = await productsInterface.filterProducts(List.toArray(itemsIds));
    return products;
  };

  public shared func getMyCartItems(userId : Principal) : async [CartItem] {

    var favItems : List.List<CartItem> = switch (customerCartItems.get(userId)) {
      case (?value) { value };
      case (null) { List.nil<CartItem>() };
    };
    let items = List.toArray(favItems);
    return items;
  };

  public shared func removeFromCart(userId : Principal, cartItem : CartItem) : async Bool {
    var cartItems : List.List<CartItem> = switch (customerCartItems.get(userId)) {
      case (?value) { value };
      case (null) { List.nil<CartItem>() };
    };
    cartItems := List.filter(
      cartItems,
      func(item : CartItem) : Bool {
        item != cartItem;
      },
    );
    customerCartItems.put(userId, cartItems);
    return true;
  };

  public shared func updateCartItem(userId : Principal, cartItem : CartItem) : async Bool {
    var cartItems : List.List<CartItem> = switch (customerCartItems.get(userId)) {
      case (?value) { value };
      case (null) { List.nil<CartItem>() };
    };
    cartItems := List.filter(
      cartItems,
      func(item : CartItem) : Bool {
        item.id != cartItem.id;
      },
    );
    cartItems := List.push(cartItem, cartItems);
    customerCartItems.put(userId, cartItems);
    return true;
  };

  public shared func removeBatchCartItems(userid : Principal, cartItems : [CartItem]) : async Bool {
  var userCartItems : List.List<CartItem> = switch (customerCartItems.get(userid)) {
    case (?value) { value };
    case (null) { List.nil<CartItem>() };
  };

  for (item in cartItems.vals()) {
    userCartItems := List.filter(
      userCartItems,
      func(cartItem : CartItem) : Bool {
        cartItem.id != item.id;
      },
    );
  };

  customerCartItems.put(userid, userCartItems);
  return true;
};


  public shared func addToFavourites(userId : Principal, productId : Text) : async Bool {
    var favouriteItems : List.List<Text> = switch (customerFavouriteItems.get(userId)) {
      case (?value) { value };
      case (null) { List.nil<Text>() };
    };
    favouriteItems := List.push(productId, favouriteItems);
    customerFavouriteItems.put(userId, favouriteItems);
    return true;
  };

  public shared func getMyFavItems(userId : Principal) : async [Product] {

    var favItems : List.List<Text> = switch (customerFavouriteItems.get(userId)) {
      case (?value) { value };
      case (null) { List.nil<Text>() };
    };
    let items = List.toArray(favItems);
    let products = await productsInterface.filterProducts(items);
    return products;
  };

  public shared func removeFromFavourites(userId : Principal, productId : Text) : async Bool {
    var favItems : List.List<Text> = switch (customerFavouriteItems.get(userId)) {
      case (?value) { value };
      case (null) { List.nil<Text>() };
    };
    favItems := List.filter(
      favItems,
      func(item : Text) : Bool {
        item != productId;
      },
    );
    customerFavouriteItems.put(userId, favItems);
    return true;
  };

  // Canister upgrade methods
  system func preupgrade() {
    ordersEntries := Iter.toArray(mapOfOrders.entries());
    customersEntries := Iter.toArray(mapOfCustomers.entries());
    cartItemsEntries := Iter.toArray(customerCartItems.entries());
    favouriteItemsEntries := Iter.toArray(customerFavouriteItems.entries());
  };

  system func postupgrade() {
    mapOfOrders := HashMap.fromIter<Text, ProductOrder>(ordersEntries.vals(), 0, Text.equal, Text.hash);
    mapOfCustomers := HashMap.fromIter<Principal, Customer>(customersEntries.vals(), 0, Principal.equal, Principal.hash);
    customerCartItems := HashMap.fromIter<Principal, List.List<CartItem>>(cartItemsEntries.vals(), 0, Principal.equal, Principal.hash);
    customerFavouriteItems := HashMap.fromIter<Principal, List.List<Text>>(favouriteItemsEntries.vals(), 0, Principal.equal, Principal.hash);
  };

};
