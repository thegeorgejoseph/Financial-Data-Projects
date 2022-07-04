//
//  PortfolioSectionView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/27/22.
//

import SwiftUI

struct PortfolioSectionView: View {
    //    @EnvironmentObject var localStorage: LocalStorage
    @State var sectionItems: Stock
//    @State var trendColor: Color
    @StateObject var modalState: ModalState = ModalState()
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
                VStack(alignment: .leading,spacing: 5){
                    Text("Portfolio")
                        .font(.largeTitle)
                        .padding()
                    HStack{
                        Text("Shares Owned: ")
                            .font(Font.headline.weight(.bold))
                            .padding(.leading)
                        Text("\(sectionItems.shares)")
                        
                    }
                    HStack{
                        Text("Avg. Cost / Share: ")
                            .font(Font.headline.weight(.bold))
                            .padding(.leading)
                        Text("$\(sectionItems.shares > 0 ? String(format: "%.2f", Double(sectionItems.shares) * sectionItems.change / Double(sectionItems.shares)) : String(0))")
                    }
                    HStack{
                        Text("Total Cost: ")
                            .font(Font.headline.weight(.bold))
                            .padding(.leading)
                        Text("$\(String(format: "%.2f",Double(sectionItems.shares) * sectionItems.change))")
                            
                    }
                    HStack{
                        Text("Change: ")
                            .font(Font.headline.weight(.bold))
                            .padding(.leading)
                        Text("$\(String(format: "%.2f",sectionItems.totalChange))")
                            .foregroundColor(sectionItems.totalChange > 0 ? Color.green : (sectionItems.totalChange < 0 ? Color.red : Color.gray))
                    }
                    HStack{
                        Text("Market Value: ")
                            .font(Font.headline.weight(.bold))
                            .padding(.leading)
                        Text("$\(String(format: "%.2f",((sectionItems.change + sectionItems.totalChange) * Double(sectionItems.shares))))")
                            .foregroundColor(sectionItems.totalChange > 0 ? Color.green : (sectionItems.totalChange < 0 ? Color.red : Color.gray))
                    }
                    .padding(.bottom)
                    
                }
                
            }
            Spacer()
            VStack{
                Spacer()
                
                Button("Trade"){
                    self.modalState.isModal1Presented = true
                }
                .padding(.all)
                .frame(width:150)
                .background(RoundedRectangle(cornerRadius: 50).fill(Color.green))
                .foregroundColor(Color.white)
                .font(.title2)
//                .buttonStyle(PlainButtonStyle())
                .sheet(isPresented: $modalState.isModal1Presented){
                    TradingSheetView(stock: $sectionItems, modalState: modalState)
                }
                Spacer()
            }.padding(.trailing, 20.0)
            
        }
    }
    
    func openTradingSheet(){
        
    }
}
