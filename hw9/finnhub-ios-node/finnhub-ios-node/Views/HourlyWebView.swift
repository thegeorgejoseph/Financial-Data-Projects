//
//  HourlyWebView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/24/22.
//

import SwiftUI
import WebKit


struct ChartsWebView: View {
    var body: some View {
        WebView(htmlName: "index")
    }
}

struct ChartsWebView_Previews: PreviewProvider {
    static var previews: some View {
        ChartsWebView()
    }
}
