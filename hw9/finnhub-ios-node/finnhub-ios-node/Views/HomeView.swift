//
//  HomeView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/14/22.
//

import SwiftUI
import Alamofire
import SwiftyJSON

struct HomeView: View {
    @EnvironmentObject var localStorage: LocalStorage
    @EnvironmentObject var mockObj: MockModel
    @ObservedObject var searchBar: SearchBar = SearchBar()
    @Environment(\.openURL) var openURL
    @State var isEditing: Bool = false
    @AppStorage("storePortfolio") var storePortfolio: [Stock] = []
    @AppStorage("storeFavorite") var storeFavorite: [Stock] = []
    @AppStorage("storeWallet") var storeWallet: Double = 25000
    @AppStorage("storeWallet") var storeNet: Double = 25000
    private var currentDate: Date = Date()
    let portFolioTimer = Timer.publish(every: 15, tolerance: 2, on: .main, in: .common).autoconnect()
    let favoriteTimer = Timer.publish(every: 15, tolerance: 2, on: .main, in: .common).autoconnect()
    var body: some View {
        var localFavList: [Stock] = localStorage.favoriteArray
        var localPortList: [Stock] = localStorage.portfolioArray
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
                            //                            var updater: AutoUpdate = AutoUpdate()
                            let localStock = stock
                            let temp: String = String(localStock.ticker)
                            NavigationLink(destination:NavigationLazyView(PortfolioCardDetail(ticker: temp))){
                                PortfolioHomeCardView(stock: localStock)
                                    .onReceive(portFolioTimer){time in
                                        //                                        updater.refresh(ticker: temp)
//                                        print(localStorage.portfolioArray)
                                        var stock: Quote? = nil
                                        var resultObj: [Quote]? = nil
                                        let request = AF.request("http://finnhub-angular-node.wl.r.appspot.com/stock_quote?symbol=\(temp)", method: .get)
                                        var array: [Quote] = []
                                        request.responseJSON{(response) in
                                            if response.data != nil{
                                                do{
                                                    let json = try JSON(data: response.data!)
                                                    let jsonString = "\(json)"
                                                    let jsonData = jsonString.data(using: .utf8)
                                                    resultObj = try JSONDecoder().decode([Quote].self, from: jsonData!)
                                                    //                    print(self.result)
                                                    for item in resultObj!{
                                                        array.append(item)
                                                    }
                                                    //                    print(array)
                                                    stock = array[0]
                                                    print("Updating portfolio stock: \(temp)")
                                                    var idxToChange = 0
                                                    for (idx, item) in storePortfolio.enumerated(){
                                                        if item.ticker == temp{
                                                            idxToChange = idx
                                                        }
                                                    }
                                                    storePortfolio[idxToChange].d = stock!.d
                                                    storePortfolio[idxToChange].dp = stock!.dp
                                                    storePortfolio[idxToChange].change = stock!.c
//                                                    portFolioTimer.upstream.connect().cancel()
                                                } catch{
                                                    print(String(describing: error))
                                                }
                                            }
                                        }
                                        
                                    }
                            }
                            
                        }
                        //                        .onDelete(perform: delete)
                        .onMove(perform: move)
                    }
                    
                    Section(header: Text("Favorites")){
                        ForEach(localFavList){stock in
                            let temp: String = String(stock.ticker)
                            NavigationLink(destination: NavigationLazyView(PortfolioCardDetail(ticker: temp))){
                                FavoritesHomeCardView(stock: stock)
                                    .onReceive(favoriteTimer){time in
                                        //                                        updater.refresh(ticker: temp)
//                                        print(localStorage.favoriteArray)
                                        var stock: Quote? = nil
                                        var resultObj: [Quote]? = nil
                                        let request = AF.request("http://finnhub-angular-node.wl.r.appspot.com/stock_quote?symbol=\(temp)", method: .get)
                                        var array: [Quote] = []
                                        request.responseJSON{(response) in
                                            if response.data != nil{
                                                do{
                                                    let json = try JSON(data: response.data!)
                                                    let jsonString = "\(json)"
                                                    let jsonData = jsonString.data(using: .utf8)
                                                    resultObj = try JSONDecoder().decode([Quote].self, from: jsonData!)
                                                    //                    print(self.result)
                                                    for item in resultObj!{
                                                        array.append(item)
                                                    }
                                                    //                    print(array)
                                                    stock = array[0]
                                                    print("Updating favorite stock: \(temp)")
                                                    var idxToChange = 0
                                                    for (idx, item) in storeFavorite.enumerated(){
                                                        if item.ticker == temp{
                                                            idxToChange = idx
                                                        }
                                                    }
                                                    storeFavorite[idxToChange].d = stock!.d
                                                    storeFavorite[idxToChange].dp = stock!.dp
                                                    storeFavorite[idxToChange].change = stock!.c
//                                                    favoriteTimer.upstream.connect().cancel()
                                                } catch{
                                                    print(String(describing: error))
                                                }
                                            }
                                        }
                                        
                                    }
                            }
                            
                        }
                        .onDelete(perform: favDelete)
                        .onMove(perform: favMove)
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
        
    }
    
    func delete(at offsets: IndexSet){
        self.storePortfolio.remove(atOffsets: offsets)
        localStorage.portfolioArray = self.storePortfolio
    }
    func move(from source: IndexSet, to destination: Int) {
        self.storePortfolio.move(fromOffsets: source, toOffset: destination)
        localStorage.portfolioArray = self.storePortfolio
    }
    func favDelete(at offsets: IndexSet){
        self.storeFavorite.remove(atOffsets: offsets)
        localStorage.favoriteArray = self.storeFavorite
    }
    func favMove(from source: IndexSet, to destination: Int) {
        self.storeFavorite.move(fromOffsets: source, toOffset: destination)
        localStorage.favoriteArray = self.storeFavorite
    }
}


//class AutoUpdate(): ObservableObject {
//
//    func refresh(){
//        for (idx,item) in self.favoriteArray.enumerated(){
//            //                print(idx, item.ticker)
//            DispatchQueue.main.async{
//                var stock: Quote? = nil
//                var resultObj: [Quote]? = nil
//                let request = AF.request("http://finnhub-angular-node.wl.r.appspot.com/stock_quote?symbol=\(item.ticker)", method: .get)
//                var array: [Quote] = []
//                request.responseJSON{(response) in
//                    if response.data != nil{
//                        do{
//                            let json = try JSON(data: response.data!)
//                            let jsonString = "\(json)"
//                            let jsonData = jsonString.data(using: .utf8)
//                            resultObj = try JSONDecoder().decode([Quote].self, from: jsonData!)
//                            //                    print(self.result)
//                            for item in resultObj!{
//                                array.append(item)
//                            }
//                            //                    print(array)
//                            stock = array[0]
//                            print("Updating stock: \(item.ticker)")
//                            self.favoriteArray[idx].d = stock!.d
//                            self.favoriteArray[idx].dp = stock!.dp
//                            self.favoriteArray[idx].change = stock!.c
//                            self.favoriteArray[idx].ticker = "Say Sike"
//                        } catch{
//                            print(String(describing: error))
//                        }
//                    }
//                }
//            }
//        }
//    }
//}
