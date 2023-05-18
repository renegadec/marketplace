actor Tswaanda {
  public type Id = Nat32;

  public type ProductWithId = {
    id : Id;
    minOrder : Int32;
    additionalInformation : AdditionalInformation;
    name : Text;
    shortDescription : Text;
    smallImages : SmallImages;
    category : Text;
    image : [Nat8];
    fullDescription : Text;
    price : Int32;
  };

  type AdditionalInformation = {
    price : Int32;
    weight : Int32;
    availability : Text;
  };

  type SmallImages = {
    image1 : [Nat8];
    image2 : [Nat8];
    image3 : [Nat8];
  };

  public shared func getProducts() : async [ProductWithId] {

    let productsInterface = actor ("vapn6-nyaaa-aaaak-aetgq-cai") : actor {
      getAllProducts : shared query () -> async [ProductWithId];
    };

    let products = await productsInterface.getAllProducts();

    return products;
  };

};
