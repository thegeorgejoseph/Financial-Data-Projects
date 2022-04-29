//
//  PortfolioSectionView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/27/22.
//

import SwiftUI

struct PortfolioSectionView: View {
    @State var sectionItems: Stock
    @State var trendColor: Color
    @State private var showingSheet = false
    var body: some View {
        let priceChange = (sectionItems.change - sectionItems.change)
        HStack{
            if sectionItems.shares == 0 {
                VStack(alignment: .leading, spacing: 5){
                   Text("You have 0 shares of \(sectionItems.ticker).")
                   Text("Start trading!")
               }
                .padding(.all)
            } else {
                VStack(alignment: .leading,spacing: 20){
                Text("Portfolio")
                    .font(.largeTitle)
                Text("Shares Owned: \(sectionItems.shares)")
                Text("Avg. Cost / Share: \(sectionItems.shares > 0 ? String(format: "%.2f", Double(sectionItems.shares) * sectionItems.change / Double(sectionItems.shares)) : String(0))")
                Text("Total Cost: \(String(format: "%.2f",Double(sectionItems.shares) * sectionItems.change))")
                Text("Change: \(String(format: "%.2f",priceChange))")
                Text("Market Value: \(String(format: "%.2f",priceChange/(sectionItems.change * Double(sectionItems.shares))))")
                
            }
            .padding(.all)
            .font(Font.headline.weight(.bold))
            }
            Spacer()
            VStack{
                Spacer()
                
                Button("Trade"){
                    showingSheet = true
                }
                .padding(.all)
                .frame(width:200)
                .background(RoundedRectangle(cornerRadius: 50).fill(Color.green))
                .foregroundColor(Color.white)
                .font(.title2)
                .buttonStyle(PlainButtonStyle())
                .sheet(isPresented: $showingSheet){
                    TradingSheetView(stock: $sectionItems, portfolioSheetBinding: $showingSheet)
                }
                Spacer()
            }.padding(.trailing, 20.0)
           
        }
    }
    
    func openTradingSheet(){
        
    }
}

//struct PortfolioSectionView_Previews: PreviewProvider {
//    static var previews: some View {
//        PortfolioSectionView()
//    }
//}
