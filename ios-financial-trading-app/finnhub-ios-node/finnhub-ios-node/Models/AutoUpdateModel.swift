//
//  AutoUpdateModel.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 5/1/22.
//

import Foundation
import Alamofire
import SwiftyJSON
class UpdateStocks: ObservableObject {
    private var resultObj: [Quote]? = nil
    @Published var stock: Quote? = nil
    
    var timer: Timer?
    var ticker: String
    init(ticker: String) {
        self.ticker = ticker
        timer = Timer.scheduledTimer(withTimeInterval: 15, repeats: true, block: { _ in
            self.refresh(ticker: ticker)
        })
    }
    deinit {
        timer?.invalidate()
    }
    func refresh(ticker: String) {
        let request = AF.request("http://finnhub-angular-node.wl.r.appspot.com/stock_quote?symbol=\(ticker)", method: .get)
        var array: [Quote] = []
        request.responseJSON{(response) in
            if response.data != nil{
                do{
                    let json = try JSON(data: response.data!)
                    let jsonString = "\(json)"
                    let jsonData = jsonString.data(using: .utf8)
                    self.resultObj = try JSONDecoder().decode([Quote].self, from: jsonData!)
                    //                    print(self.result)
                    for item in self.resultObj!{
                        array.append(item)
                    }
                    //                    print(array)
                    self.stock = array[0]
                    print("Updating stock: \(ticker)")
                } catch{
                    print(String(describing: error))
                }
            }
        }
    }
}


extension DispatchQueue {

    static func background(delay: Double = 0.0, background: (()->Void)? = nil, completion: (() -> Void)? = nil) {
        DispatchQueue.global(qos: .background).async {
            background?()
            if let completion = completion {
                DispatchQueue.main.asyncAfter(deadline: .now() + delay, execute: {
                    completion()
                })
            }
        }
    }

}
