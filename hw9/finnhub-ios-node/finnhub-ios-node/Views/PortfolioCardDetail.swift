//
//  PortfolioCardDetail.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/14/22.
//

import SwiftUI
import Kingfisher

struct PortfolioCardDetail: View {
    //Ground Truth for all things related to this ticker so this is where this gets initialised for the first time
    @State var ticker: String
    @EnvironmentObject var localStorage: LocalStorage
    @AppStorage("storeFavorite") var storeFavorite: [Stock] = []
//    @EnvironmentObject var dataObj: MockModel
//    @State var isFavorite: Bool
//    @State var shares: Int = 0
    @State private var showToast: Bool = false
    func getColor(value: Double) -> Color {
        if value > 0 {
            return Color.green
        } else if value < 0 {
            return Color.red
        } else {
            return Color.gray
        }
    }
    @ObservedObject var dataObj: MockModel = MockModel()
//    @State var thisStock: Stock
    init(ticker: String){
        self.ticker = ticker
//        self.isFavorite = localStorage.favoriteArray.contains(where: {$0.ticker == ticker})
        dataObj.apiCall(ticker: ticker)
    }
    var body: some View{
        if dataObj.tickerData != nil{
            var shares: Int = localStorage.portfolioArray.filter{$0.ticker == ticker}.first?.shares ?? 0
            var isFavorite: Bool = localStorage.favoriteArray.contains(where: {$0.ticker == ticker}) ? true : false
            let trendColor: Color = self.getColor(value: dataObj.tickerData!.quote.dp)
            let arrowSymbol: String = (trendColor == Color.green) ? "arrow.up.right" : "arrow.down.right"
            let thisStock: Stock = Stock(ticker: dataObj.tickerData!.profile!.ticker, name: dataObj.tickerData!.profile!.name, shares: shares, change: dataObj.tickerData!.quote.c, favorite: isFavorite, d: dataObj.tickerData!.quote.d, dp:dataObj.tickerData!.quote.dp)
            VStack{
                ScrollView{
                    PortfolioHeaderView(profile:dataObj.tickerData!.profile!, quote: dataObj.tickerData!.quote, trendColor: trendColor, arrowSymbol: arrowSymbol)
                    ChartsTabView(quote: dataObj.tickerData!.quote, charts: dataObj.tickerData!.charts)
                        .frame(height: 450)
                    PortfolioSectionView(sectionItems: thisStock)
                    StatsAboutView(quote: dataObj.tickerData!.quote, profile: dataObj.tickerData!.profile!, peers: dataObj.tickerData!.peers)
                    InsightsView(profile: dataObj.tickerData!.profile!, insights: dataObj.tickerData!.insights)
                    RECWebView(htmlName: "recIndex", recommendation: dataObj.tickerData!.insights.recommendation)
                        .frame(height: 450)
                    EPSWebView(htmlName: "epsIndex", earnings: dataObj.tickerData!.insights.earnings)
                        .frame(height: 450)
                    NewsView(news: dataObj.tickerData!.news)
                }
                
                
            }
            .navigationTitle("\(dataObj.tickerData!.profile!.ticker)")
            .toolbar{
                Image(systemName: isFavorite ? "plus.circle.fill" : "plus.circle")
                    .foregroundColor(Color.blue)
                    .onTapGesture {
//                        self.favoriteAction(stock: thisStock)
                        if isFavorite == false {
                            // it was false before toggling so add logic to add to favorites here
                            localStorage.favoriteArray.append(thisStock)
                        } else{
                            // it was true before toggling so add logic to remove from favorites here
                            localStorage.favoriteArray = localStorage.favoriteArray.filter{item in
                                item.ticker != thisStock.ticker
                            }
                        }
                        storeFavorite = localStorage.favoriteArray
                        isFavorite.toggle()
                        withAnimation {
                            self.showToast = true
                        }
                    }
            }
            .toast(isPresented: self.$showToast) {
                HStack {
                    isFavorite ? Text("\(dataObj.tickerData!.profile!.ticker) has been added") : Text("\(dataObj.tickerData!.profile!.ticker) has been removed")
                }
            }
        } else {
            ProgressView("Fetching Data for Ticker...")
        }
    }
}

