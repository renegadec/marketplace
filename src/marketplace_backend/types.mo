import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Blob "mo:base/Blob";

module {

    // Types for products products
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

    // Types for Orders
    public type Order = {
        orderId : Text;
        productId: Text;
        orderOwner: Principal;
        orderAmount: Nat;
        status: Text;
        dateCreated: Int;
    };

    // Types for the KYC methods
    public type Customer = {
        id: Text;
        userId: Principal;
        userName: Text;
        firstName: Text;
        lastName: Text;
        about: Text;
        email: Text;
        organization: Text;
        country: Text;
        streetAdrees: Text;
        city: Text;
        province: Text;
        zipCode: Nat;
        phoneNumber: Nat;
        profilePhoto: Blob;
        coverPhoto: Blob;
        status: Text;
        dateCreated: Int;
    }
};
