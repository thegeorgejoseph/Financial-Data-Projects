//
//  StockModel.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/27/22.
//

import Foundation
import SwiftUI

struct Stock: Codable{
    let ticker: String
    let name: String
    let shares: Int
    let change: Double
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

//class CustomPortfolioStorage{
//    let mockStock: Stock = Stock(ticker:"SMTN", shares: 4, change: 25.08)
//    func setPortfolioStorage(){
//        let items: [Stock] = [Stock(ticker:" ",shares: 0, change: 0)]
//        if let encoded = try? JSONEncoder().encode(items){
//            @AppStorage("portfolioItems") var portfolioItems = encoded
//        }
//    }
//    func setPortfolioItem(currentStock: Stock){
//        do{
//            let portfolioObject = UserDefaults.standard.object(forKey: "portfolioItems")
//            var items = try JSONDecoder().decode([Stock].self,from: portfolioObject as! Data)
//            items.append(currentStock)
//            print(items)
//            if let encoded = try? JSONEncoder().encode(items){
//                @AppStorage("portfolioItems") var portfolioItems = encoded
//            }
//        } catch let err{
//            print(err)
//        }
//
//
//    }
//}

