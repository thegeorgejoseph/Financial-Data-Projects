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
//        startTimer()
    }
    func startTimer() {
        self.timer = Timer.scheduledTimer(timeInterval: 10.0, target: self, selector: #selector(refresh), userInfo: nil, repeats: true)
    }
    @objc func refresh(){
        for (idx,item) in self.favoriteArray.enumerated(){
    //                print(idx, item.ticker)
            DispatchQueue.main.async{
                var stock: Quote? = nil
                var resultObj: [Quote]? = nil
                let request = AF.request("http://finnhub-angular-node.wl.r.appspot.com/stock_quote?symbol=\(item.ticker)", method: .get)
                var array: [Quote] = []
                request.responseJSON{(response) in
                    if response.data != nil{
                        do{
                            let json = try JSON(data: response.data!)
                            let jsonString = "\(json)"
                            let jsonData = jsonString.data(using: .utf8)
                            resultObj = try JSONDecoder().decode([Quote].self, from: jsonData!)
                            //                    print(self.result)
                            for item in resultObj!{
                                array.append(item)
                            }
                            //                    print(array)
                            stock = array[0]
                            print("Updating stock: \(item.ticker)")
                            self.favoriteArray[idx].d = stock!.d
                            self.favoriteArray[idx].dp = stock!.dp
                            self.favoriteArray[idx].change = stock!.c
                            self.favoriteArray[idx].ticker = "Say Sike"
                        } catch{
                            print(String(describing: error))
                        }
                    }
                }
            }
        }
    }
    
}
    

