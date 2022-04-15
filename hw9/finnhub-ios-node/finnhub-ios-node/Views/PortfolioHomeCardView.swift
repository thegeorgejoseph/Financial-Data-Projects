//
//  PortfolioHomeCardView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/14/22.
//

import SwiftUI

struct PortfolioHomeCardView: View {
    @State var item: PortfolioHomeCardModel
    private let amount = 523.47
    var body: some View {
        HStack{
            VStack(alignment: .leading){
                Text("\(item.name)").font(.title2).fontWeight(.semibold)
                Text("3 shares").font(.subheadline).foregroundColor(.secondary)
            }
            Spacer()
            VStack(alignment: .trailing){
                Text("$\(amount,specifier: "%.2f")").font(.title3).fontWeight(.semibold)
                HStack{
                    Image(systemName: "arrow.up.right")
                    Text("$0.12")
                    Text("(0.02%)")
                    
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
