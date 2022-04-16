//
//  finnhub_ios_nodeApp.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/14/22.
//

import SwiftUI

@main
struct finnhub_ios_nodeApp: App {
//    @ObservedObject var data =  MockModel()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(MockModel())
        }
    }
}
