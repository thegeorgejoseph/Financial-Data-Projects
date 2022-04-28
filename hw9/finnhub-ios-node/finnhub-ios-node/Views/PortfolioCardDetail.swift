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
    
    @EnvironmentObject var dataObj: MockModel
    @EnvironmentObject var portfolioItems: CustomPortfolioStorageModel
    @State private var isFavorite: Bool = false
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
            let trendColor: Color = self.getColor(value: quote.dp)
            let arrowSymbol: String = (trendColor == Color.green) ? "arrow.up.right" : "arrow.down.right"
            var thisStock: Stock = Stock(ticker: profile.ticker, shares: 0, change: quote.c)
            let _temp = CustomPortfolioStorageModel().setPortfolioItem(currentStock: thisStock)
            VStack{
                ScrollView{
                    HStack{
                        Text(profile.name)
                            .font(.subheadline)
                            .fontWeight(.semibold)
                            .foregroundColor(.secondary)
                        Spacer()
                        KFImage.url(URL(string:profile.logo))
                            .resizable()
                            .frame(width: 25, height: 25)
                    }
                    .padding(/*@START_MENU_TOKEN@*/.all/*@END_MENU_TOKEN@*/)
                    HStack{
                        Text("$\(String(format:"%.2f", quote.c))").font(.title).fontWeight(.bold)
                        HStack{
                            Image(systemName: arrowSymbol)
                            Text("$\(String(format:"%.2f", quote.d))(\(String(format:"%.2f", quote.dp))%)")
                        }
                        .foregroundColor(trendColor)
                        Spacer()
                    }
                    .padding(.all)
                    ChartsTabView()
                        .frame(height: 400)
                        .padding(.all)
                    PortfolioSectionView(sectionItems: thisStock,trendColor: trendColor)
                    StatsAboutView(quote: quote, profile: profile, peers: peers)
                }
                
                
            }
            .navigationTitle("AAPL")
            .toolbar{
                Button(action: favoriteAction){
                    Image(systemName: isFavorite ? "plus.circle.fill" : "plus.circle")
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
    
    func favoriteAction(){
        isFavorite.toggle()
        withAnimation {
            self.showToast = true
        }
        
    }
}

//struct PortfolioCardDetail_Previews: PreviewProvider {
//    static var previews: some View {
////        PortfolioCardDetail()
//    }
//}
