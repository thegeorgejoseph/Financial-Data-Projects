//
//  PortfolioHomeView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/14/22.
//

import SwiftUI

struct PortfolioHomeView: View {
    var body: some View {
        HStack{
            VStack(alignment: .leading){
                Text("Net Worth").fontWeight(.medium)
                Text("$25000.00").fontWeight(.bold)
            }
            .font(.title2)
            Spacer()
            VStack(alignment: .leading){
                Text("Cash Balance").fontWeight(.medium)
                Text("$25000.00").fontWeight(.bold)
            }
            .font(.title2)
        }
    }
}

struct PortfolioHomeView_Previews: PreviewProvider {
    static var previews: some View {
        PortfolioHomeView().previewLayout(.fixed(width: 600, height: 600))
        ContentView()
    }
}
