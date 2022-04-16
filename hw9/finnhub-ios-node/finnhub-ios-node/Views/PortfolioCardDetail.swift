//
//  PortfolioCardDetail.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/14/22.
//

import SwiftUI
import Kingfisher

struct PortfolioCardDetail: View {
    @EnvironmentObject var dataObj: MockModel
    
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
            var profile: Profile = dataObj.tickerData!.profile!
            var quote: Quote = dataObj.tickerData!.quote
            var trendColor: Color = self.getColor(value: quote.dp)
            var arrowSymbol: String = (trendColor == Color.green) ? "arrow.up.right" : "arrow.down.right"
            VStack{
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
                Spacer()
                
            }
                .navigationTitle("AAPL")
                .toolbar{
                    Button(action: favoriteAction){
                        Image(systemName: "plus.circle.fill")
                    }
                }
            
        } else{
            ProgressView("Fetching Data for Ticker...")
        }
        
    }
    
    func favoriteAction(){
        
    }
}

struct PortfolioCardDetail_Previews: PreviewProvider {
    static var previews: some View {
        PortfolioCardDetail()
    }
}
