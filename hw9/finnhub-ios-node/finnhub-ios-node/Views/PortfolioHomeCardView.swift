//
//  PortfolioHomeCardView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/14/22.
//

import SwiftUI

struct PortfolioHomeCardView: View {
    
    @State var stock: Stock
    var body: some View {
        HStack{
            VStack(alignment: .leading){
                Text("\(stock.ticker)").font(.title2).fontWeight(.semibold)
                Text("\(stock.shares) shares").font(.subheadline).foregroundColor(.secondary)
            }
            Spacer()
            VStack(alignment: .trailing){
                Text("$\(stock.change * Double(stock.shares),specifier: "%.2f")").font(.title3).fontWeight(.semibold)
                HStack{
                    Image(systemName: "arrow.up.right")
                    Text("$0.0") //hard coded
                    Text("(0.0%)") //hard coded
                    
                }
                        .foregroundColor(.green)
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
