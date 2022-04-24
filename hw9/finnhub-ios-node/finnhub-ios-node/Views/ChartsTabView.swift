//
//  ChartsTabView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/24/22.
//

import SwiftUI

struct ChartsTabView: View {
    @State private var currentTab: String = "hourly"
    var body: some View {
        TabView(selection: $currentTab){
            WebView(htmlName: "index")
                .tabItem{
                    Label(" ", systemImage: "chart.xyaxis.line")
                        .tag("hourly")
                }
            Text("Hisorical Charts")
                .tag("historical")
                .tabItem{
                    Label(" ",systemImage: "clock")
                }
        }
        .onTapGesture{
            if currentTab == "hourly"{
                currentTab = "historical"
            } else {
                currentTab = "hourly"
            }
        }
    }
}

struct ChartsTabView_Previews: PreviewProvider {
    static var previews: some View {
        ChartsTabView()
    }
}
