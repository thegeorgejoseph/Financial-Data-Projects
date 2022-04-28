//
//  HomeView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/14/22.
//

import SwiftUI

struct HomeView: View {
        @EnvironmentObject var mockObj: MockModel
//    @ObservedObject var mockObj: MockModel = MockModel()
    @Environment(\.openURL) var openURL
    @State var isEditing: Bool = false
    @State var tempList:[PortfolioHomeCardModel] = [PortfolioHomeCardModel(name:"AAPL"), PortfolioHomeCardModel(name:"RIVN"), PortfolioHomeCardModel(name:"ADSK")]
    private var currentDate: Date = Date()
    
    
    var body: some View {
        if mockObj.tickerData != nil{
            var profile: Profile = mockObj.tickerData!.profile!
//            Text("\(profile.ticker)") // is how you use the data from the API
            NavigationView {
                List {
                    Section{
                        Text(currentDate, style: .date)
                            .font(.system(size: 30))
                            .fontWeight(.bold)
                            .foregroundColor(.secondary)
                    }
                    
                    Section(header: Text("Portfolio")){
                        PortfolioHomeView()
                        ForEach(tempList, id: \.id) { item in
                            NavigationLink(destination:PortfolioCardDetail()){
                                PortfolioHomeCardView(item: item)
                            }
                            
                        }
                        .onDelete(perform: delete)
                        .onMove(perform: move)
                    }
                    
                    Section(header: Text("Favorites")){
                        FavoritesHomeCardView()
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
                .navigationTitle("Stocks")
                .toolbar {
                    EditButton()
                }
            }
        } else {
            ProgressView("Fetching Data...")
        }
        
    }
    
    func delete(at offsets: IndexSet){
        tempList.remove(atOffsets: offsets)
    }
    func move(from source: IndexSet, to destination: Int) {
        tempList.move(fromOffsets: source, toOffset: destination)
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
    }
}