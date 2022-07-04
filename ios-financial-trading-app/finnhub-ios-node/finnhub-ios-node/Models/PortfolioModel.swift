//
//  PortfolioModel.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/14/22.
//

import Foundation

struct PortfolioHomeCardModel: Identifiable {
    let id = UUID()
    let name: String
}

class PortfolioModelClass: ObservableObject {
    @Published var res:[PortfolioHomeCardModel] = []
    
    init(){
        res = createTempList()
    }
    func createTempList() -> Array<PortfolioHomeCardModel> {
        var result: [PortfolioHomeCardModel] = []
        for i in 1...2{
            result.append(PortfolioHomeCardModel(name:String(i)))
        }
//        result = []
//        let obj = PortfolioModelClass()
//        obj.res = result
        return result
    }
}


