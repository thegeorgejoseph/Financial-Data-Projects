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
    @EnvironmentObject var localStorage: LocalStorage
    @EnvironmentObject var dataObj: MockModel
//    @EnvironmentObject var portfolioItems: CustomPortfolioStorageModel
    @State var isFavorite: Bool = false
    @State var shares: Int = 0
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
    
    
    var body: some View {
        if dataObj.tickerData != nil{
            let profile: Profile = dataObj.tickerData!.profile!
            let quote: Quote = dataObj.tickerData!.quote
            let peers: [String] = dataObj.tickerData!.peers
            let insights: Insights = dataObj.tickerData!.insights
            let charts: HistoricalVolume = dataObj.tickerData!.charts
            let news: [News] = dataObj.tickerData!.news
            let trendColor: Color = self.getColor(value: quote.dp)
            let arrowSymbol: String = (trendColor == Color.green) ? "arrow.up.right" : "arrow.down.right"
            let thisStock: Stock = Stock(ticker: profile.ticker, name: profile.name, shares: shares, change: quote.c, favorite: isFavorite, d: quote.d, dp:quote.dp)
            VStack{
                ScrollView{
                    PortfolioHeaderView(profile:profile, quote: quote, trendColor: trendColor, arrowSymbol: arrowSymbol)
                    ChartsTabView(quote: quote, charts: charts)
                        .frame(height: 450)
                    PortfolioSectionView(sectionItems: thisStock,trendColor: trendColor)
                    StatsAboutView(quote: quote, profile: profile, peers: peers)
                    InsightsView(profile: profile, insights: insights)
                    RECWebView(htmlName: "recIndex", recommendation: insights.recommendation)
                        .frame(height: 450)
                    EPSWebView(htmlName: "epsIndex", earnings: insights.earnings)
                        .frame(height: 450)
                    NewsView(news: news)
                }
                
                
            }
            .navigationTitle("\(profile.ticker)")
            .toolbar{
                Image(systemName: isFavorite ? "plus.circle.fill" : "plus.circle")
                    .foregroundColor(Color.blue)
                    .onTapGesture {
                        self.favoriteAction(stock: thisStock)
                    }
            }
            .toast(isPresented: self.$showToast) {
                HStack {
                    isFavorite ? Text("\(profile.ticker) has been added") : Text("\(profile.ticker) has been removed")
                }
            }
            
            
        } else{
            ProgressView("Fetching Data for Ticker...")
        }
        
    }
    
    func favoriteAction(stock: Stock) -> Void{
        if isFavorite == false {
            // it was false before toggling so add logic to add to favorites here
            localStorage.favoriteArray.append(stock)
        } else{
            // it was true before toggling so add logic to remove from favorites here
            localStorage.favoriteArray = localStorage.favoriteArray.filter{item in
                item.ticker != stock.ticker
            }
        }
        isFavorite.toggle()
        withAnimation {
            self.showToast = true
        }
    }
}

