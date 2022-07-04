//
//  ChartsTabView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/24/22.
//

import SwiftUI

struct ChartsTabView: View {
    @State var quote: Quote
    @State var charts: HistoricalVolume
    @State private var currentTab: String = "hourly"
    var body: some View {
        TabView(selection: $currentTab){
            WebView(htmlName: "index", quote: quote)
                .tabItem{
                    Label(" ", systemImage: "chart.xyaxis.line")
                        .tag("hourly")
                        .onTapGesture {
                            currentTab = "historical"
                            
                        }
                }
            SMAWebView(htmlName: "SMAIndex", charts: charts)
                .tag("historical")
                .tabItem{
                    Label(" ",systemImage: "clock")
                        .onTapGesture {
                            currentTab = "hourly"
                            
                        }
                }
        }
    }
}
