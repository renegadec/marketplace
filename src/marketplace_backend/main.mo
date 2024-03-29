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
  type EmailVerificationSchema = Type.EmailVerificationSchema;
  type NewsLetterSubscription = Type.NewsLetterSubscription;

  var mapOfOrders = HashMap.HashMap<Text, ProductOrder>(0, Text.equal, Text.hash);
  var mapOfCustomers = HashMap.HashMap<Principal, Customer>(0, Principal.equal, Principal.hash);
  // var customerCartItems = HashMap.HashMap<Principal, List.List<CartItem>>(0, Principal.equal, Principal.hash);
  var customerCartItems = HashMap.HashMap<Principal, CartItem>(0, Principal.equal, Principal.hash);
  var customerFavouriteItems = HashMap.HashMap<Principal, List.List<Text>>(0, Principal.equal, Principal.hash);
  var unverifiedEmailUsers = HashMap.HashMap<Text, EmailVerificationSchema>(0, Text.equal, Text.hash);
  var newsLetterSubscriptions = HashMap.HashMap<Text, NewsLetterSubscription>(0, Text.equal, Text.hash);

  private stable var ordersEntries : [(Text, ProductOrder)] = [];
  private stable var customersEntries : [(Principal, Customer)] = [];
  private stable var cartItemsEntries : [(Principal, CartItem)] = [];
  // private stable var cartItemsEntries : [(Principal, List.List<CartItem>)] = [];
  private stable var favouriteItemsEntries : [(Principal, List.List<Text>)] = [];

  private stable var unverifiedEmailUsersEntries : [(Text, EmailVerificationSchema)] = [];
  private stable var newLetterSubscibers : [(Text, NewsLetterSubscription)] = [];

  //-----------------------------Product methods------------------------------------------------------

  let productsInterface = actor ("56r5t-tqaaa-aaaal-qb4gq-cai") : actor {
    getAllProducts : shared query () -> async [Product];
    filterProducts : shared [Text] -> async [Product];
  };

  public shared func getProducts() : async [Product] {
    let products = await productsInterface.getAllProducts();
    return products;
  };

  //-------------------------------- Orders methods-----------------------------------------------------------

  public shared func createOrder(order : ProductOrder) : async Bool {
    let id = order.orderId;
    mapOfOrders.put(id, order);
    return true;
  };

  public shared query func getAllOrders() : async [ProductOrder] {
    let ordersArray = Iter.toArray(mapOfOrders.vals());
    return ordersArray;
  };

  public shared func deleteOrder(id : Text) : async Bool {
    mapOfOrders.delete(id);
    return true;
  };

  public shared query func getMyOrders(userId : Principal) : async [ProductOrder] {
    let ordersArray = Iter.toArray(mapOfOrders.vals());
    let myOrders = Array.filter<ProductOrder>(ordersArray, func order = order.orderOwner == userId);
    return myOrders;
  };

  public shared query func getPendingOrders() : async [ProductOrder] {
    let ordersArray = Iter.toArray(mapOfOrders.vals());
    let pending = Array.filter<ProductOrder>(ordersArray, func order = order.status == "Pending Approval");
    return pending;
  };
  public shared query func getApprovedOrders() : async [ProductOrder] {
    let ordersArray = Iter.toArray(mapOfOrders.vals());
    let pending = Array.filter<ProductOrder>(ordersArray, func order = order.status == "Approved");
    return pending;
  };
  public shared query func getShippedOrders() : async [ProductOrder] {
    let ordersArray = Iter.toArray(mapOfOrders.vals());
    let pending = Array.filter<ProductOrder>(ordersArray, func order = order.status == "Shipped");
    return pending;
  };
  public shared query func getDeliveredOrders() : async [ProductOrder] {
    let ordersArray = Iter.toArray(mapOfOrders.vals());
    let pending = Array.filter<ProductOrder>(ordersArray, func order = order.status == "Delivered");
    return pending;
  };
  public shared query func getPendingOrdersSize() : async Nat {
    let ordersArray = Iter.toArray(mapOfOrders.vals());
    let pending = Array.filter<ProductOrder>(ordersArray, func order = order.status == "Pending Approval");
    let size = Array.size(pending);
    return size;
  };

  public shared func updatePOrder(id : Text, order : ProductOrder) : async Bool {
    switch (mapOfOrders.get(id)) {
      case (null) {
        return false;
      };
      case (?result) {
        let updateOrder : ProductOrder = order;
        ignore mapOfOrders.replace(id, updateOrder);
        return true;
      };
    };
  };

  //---------------------------------- KYC methods----------------------------------------------------------------

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

  //----------------------------------KYC methods to be called from admin-------------------------------------------------

  public shared query func getAllKYC() : async [Customer] {
    let customersArray = Iter.toArray(mapOfCustomers.vals());
    return customersArray;
  };

  public shared query func getAllKYCKeys() : async [Principal] {
    let customersArray = Iter.toArray(mapOfCustomers.keys());
    return customersArray;
  };

  public shared func deleteKYC(userId : Principal) : async Bool {
    mapOfCustomers.delete(userId);
    return true;
  };

  public shared query func getPendingKYCReaquest() : async [Customer] {
    let customersArray = Iter.toArray(mapOfCustomers.vals());
    return Array.filter<Customer>(customersArray, func customer = customer.status == "pending");
  };

  public shared query func getApprovedKYC() : async [Customer] {
    let customersArray = Iter.toArray(mapOfCustomers.vals());
    return Array.filter<Customer>(customersArray, func customer = customer.status == "approved");
  };

  public shared query func getPendingKYCReaquestSize() : async Nat {
    let customersArray = Iter.toArray(mapOfCustomers.vals());
    let pending = Array.filter<Customer>(customersArray, func customer = customer.status == "pending");
    let size = Array.size(pending);
    return size;
  };

  // --------------------------------------Cart items methods----------------------------------------------------------------

  public shared func addToCart(userId : Principal, cartItem : CartItem) : async Bool {
    customerCartItems.put(userId, cartItem);
    return true;
  };

  public shared query func getMyCartItem(userId : Principal) : async Result.Result<CartItem, Text> {
    switch (customerCartItems.get(userId)) {
      case (?item) { return #ok(item) };
      case (null) { return #err("No cart item found with the id") };
    };
  };

  public shared func removeFromCart(userId : Principal) : async Bool {
    customerCartItems.delete(userId);
    return true;
  };

  // --------------------------------------MULTIPLE CART ITEMS METHODS----------------------------------------------------

  // public shared func addToCart(userId : Principal, cartItem : CartItem) : async Bool {
  //   var cartItems : List.List<CartItem> = switch (customerCartItems.get(userId)) {
  //     case (?value) { value };
  //     case (null) { List.nil<CartItem>() };
  //   };
  //   cartItems := List.push(cartItem, cartItems);
  //   customerCartItems.put(userId, cartItems);
  //   return true;
  // };

  // public shared func getMyCartItemsProducts(userId : Principal) : async [Product] {

  //   var cartItems : List.List<CartItem> = switch (customerCartItems.get(userId)) {
  //     case (?value) { value };
  //     case (null) { List.nil<CartItem>() };
  //   };
  //   var itemsIds : List.List<Text> = List.nil<Text>();
  //   let items = List.toArray(cartItems);
  //   for (item in items.vals()) {
  //     itemsIds := List.push(item.id, itemsIds);
  //   };
  //   let products = await productsInterface.filterProducts(List.toArray(itemsIds));
  //   return products;
  // };

  // public shared func getMyCartItems(userId : Principal) : async [CartItem] {

  //   var favItems : List.List<CartItem> = switch (customerCartItems.get(userId)) {
  //     case (?value) { value };
  //     case (null) { List.nil<CartItem>() };
  //   };
  //   let items = List.toArray(favItems);
  //   return items;
  // };

  // public shared func removeFromCart(userId : Principal, cartItem : CartItem) : async Bool {
  //   var cartItems : List.List<CartItem> = switch (customerCartItems.get(userId)) {
  //     case (?value) { value };
  //     case (null) { List.nil<CartItem>() };
  //   };
  //   cartItems := List.filter(
  //     cartItems,
  //     func(item : CartItem) : Bool {
  //       item != cartItem;
  //     },
  //   );
  //   customerCartItems.put(userId, cartItems);
  //   return true;
  // };

  // public shared func updateCartItem(userId : Principal, cartItem : CartItem) : async Bool {
  //   var cartItems : List.List<CartItem> = switch (customerCartItems.get(userId)) {
  //     case (?value) { value };
  //     case (null) { List.nil<CartItem>() };
  //   };
  //   cartItems := List.filter(
  //     cartItems,
  //     func(item : CartItem) : Bool {
  //       item.id != cartItem.id;
  //     },
  //   );
  //   cartItems := List.push(cartItem, cartItems);
  //   customerCartItems.put(userId, cartItems);
  //   return true;
  // };

  // public shared func removeBatchCartItems(userid : Principal, cartItems : [CartItem]) : async Bool {
  //   var userCartItems : List.List<CartItem> = switch (customerCartItems.get(userid)) {
  //     case (?value) { value };
  //     case (null) { List.nil<CartItem>() };
  //   };

  //   for (item in cartItems.vals()) {
  //     userCartItems := List.filter(
  //       userCartItems,
  //       func(cartItem : CartItem) : Bool {
  //         cartItem.id != item.id;
  //       },
  //     );
  //   };

  //   customerCartItems.put(userid, userCartItems);
  //   return true;
  // };

  // -------------------------------------------Favourites items methods---------------------------------------------------

  public shared ({ caller }) func addToFavourites(productId : Text) : async Bool {
    var favouriteItems : List.List<Text> = switch (customerFavouriteItems.get(caller)) {
      case (?value) { value };
      case (null) { List.nil<Text>() };
    };
    favouriteItems := List.push(productId, favouriteItems);
    customerFavouriteItems.put(caller, favouriteItems);
    return true;
  };

  public shared ({ caller }) func getMyFavItems() : async [Product] {
    var favItems : List.List<Text> = switch (customerFavouriteItems.get(caller)) {
      case (?value) { value };
      case (null) { List.nil<Text>() };
    };
    let items = List.toArray(favItems);
    let products = await productsInterface.filterProducts(items);
    return products;
  };

  public shared ({ caller }) func removeFromFavourites(productId : Text) : async Bool {
    var favItems : List.List<Text> = switch (customerFavouriteItems.get(caller)) {
      case (?value) { value };
      case (null) { List.nil<Text>() };
    };
    favItems := List.filter(
      favItems,
      func(item : Text) : Bool {
        item != productId;
      },
    );
    customerFavouriteItems.put(caller, favItems);
    return true;
  };

  public shared query ({ caller }) func isProductFavoutite(productId : Text) : async Bool {
    var favItems : List.List<Text> = switch (customerFavouriteItems.get(caller)) {
      case (?value) { value };
      case (null) { List.nil<Text>() };
    };

    let itemsArray = List.toArray(favItems);
    let isFavourite = Array.find<Text>(itemsArray, func x = x == productId);
    return isFavourite != null;
  };

  // -------------------------------------------Email Verification---------------------------------------------------

  public shared func addToUnverified(userId : Text, args : EmailVerificationSchema) : async Bool {
    unverifiedEmailUsers.put(userId, args);
    return true;
  };

  public shared func removeFromUnverified(userId : Text) : async Bool {
    unverifiedEmailUsers.delete(userId);
    return true;
  };

  public shared query func getUnverifiedEmailUser(userId : Text) : async Result.Result<EmailVerificationSchema, Text> {
    switch (unverifiedEmailUsers.get(userId)) {
      case (null) { return #err("No record found for this user") };
      case (?result) { return #ok(result) };
    };
  };

  public shared query func getAllUnverifiedEmailEntries() : async [EmailVerificationSchema] {
    let unverifiedUsersArray = Iter.toArray(unverifiedEmailUsers.vals());
    return unverifiedUsersArray;
  };

  // -------------------------------------------NewsLetter Subscriptions---------------------------------------------------

  public shared func addToNewsLetterSubscibers(args : NewsLetterSubscription) : async Bool {
    newsLetterSubscriptions.put(args.id, args);
    return true;
  };

  public shared query func getNewsLetterSubscriberEntry(id : Text) : async Result.Result<NewsLetterSubscription, Text> {
    switch (newsLetterSubscriptions.get(id)) {
      case (null) { return #err("No record found for this id") };
      case (?result) { return #ok(result) };
    };
  };

  public shared func deleteNewsLetterSubscriberEntry(id : Text) : async Bool {
    newsLetterSubscriptions.delete(id);
    return true;
  };

  public shared query func checkIfEmailSubscribed(email : Text) : async [NewsLetterSubscription] {
    let subscridedArray = Iter.toArray(newsLetterSubscriptions.vals());
    let entry = Array.filter<NewsLetterSubscription>(subscridedArray, func customer = customer.email == email);
    return entry;
  };

  public shared func updateNewsLetterSubscriberEntry(args : NewsLetterSubscription) : async Bool {
    switch (newsLetterSubscriptions.get(args.id)) {
      case (null) { return false };
      case (?result) {
        ignore newsLetterSubscriptions.replace(args.id, args);
        return true;
      };
    };
  };

  public shared query func getAllNewsLetterSubcribersEntries() : async [NewsLetterSubscription] {
    let subscribersArray = Iter.toArray(newsLetterSubscriptions.vals());
    return subscribersArray;
  };

  // -----------------------------------------Canister upgrade methods---------------------------------------------------
  system func preupgrade() {
    ordersEntries := Iter.toArray(mapOfOrders.entries());
    customersEntries := Iter.toArray(mapOfCustomers.entries());
    cartItemsEntries := Iter.toArray(customerCartItems.entries());
    // cartItemsEntries := Iter.toArray(customerCartItems.entries());
    favouriteItemsEntries := Iter.toArray(customerFavouriteItems.entries());
    unverifiedEmailUsersEntries := Iter.toArray(unverifiedEmailUsers.entries());
    newLetterSubscibers := Iter.toArray(newsLetterSubscriptions.entries());
  };

  system func postupgrade() {
    mapOfOrders := HashMap.fromIter<Text, ProductOrder>(ordersEntries.vals(), 0, Text.equal, Text.hash);
    mapOfCustomers := HashMap.fromIter<Principal, Customer>(customersEntries.vals(), 0, Principal.equal, Principal.hash);
    customerCartItems := HashMap.fromIter<Principal, CartItem>(cartItemsEntries.vals(), 0, Principal.equal, Principal.hash);
    // customerCartItems := HashMap.fromIter<Principal, List.List<CartItem>>(cartItemsEntries.vals(), 0, Principal.equal, Principal.hash);
    customerFavouriteItems := HashMap.fromIter<Principal, List.List<Text>>(favouriteItemsEntries.vals(), 0, Principal.equal, Principal.hash);
    unverifiedEmailUsers := HashMap.fromIter<Text, EmailVerificationSchema>(unverifiedEmailUsersEntries.vals(), 0, Text.equal, Text.hash);
    newsLetterSubscriptions := HashMap.fromIter<Text, NewsLetterSubscription>(newLetterSubscibers.vals(), 0, Text.equal, Text.hash);
  };

};
