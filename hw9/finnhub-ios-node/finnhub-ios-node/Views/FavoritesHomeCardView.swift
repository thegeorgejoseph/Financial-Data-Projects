//
//  FavoritesHomeCardView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/14/22.
//

import SwiftUI

struct FavoritesHomeCardView: View {
    private var amount = 174.49
    var body: some View {
        HStack{
            VStack(alignment: .leading){
                Text("AAPL").font(.title2).fontWeight(.semibold)
                Text("Apple Inc.").font(.subheadline).foregroundColor(.secondary)
            }
            Spacer()
            VStack(alignment: .trailing){
                Text("$\(amount,specifier: "%.2f")").font(.title3).fontWeight(.semibold)
                HStack{
                    Image(systemName: "arrow.down.right")
                    Text("-$0.23")
                    Text("(-0.13%)")
                    
                }
                        .foregroundColor(.red)
            }
        }
    }
}

struct FavoritesHomeCardView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
