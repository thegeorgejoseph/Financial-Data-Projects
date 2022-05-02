//
//  FavoritesHomeCardView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/14/22.
//

import SwiftUI

struct FavoritesHomeCardView: View {
    @State var stock: Stock
    var amount = 174.49
    var body: some View {
        HStack{
            VStack(alignment: .leading){
                Text("\(stock.ticker)").font(.title2).fontWeight(.semibold)
                Text("\(stock.name)").font(.subheadline).foregroundColor(.secondary)
            }
            Spacer()
            VStack(alignment: .trailing){
                Text("$\(stock.change,specifier: "%.2f")").font(.title3).fontWeight(.semibold)
                HStack{
                    Image(systemName: stock.d > 0 ? "arrow.up.right" : (stock.d < 0 ? "arrow.down.right" : "minus"))
                    Text("\(String(format: "%.2f", stock.d))")
                    Text("(\(String(format: "%.2f", stock.dp))%)")
                    
                }
                .foregroundColor(stock.dp < 0 ? Color.red : (stock.d > 0 ? Color.green : Color.gray))
            }
        }
    }
}

struct FavoritesHomeCardView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
