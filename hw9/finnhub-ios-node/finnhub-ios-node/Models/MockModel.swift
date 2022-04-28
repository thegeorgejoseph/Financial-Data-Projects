//
//  MockModel.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/15/22.
//

import Foundation
import Alamofire
import SwiftyJSON

struct Profile: Codable {
    let ticker: String
    let name: String
    let exchange: String
    let ipo: String
    let finnhubIndustry: String
    let logo: String
    let weburl: String
}

struct News: Codable, Identifiable{
    let id = UUID()
    let headline: String
    let source: String
    let datetime: String
    let summary: String
    let url: String
    let image: String
}

struct Charts: Codable {
    let title: String
    let data: [[Double]]
}

struct Quote: Codable{
    let c: Double
    let d: Double
    let dp: Double
    let h: Double
    let l: Double
    let o: Double
    let pc: Double
    let t: Double
    let marketStatus: String
    let timestamp: String
    let charts: [Charts]
    let name: String
}

struct Mentions: Codable{
    let mention: Int
    let positiveMention: Int
    let negativeMention: Int
}

struct Series: Codable{
    let name:String
    let data: [Int]
    let color: String
}

struct Earnings: Codable{
    let categories: [String]
    let actual: [Double]
    let estimate: [Double]
}
struct Recommendation: Codable{
    let categories: [String]
    let series: [Series]
}

struct Insights: Codable{
    let reddit: Mentions
    let twitter: Mentions
    let recommendation: Recommendation
    let earnings: Earnings
    let name: String
}

struct DataOHLC: Codable{
    let olhc: [[Double]]
    let volume: [[Int]]
}
struct HistoricalVolume: Codable{
    let title: String
    let data: DataOHLC
}

struct CompanyDetails: Identifiable, Codable {
    let id = UUID()
    let profile: Profile?
    let peers: [String]
    let news: [News]
    let quote: Quote
    let insights: Insights
    let charts: HistoricalVolume
}


class MockModel: ObservableObject{
    
    @Published var tickerData: CompanyDetails? = nil
//    @Published var profileDetails: HistoricalVolume? = nil
    
    init(){
//        let jsonURL = "https://finnhub-angular-node.wl.r.appspot.com/company_details?symbol=MSFT"
        let request = AF.request("https://finnhub-angular-node.wl.r.appspot.com/company_details?symbol=MSFT", method: .get)
        request.responseJSON{(response) in
//            print(data)
            if response.data != nil{
                do{
                    let json = try JSON(data: response.data!)
                    let jsonString = "\(json)"
                    let jsonData = jsonString.data(using: .utf8)
                    self.tickerData = try JSONDecoder().decode(CompanyDetails.self, from: jsonData!)
//                    print(self.tickerData)
                    print("Data obtained from server successfully!")
                } catch{
                    print(String(describing: error))
                }
            }
            
        }
    }
    
}
