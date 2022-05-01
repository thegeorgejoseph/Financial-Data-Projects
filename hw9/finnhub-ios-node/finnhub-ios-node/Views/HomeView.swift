//
//  HomeView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/14/22.
//

import SwiftUI

struct HomeView: View {
    @EnvironmentObject var localStorage: LocalStorage
    @EnvironmentObject var mockObj: MockModel
    @ObservedObject var searchBar: SearchBar = SearchBar()
    @Environment(\.openURL) var openURL
    @State var isEditing: Bool = false
    @State var tempList:[PortfolioHomeCardModel] = [PortfolioHomeCardModel(name:"AAPL"), PortfolioHomeCardModel(name:"RIVN"), PortfolioHomeCardModel(name:"ADSK")]
    private var currentDate: Date = Date()
    
    var body: some View {
        let localFavList: [Stock] = localStorage.favoriteArray
        let localPortList: [Stock] = localStorage.portfolioArray
        //        if mockObj.tickerData != nil{
        //            var profile: Profile = mockObj.tickerData!.profile!
        NavigationView {
            List {
                if searchBar.text != "" {
                    if searchBar.results != nil {
                        let autoResults: [[String]] = searchBar.results!
                        Section{
                            ForEach(
                                autoResults,id: \.self
                            ) { ticker in
                                NavigationLink(destination: NavigationLazyView(PortfolioCardDetail(ticker: ticker[0]))){
                                    VStack(alignment:.leading){
                                        Text(ticker[0])
                                            .font(.title3.weight(.bold))
                                        Text(ticker[1])
                                            .font(.caption)
                                            .foregroundColor(.secondary)
                                    }
                                    
                                }
                                
                            }
                        }
                    } else {
                        HStack{
                            Spacer()
                            ProgressView()
                            Spacer()
                        }
                    }
                    
                }
                else {
                    Section{
                        Text(currentDate, style: .date)
                            .font(.system(size: 30))
                            .fontWeight(.bold)
                            .foregroundColor(.secondary)
                    }
                    
                    Section(header: Text("Portfolio")){
                        PortfolioHomeView()
                        ForEach(localPortList) { stock in
                            let temp: String = String(stock.ticker)
                            NavigationLink(destination:NavigationLazyView(PortfolioCardDetail(ticker: temp))){
                                PortfolioHomeCardView(stock: localStorage.portfolioArray.filter{$0.ticker == stock.ticker}.first ?? stock)
                                //                                    PortfolioHomeCardView(stock: stock)
                            }
                            
                        }
                        .onDelete(perform: delete)
                        .onMove(perform: move)
                    }
                    
                    Section(header: Text("Favorites")){
                        ForEach(localFavList){stock in
                            let temp: String = String(stock.ticker)
                            NavigationLink(destination: NavigationLazyView(PortfolioCardDetail(ticker: temp))){
                                FavoritesHomeCardView(stock: stock)
                            }
                            
                        }
                        
                    }
                    
                    Section{
                        HStack {
                            Spacer()
                            Text("Powered by Finnhub.io").font(.footnote).foregroundColor(.secondary).onTapGesture {
                                openURL(URL(string: "https://finnhub.io")!)
                            }
                            Spacer()
                        }
                    }
                }
                
            }
            .navigationTitle("Stocks")
            .add(self.searchBar)
            .toolbar {
                EditButton()
            }
        }
        //        } else {
        //            ProgressView("Fetching Data...")
        //        }
        
    }
    
    func delete(at offsets: IndexSet){
        //        tempList.remove(atOffsets: offsets)
    }
    func move(from source: IndexSet, to destination: Int) {
        //        tempList.move(fromOffsets: source, toOffset: destination)
    }
}
