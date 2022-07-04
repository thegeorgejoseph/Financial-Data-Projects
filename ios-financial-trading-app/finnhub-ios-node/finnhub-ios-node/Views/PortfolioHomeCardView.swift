//
//  PortfolioHomeCardView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/14/22.
//

import SwiftUI

struct PortfolioHomeCardView: View {
    
    @State var stock: Stock
//    @State var updater: Bool
    var body: some View {
        HStack{
            VStack(alignment: .leading){
                Text("\(stock.ticker)").font(.title2).fontWeight(.semibold)
                Text("\(stock.shares) shares").font(.subheadline).foregroundColor(.secondary)
            }
            Spacer()
            VStack(alignment: .trailing){
                Text("$\((stock.change + stock.totalChange) * Double(stock.shares),specifier: "%.2f")").font(.title3).fontWeight(.semibold) // market value = latest quote * num shares
                HStack{
                    Image(systemName: stock.totalChange > 0 ? "arrow.up.right" : (stock.totalChange < 0 ? "arrow.down.right" : "minus"))
                    Text("$\(stock.totalChange * Double(stock.shares),specifier: "%.2f")")
                    Text("(\(stock.totalChange / stock.change, specifier: "%.2f")%)")
                    
                }
                .foregroundColor(stock.totalChange > 0 ? Color.green : (stock.totalChange < 0 ? Color.red : Color.gray))
            }
        }
        
        
        
    }
}

struct PortfolioHomeCardView_Previews: PreviewProvider {
    static var previews: some View {
//        PortfolioHomeCardView()
        ContentView()
    }
}
