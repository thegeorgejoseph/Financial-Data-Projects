//
//  StatsAboutView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/27/22.
//

import SwiftUI

struct StatsAboutView: View {
    @State var quote : Quote
    @State var profile: Profile
    @State var peers: [String]
    @Environment(\.openURL) var openURL
    var body: some View {
        let filteredPeers = peers.filter{ peer in
            peer != ""
        }
        VStack(alignment: .leading) {
            Text("Stats").font(.title.weight(.semibold))
                .padding(.leading)
            HStack{
                VStack(alignment: .leading, spacing: 10){
                    HStack {
                        Text("High Price:")
                            .font(Font.headline.weight(.bold))
                        Text("$\(String(format: "%.2f", quote.h))")
                    }
                    HStack {
                        Text("Low Price:")
                            .font(Font.headline.weight(.bold))
                        Text("$\(String(format: "%.2f", quote.l))")
                    }
                }
                .padding(.all)
                Spacer()
                VStack(alignment: .leading, spacing: 10){
                    HStack {
                        Text("Open Price:")
                            .font(Font.headline.weight(.bold))
                        Text("$\(String(format: "%.2f", quote.o))")
                    }
                    HStack {
                        Text("Prev. Close:")
                            .font(Font.headline.weight(.bold))
                        Text("$\(String(format: "%.2f", quote.pc))")
                    }
                }
                .padding(.all)
                Spacer()
            }
            Text("About")
                .font(.title.weight(.semibold))
                .padding(.leading)
            HStack{
                VStack(alignment:.leading, spacing: 5){
                    Text("IPO Start Date:")
                    Text("Industry:")
                    Text("Webpage:")
                    Text("Company Peers:")
                }
                .font(.headline.weight(.semibold))
                VStack(alignment: .leading, spacing: 5){
                    Text("\(profile.ipo)")
                    Text("\(profile.finnhubIndustry)")
                    Text("\(profile.weburl)")
                        .foregroundColor(Color.blue)
                        .onTapGesture {
                            openURL(URL(string: profile.weburl)!)
                        }
                    ScrollView(.horizontal){
                        HStack{
                            ForEach(peers, id: \.self){peer in
                                let temp = String(peer)
                                NavigationLink(destination:NavigationLazyView(PortfolioCardDetail(ticker: temp))){
                                    Text("\(peer),")
                                        .foregroundColor(Color.blue)
                                }
                                
                                    
                            }
                        }
                    }
                    
                }
            }
            .padding(.all)
        }
    }
}

//struct StatsAboutView_Previews: PreviewProvider {
//    static var previews: some View {
//        StatsAboutView()
//    }
//}
