//
//  SearchBarView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/28/22.
//

import SwiftUI

struct SearchBarView: View {
    var searchResults = ["TSLA", "AMZN", "MSFT", "ADSK"]
    
    @ObservedObject var searchBar: SearchBar = SearchBar()
    
    var body: some View {
        List {
            ForEach(
                searchResults.filter {
                    searchBar.text.isEmpty ||
                    $0.localizedStandardContains(searchBar.text)
                },
                id: \.self
            ) { eachPlanet in
                Text(eachPlanet)
            }
        }
        .add(self.searchBar)
    }
}
