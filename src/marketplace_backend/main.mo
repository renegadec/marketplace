actor Tswaanda {

  public type Product = {
    id : Text;
    minOrder : Int32;
    additionalInformation : AdditionalInformation;
    name : Text;
    shortDescription : Text;
    category : Text;
    image : [Nat8];
    fullDescription : Text;
    price : Int32;
    images : Images;
  };

  type AdditionalInformation = {
    price : Int32;
    weight : Int32;
    availability : Text;
  };

  type Images = {
    image1 : [Nat8];
    image2 : [Nat8];
    image3 : [Nat8];
  };

  public shared func getProducts() : async [Product] {
// 56r5t-tqaaa-aaaal-qb4gq-cai
// vapn6-nyaaa-aaaak-aetgq-cai
    let productsInterface = actor ("56r5t-tqaaa-aaaal-qb4gq-cai") : actor {
      getAllProducts : shared query () -> async [Product];
    };

    let products = await productsInterface.getAllProducts();
    return products;
  };

};
