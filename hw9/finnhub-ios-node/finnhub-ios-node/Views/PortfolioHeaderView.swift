//
//  PortfolioHeaderView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/27/22.
//

import SwiftUI
import Kingfisher

struct PortfolioHeaderView: View {
    @State var profile: Profile
    @State var quote: Quote
    @State var trendColor: Color
    @State var arrowSymbol: String
    var body: some View {
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
    }
}
