//
//  StockModel.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/27/22.
//

import Foundation
import SwiftUI
import Alamofire
import SwiftyJSON

struct Wallet: Codable{
    let balance: Double
    let net: Double
}
struct Stock: Identifiable,Codable{
    var id = UUID()
    var ticker: String
    var name: String
    var shares: Int
    var change: Double
    var favorite: Bool
    var d: Double
    var dp: Double
}

struct PortfolioArray: Codable{
    let portfolioItems: [Stock]
}

struct FavoritesArray: Codable{
    let favoriteItems: [Stock]
}

class CustomPortfolioStorageModel: ObservableObject {
    @Published var portfolioItems: [Any]
    
    init(){
        portfolioItems = []
    }
    
    func setPortfolioItem(currentStock: Stock){
        portfolioItems.append(currentStock)
    }
}

class LocalStorage: ObservableObject {
    @Published var portfolioArray: [Stock]
    @Published var favoriteArray: [Stock]
    @Published var wallet: Double
    @Published var net: Double
    private var timer : Timer?
    
    init(){
        @AppStorage("storePortfolio") var storePortfolio: [Stock] = []
        @AppStorage("storeFavorite") var storeFavorite: [Stock] = []
        @AppStorage("storeWallet") var storeWallet: Double = 25000
        @AppStorage("storeWallet") var storeNet: Double = 25000
        portfolioArray = storePortfolio
        favoriteArray = storeFavorite
        wallet = storeWallet
        net = storeNet
    }
   
    
    
}
    

