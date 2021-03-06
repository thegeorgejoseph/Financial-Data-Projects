//
//  ChartsWebView.swift
//  finnhub-ios-node
//
//  Created by George Joseph on 4/24/22.
//

import SwiftUI
import WebKit

class Coordinator : NSObject, WKNavigationDelegate {
    // ... any other code
    var quote : Quote
    init(value : Quote){
        quote = value
    }
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        do{
            let encodedData = try JSONEncoder().encode(quote)
            let jsonString = String(data: encodedData,
                                    encoding: .utf8)
//            print(jsonString!)
            webView.evaluateJavaScript("temporaryFunc(\'\(jsonString!)\')", completionHandler: { (value, error) in
                // .. do anything needed with result, if any
            })
        } catch{
            print("WebView Error")
        }
    }
}

struct WebView: UIViewRepresentable{
    let htmlName : String
    var quote : Quote
    private let webView = WKWebView()
    
    func makeUIView(context: Context) -> some UIView {
        webView.navigationDelegate = context.coordinator
        return webView
    }
    func makeCoordinator() -> Coordinator {
        Coordinator(value: quote)
    }
    
    func updateUIView(_ uiView: UIViewType, context: Context) {
        webView.load(htmlName)
    }
}

class SMACoordinator : NSObject, WKNavigationDelegate {
    // ... any other code
    var charts : HistoricalVolume
    init(value : HistoricalVolume){
        charts = value
    }
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        do{
            let encodedData = try JSONEncoder().encode(charts)
            let jsonString = String(data: encodedData,
                                    encoding: .utf8)
//            print(jsonString!)
            webView.evaluateJavaScript("temporaryFunc(\'\(jsonString!)\')", completionHandler: { (value, error) in
                // .. do anything needed with result, if any
            })
        } catch{
            print("WebView Error")
        }
    }
}

struct SMAWebView: UIViewRepresentable{
    let htmlName : String
    var charts : HistoricalVolume
    private let webView = WKWebView()
    
    func makeUIView(context: Context) -> some UIView {
        webView.navigationDelegate = context.coordinator
        return webView
    }
    func makeCoordinator() -> SMACoordinator {
        SMACoordinator(value: charts)
    }
    
    func updateUIView(_ uiView: UIViewType, context: Context) {
        webView.load(htmlName)
    }
}

class RECCoordinator : NSObject, WKNavigationDelegate {
    // ... any other code
    var recommendation : Recommendation
    init(value : Recommendation){
        recommendation = value
    }
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        do{
            let encodedData = try JSONEncoder().encode(recommendation)
            let jsonString = String(data: encodedData,
                                    encoding: .utf8)
//            print(jsonString!)
            webView.evaluateJavaScript("temporaryFunc(\'\(jsonString!)\')", completionHandler: { (value, error) in
                // .. do anything needed with result, if any
            })
        } catch{
            print("WebView Error")
        }
    }
}

struct RECWebView: UIViewRepresentable{
    let htmlName : String
    var recommendation : Recommendation
    private let webView = WKWebView()
    
    func makeUIView(context: Context) -> some UIView {
        webView.navigationDelegate = context.coordinator
        return webView
    }
    func makeCoordinator() -> RECCoordinator {
        RECCoordinator(value: recommendation)
    }
    
    func updateUIView(_ uiView: UIViewType, context: Context) {
        webView.load(htmlName)
    }
}

class EPSCoordinator : NSObject, WKNavigationDelegate {
    // ... any other code
    var earnings : Earnings
    init(value : Earnings){
        earnings = value
    }
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        do{
            let encodedData = try JSONEncoder().encode(earnings)
            let jsonString = String(data: encodedData,
                                    encoding: .utf8)
//            print(jsonString!)
            webView.evaluateJavaScript("temporaryFunc(\'\(jsonString!)\')", completionHandler: { (value, error) in
                // .. do anything needed with result, if any
            })
        } catch{
            print("WebView Error")
        }
    }
}

struct EPSWebView: UIViewRepresentable{
    let htmlName : String
    var earnings : Earnings
    private let webView = WKWebView()
    
    func makeUIView(context: Context) -> some UIView {
        webView.navigationDelegate = context.coordinator
        return webView
    }
    func makeCoordinator() -> EPSCoordinator {
        EPSCoordinator(value: earnings)
    }
    
    func updateUIView(_ uiView: UIViewType, context: Context) {
        webView.load(htmlName)
    }
}


extension WKWebView {
    func load(_ htmlName : String){
        guard !htmlName.isEmpty else {
            return print("Empty file name")
        }
        
        guard let filePath = Bundle.main.path(forResource: htmlName, ofType: "html") else{
            return print("File path error probably")
        }
        
        do{
            let htmlString = try String(contentsOfFile: filePath, encoding: .utf8)
            loadHTMLString(htmlString, baseURL: URL(fileURLWithPath: filePath))
        } catch {
            print("Extension error occured")
        }
    }
}
